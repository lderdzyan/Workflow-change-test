import { createId } from "@paralleldrive/cuid2";
import * as O from "fp-ts/Option";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { Answers, SurveyAnswer, SurveyAnswerProcessStatus } from "../models/SurveyAnswer";
import { CacheKeys, getDataFromCache, putDataToCache } from "../cache";
import { RequestError, doPost } from "../request";
import APIPaths from "../api-paths";
import { ApplicationResponse, SurveyAnswerResponse, SurveyAnswersResponse, SurveysResponse } from "../dtos";
import { Survey } from "../models";
import { getCurrentPerson } from "./user";
import { SurveyResponse } from "../dtos/SurveyResponse";

export const getLastSurveyAnswerId = (): O.Option<string> => getDataFromCache(CacheKeys.LastSurveyAnswerId);

export const getSurveyAnswer = (id: string): TE.TaskEither<RequestError, SurveyAnswer> =>
  pipe(
    doPost<SurveyAnswerResponse>(APIPaths.Survey.GetAnswer, { id }),
    TE.map((response) => response.answer),
  );

export function startSurvey(surveyId: string): SurveyAnswer {
  const surveyAnswer: SurveyAnswer = { id: createId(), surveyId, answers: {}, status: SurveyAnswerProcessStatus.New };
  const surveyAnswersOpt = getSurveyAnswers();
  let surveyAnswers: SurveyAnswer[] = [];
  if (O.isSome(surveyAnswersOpt)) {
    surveyAnswers = surveyAnswersOpt.value;
  }
  surveyAnswers.push(surveyAnswer);

  putDataToCache(CacheKeys.SurveyAnswers, surveyAnswers);
  putDataToCache(CacheKeys.LastSurveyAnswerId, surveyAnswer.id);

  return surveyAnswer;
}

export function setAnswer(answerId: string, answers: Answers) {
  const surveyAnswersOpt = getSurveyAnswers();
  if (O.isSome(surveyAnswersOpt)) {
    const person = getCurrentPerson();
    if (O.isSome(person.user)) {
      const surveyAnswers = surveyAnswersOpt.value;
      const surveyAnswer = O.fromNullable(surveyAnswers.find((answer) => answer.id === answerId));
      const otherAnswers = surveyAnswers.filter((answer) => answer.id !== answerId);
      if (O.isSome(surveyAnswer)) {
        surveyAnswer.value.answers = answers;
        putDataToCache<SurveyAnswer[]>(CacheKeys.SurveyAnswers, [...otherAnswers, surveyAnswer.value]);
        doPost(APIPaths.Survey.SaveAnswer, {
          sa: {
            a: answers,
            aid: answerId,
            qs: surveyAnswer.value.surveyId,
            identity: person.user.value.identity,
          },
        })().then();
      } else {
        throw Error(`Survey answer with ID ${answerId} not found.`);
      }
    } else {
      throw Error(`User not initialized.`);
    }
  } else {
    throw Error(`Survey answer with ID ${answerId} not found.`);
  }
}

export async function finishSurvey(answerId: string, answers: Answers) {
  const surveyAnswersOpt = getSurveyAnswers();
  if (O.isSome(surveyAnswersOpt)) {
    const surveyAnswers = surveyAnswersOpt.value;
    const surveyAnswer = O.fromNullable(surveyAnswers.find((answer) => answer.id === answerId));
    const otherAnswers = surveyAnswers.filter((answer) => answer.id !== answerId);
    if (O.isSome(surveyAnswer)) {
      surveyAnswer.value.answers = answers;
      putDataToCache<SurveyAnswer[]>(CacheKeys.SurveyAnswers, [...otherAnswers, surveyAnswer.value]);
      const person = getCurrentPerson();
      if (O.isSome(person.user)) {
        await doPost(APIPaths.Survey.SaveAnswer, {
          sa: {
            a: answers,
            aid: surveyAnswer.value.id,
            qs: surveyAnswer.value.surveyId,
            finished: true,
            identity: person.user.value.identity,
          },
        })();
      } else {
        throw Error(`User not initialized.`);
      }
    } else {
      throw Error(`Survey answer with ID ${answerId} not found.`);
    }
  } else {
    throw Error("Survey answers not initialized.");
  }
}

export function getSurveyAnswers(): O.Option<SurveyAnswer[]> {
  // TODO: need to load data from server if not exists in cache
  const surveyAnswersOpt = getDataFromCache<SurveyAnswer[]>(CacheKeys.SurveyAnswers);

  return surveyAnswersOpt;
}

export const loadSurveyAnswers = (): TE.TaskEither<RequestError, SurveyAnswer[]> =>
  pipe(
    doPost<SurveyAnswersResponse>(APIPaths.Survey.LoadAnswers),
    TE.chain((response) => {
      putDataToCache<SurveyAnswer[]>(CacheKeys.SurveyAnswers, response.answers);
      return TE.right(response.answers);
    }),
  );

export const loadSurveyAnswer = async (answerId: string): Promise<O.Option<SurveyAnswer>> => {
  const answers = await loadSurveyAnswers()();

  if (E.isRight(answers)) {
    return O.fromNullable(answers.right.find((answer) => answer.id === answerId));
  }

  return O.none;
};

export const loadSurveys = (): TE.TaskEither<RequestError, Survey[]> =>
  pipe(
    doPost<ApplicationResponse>(APIPaths.Application.ByPath, { path: window.MS_APP_PATH }),
    TE.flatMap((response: ApplicationResponse) =>
      pipe(
        doPost<SurveysResponse>(APIPaths.Survey.List, { s: { applicationId: response.application.id } }),
        TE.map((response: SurveysResponse) => response.surveys),
      ),
    ),
  );

export const loadSurveysByApplicationId = (applicationId: string): TE.TaskEither<RequestError, Survey[]> =>
  pipe(
    doPost<SurveysResponse>(APIPaths.Survey.List, { s: { applicationId } }),
    TE.map((response: SurveysResponse) => response.surveys),
  );

export const getSurveyById = (id: string): TE.TaskEither<RequestError, Survey> =>
  pipe(
    doPost<SurveyResponse>(APIPaths.Survey.GetById, { id }),
    TE.map((response) => response.survey),
  );
