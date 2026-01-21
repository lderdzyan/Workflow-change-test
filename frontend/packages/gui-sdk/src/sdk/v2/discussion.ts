import * as TE from "fp-ts/TaskEither";
import { doPost } from "../../request";
import { GuidedDiscussionResponse, GuidedDiscussioneScheduleInfoResponse } from "../../dtos";
import { pipe } from "fp-ts/lib/function";
import APIPathsV2 from "./api-paths";
import { GuidedDiscussion } from "../../models";
import { DiscussionsInfo } from "./models";
import { DiscussionsInfoResponse } from "./dtos";
import { RequestError } from "../../request-error";

type UriInfo = { uri: string };

type DiscussionScheduleInfoV2 = { discussionId: string; guideId: string; calendlyData: { event: UriInfo; invitee: UriInfo } };
export const setDiscussionScheduleInfoV2 = (options: DiscussionScheduleInfoV2): TE.TaskEither<RequestError, GuidedDiscussioneScheduleInfoResponse> =>
  pipe(doPost<GuidedDiscussioneScheduleInfoResponse>(APIPathsV2.Guide.DiscussionSchedule, options));

type SaveFocusAreasProps = {
  id: string;
  inventoryItems: string[];
  sentEmail?: boolean;
};
export const saveFocusAreas = (options: SaveFocusAreasProps): TE.TaskEither<RequestError, GuidedDiscussion> =>
  pipe(
    doPost<GuidedDiscussionResponse>(APIPathsV2.Guide.SaveFocusAreas, { d: options }),
    TE.map((response) => response.guidedDiscussion),
  );

export const getDiscussionsInfo = (): TE.TaskEither<RequestError, DiscussionsInfo> =>
  pipe(
    doPost<DiscussionsInfoResponse>(APIPathsV2.Guide.GetDiscussionsInfo),
    TE.map((response) => ({ incompleteDiscussions: response.incompleteDiscussions, canceledDiscussions: response.canceledDiscussions })),
  );

