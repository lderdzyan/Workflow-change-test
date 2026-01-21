import * as TE from "fp-ts/TaskEither";
import * as O from "fp-ts/Option";

import { RequestError } from "../../request-error";
import { doPost } from "../../request_jwt";
import { IFeelingWordTopic, MirrorReflectionData } from "../../models";
import { CelebrationBackgroundImageResponse, EmptyResponse, FeelingWordSTopicSGetResponse, MirrorReflectionCreateResponse, MirrorReflectionResponse, MirrorReflectionsListResponse } from "../../dtos";
import APIPathsV2 from "./api-paths";

export const addTopicsFeelingWords = (data: IFeelingWordTopic): TE.TaskEither<RequestError, O.Option<EmptyResponse>> =>
  doPost<EmptyResponse>(APIPathsV2.MirrorReflection.AddEditFeelingWordTopic, data);

export const getTopicsFeelingWords = (): TE.TaskEither<RequestError, O.Option<FeelingWordSTopicSGetResponse>> =>
  doPost<FeelingWordSTopicSGetResponse>(APIPathsV2.MirrorReflection.GetFeelingWordTopic);

export const createMirrorReflection = (data: MirrorReflectionData): TE.TaskEither<RequestError, O.Option<MirrorReflectionCreateResponse>> =>
  doPost<MirrorReflectionCreateResponse>(APIPathsV2.MirrorReflection.CreateMirrorReflection, data);

export const getCelebrationImageIndex = (): TE.TaskEither<RequestError, O.Option<CelebrationBackgroundImageResponse>> =>
  doPost<CelebrationBackgroundImageResponse>(APIPathsV2.MirrorReflection.GetCelebrationImage);

export const getMirrorReflectionById = (id: string): TE.TaskEither<RequestError, O.Option<MirrorReflectionResponse>> =>
  doPost<MirrorReflectionResponse>(`${APIPathsV2.MirrorReflection.GetReflectionById}/${id}`);

export const getMirrorReflections = (): TE.TaskEither<RequestError, O.Option<MirrorReflectionsListResponse>> => doPost<MirrorReflectionsListResponse>(APIPathsV2.MirrorReflection.GetReflections);

export const deleteMirrorReflectionById = (id: string): TE.TaskEither<RequestError, O.Option<EmptyResponse>> =>
  doPost<EmptyResponse>(`${APIPathsV2.MirrorReflection.DeleteRefletionById}/${id}/delete`);

