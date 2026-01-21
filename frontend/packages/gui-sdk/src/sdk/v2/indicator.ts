import { Effect } from "effect";
import * as O from "effect/Option";
import * as TE from "fp-ts/TaskEither";
import { doPostE } from "../../request_jwt_e";
import { EmptyResponse, PublishResponse } from "../../dtos";
import { doPost } from "../../request";
import APIPathsV2 from "./api-paths";
import { IndicatorSurveyCompleteResponse, IndicatorAnswerResponse } from "./dtos";
import { SurveyType } from "./models";
import { RequestError } from "../../request-error";

export const saveIndicatorSurveyAnswer = (data: Record<string, number>, surveyId: string): TE.TaskEither<RequestError, PublishResponse> =>
  doPost<PublishResponse>(APIPathsV2.Survey.SaveAnswer, { sa: { answer: data, surveyId: surveyId, type: SurveyType.INDICATOR } });

export const completeSurveyIfReady = (): Effect.Effect<O.Option<IndicatorSurveyCompleteResponse>, RequestError, never> =>
  doPostE<IndicatorSurveyCompleteResponse>(APIPathsV2.Indicator.CompleteSurvey);

export const getAnswer = (): Effect.Effect<O.Option<IndicatorAnswerResponse>, RequestError, never> => doPostE<IndicatorAnswerResponse>(APIPathsV2.Indicator.GetAnswer);

export type SavingData = Record<string, string> | Record<string, string[]> | Record<string, Record<string, string>>;
export const saveTraningPlan = (data: SavingData): Effect.Effect<O.Option<EmptyResponse>, RequestError, never> => doPostE<EmptyResponse>(APIPathsV2.Indicator.SaveTraningPlan, data);

