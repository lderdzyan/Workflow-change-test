import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import APIPathsV2 from "./api-paths";
import { doPost } from "../../request";
import { MsoData } from "../../dtos";
import { GuideCardData } from "./models";
import { RequestError } from "../../request-error";

export interface AvailableGuidesResponse extends MsoData {
  guideDetails: GuideCardData[];
}

type LoadAvailableGuidesOptions = {
  startTime: string;
  endTime: string;
};
export function loadAvailableGuides(options: LoadAvailableGuidesOptions): TE.TaskEither<RequestError, GuideCardData[]> {
  return pipe(
    doPost<AvailableGuidesResponse>(APIPathsV2.Guide.LoadAvailable, {
      s: {
        startTime: options.startTime,
        endTime: options.endTime,
      },
    }),
    TE.map((response) => response.guideDetails),
  );
}

