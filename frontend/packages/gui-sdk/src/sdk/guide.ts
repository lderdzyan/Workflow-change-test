import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import APIPaths from "../api-paths";
import { GuideSaveProfileResponse } from "../dtos/GuideSaveProfileResponse";
import { GuideProfile } from "../models";
import { doPost } from "../request";
import { GuidesResponse } from "../dtos/GuidesResponse";
import { GuideResponse } from "../dtos/GuideResponse";
import { getCurrentPerson } from "./user";
import { RequestError } from "../request-error";

export function saveGuideProfile(profileData: GuideProfile): TE.TaskEither<RequestError, GuideSaveProfileResponse> {
  return doPost<GuideSaveProfileResponse>(APIPaths.Guide.SaveProfile, {
    p: { ...profileData },
  });
}
export function loadAllGuides(): TE.TaskEither<RequestError, GuideProfile[]> {
  return pipe(
    doPost<GuidesResponse>(APIPaths.Guide.LoadAll),
    TE.map((response) => response.guides),
  );
}
export function getCurrentGuideProfile(): TE.TaskEither<RequestError, GuideProfile> {
  const currentProfile = getCurrentPerson();
  return getGuideProfileByPid(currentProfile.pid);
}
export function getGuideProfileByPid(pid: string): TE.TaskEither<RequestError, GuideProfile> {
  return pipe(
    doPost<GuideResponse>(APIPaths.Guide.GetByPid, { pid }),
    TE.map((response) => response.guideProfile),
  );
}

