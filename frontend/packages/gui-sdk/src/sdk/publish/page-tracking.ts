import { PublishResponse } from "../../dtos";
import APIPaths from "../../api-paths";
import { pageTrackingQueue } from "../../init";
import { doPost } from "../../request";
import { RequestAccess } from "../../request_jwt_e";

export type PageTracking = {
  p: {
    uri: string;
  };
};
export async function trackPage(data: PageTracking) {
  if (pageTrackingQueue == null) throw Error("MOSS SDK not initialized.");
  await pageTrackingQueue.add(data);
}

export const sendPageTrackingTask = (data: PageTracking) => doPost<PublishResponse>(APIPaths.PageTracking, data, false, RequestAccess.PUBLIC);
