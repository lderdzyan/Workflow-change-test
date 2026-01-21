import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { GuidedDiscussion } from "../models/GuidedDiscussion";
import { RequestError, doPost } from "../request";
import APIPaths from "../api-paths";
import {
  EmptyResponse,
  GuidedDiscussionActionResponse,
  GuidedDiscussionResponse,
  GuidedDiscussionsResponse,
  GuidedDiscussionStatusData,
  GuidedDiscussionStatusResponse,
  SaveGuidedDiscussionInsidesResponse,
} from "../dtos";
import { DiscussionAction, GuidedDiscussionAction } from "../models";

type DiscussionOptions = {
  guideId: string;
  surveyAnswerId: string;
  inventoryItems: string[];
};
export const saveOrCreateDiscussion = (options: DiscussionOptions): TE.TaskEither<RequestError, GuidedDiscussion> =>
  pipe(
    doPost<GuidedDiscussionResponse>(APIPaths.Guide.DiscussionSave, { d: options }),
    TE.map((response) => response.guidedDiscussion),
  );

export const loadGuidedDiscussions = (): TE.TaskEither<RequestError, GuidedDiscussion[]> =>
  pipe(
    doPost<GuidedDiscussionsResponse>(APIPaths.Guide.Discussions),
    TE.map((response) => response.guidedDiscussions),
  );

type UriInfo = { uri: string };
type DiscussionScheduleInfo = { discussionId: string; calendlyData: { event: UriInfo; invitee: UriInfo } };
export const setDiscussionScheduleInfo = (options: DiscussionScheduleInfo): TE.TaskEither<RequestError, EmptyResponse> => pipe(doPost<EmptyResponse>(APIPaths.Guide.DiscussionSchedule, options));

export const getGuidedDiscussionById = (id: string): TE.TaskEither<RequestError, GuidedDiscussion> =>
  pipe(
    doPost<GuidedDiscussionResponse>(APIPaths.Guide.DiscussionById, { answerId: id }),
    TE.map((response) => response.guidedDiscussion),
  );

type RequestRescheduleOptions = {
  answerId: string;
  message: string;
};
export const requestReschedule = (options: RequestRescheduleOptions): TE.TaskEither<RequestError, EmptyResponse> =>
  doPost<GuidedDiscussionResponse>(APIPaths.Guide.RequestReschedule, { d: options });

export const getDiscussionsStatus = (ids: string[]): TE.TaskEither<RequestError, GuidedDiscussionStatusData[]> =>
  pipe(
    doPost<GuidedDiscussionStatusResponse>(APIPaths.Guide.DiscussionStatusCheck, { ids }),
    TE.map((response) => response.statuses),
  );

export const loadGuidedDiscussionInsides = (id: string): TE.TaskEither<RequestError, GuidedDiscussionAction> =>
  pipe(
    doPost<GuidedDiscussionActionResponse>(APIPaths.Guide.LoadInsides, { answerId: id }),
    TE.map((response) => response.discussionActions),
  );

type SaveGuidedDiscussionInsidesOptions = {
  surveyAnswerId: string;
  finished: boolean;
  message?: string;
  actions?: DiscussionAction[];
};
export const saveGuidedDiscussionInsides = (options: SaveGuidedDiscussionInsidesOptions): TE.TaskEither<RequestError, GuidedDiscussionAction> =>
  pipe(
    doPost<SaveGuidedDiscussionInsidesResponse>(APIPaths.Guide.SaveInsides, { d: options }),
    TE.map((response) => response.d),
  );
