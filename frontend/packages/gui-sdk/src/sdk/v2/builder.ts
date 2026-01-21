import { Effect } from "effect";
import * as O from "effect/Option";
import * as TE from "fp-ts/TaskEither";
import { PublishResponse } from "../../dtos";
import { doPost, RequestError } from "../../request";
import APIPathsV2 from "./api-paths";
import { BuilderInitialSteps, SurveyType, VimeoVideoData } from "./models";
import { EmptyResponse } from "../../dtos";
import { BuilderResponse } from "./dtos/BuilderResponse";
import { doGetE, doPostE, RequestAccess } from "../../request_jwt_e";

export const saveBuilderSurveyAnswer = (data: Record<string, number | string>, surveyId: string, finished = false): TE.TaskEither<RequestError, PublishResponse> =>
  doPost<PublishResponse>(APIPathsV2.Survey.SaveAnswer, { sa: { answer: data, surveyId, type: SurveyType.BUILDER, finished } });

export const getBuilderAnswer = (): Effect.Effect<O.Option<BuilderResponse>, RequestError, never> => doPostE<BuilderResponse>(APIPathsV2.Builder.GetBuilderAnswer);

export type SavingData = Record<string, string> | Record<string, string[]> | Record<string, Record<string, string>> | Record<string, Record<string, Record<string, string>>>;
export const updateWorkbook = (data: SavingData): Effect.Effect<O.Option<EmptyResponse>, RequestError, never> => doPostE<EmptyResponse>(APIPathsV2.Builder.SaveWorkbook, data);

export const updateBuilderStep = (data: { step: BuilderInitialSteps }): Effect.Effect<O.Option<EmptyResponse>, RequestError, never> =>
  doPostE<EmptyResponse>(APIPathsV2.Builder.UpdateBuilderStep, data);

const vimeoApi = "https://vimeo.com/api/oembed.json?url=";
export type GetVideoDataOptions = {
  videoUrl: string;
};
export const getVimeoVideoData = (options: GetVideoDataOptions): Effect.Effect<VimeoVideoData, RequestError, never> => doGetE(vimeoApi + options.videoUrl, RequestAccess.PUBLIC);

