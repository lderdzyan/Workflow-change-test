import { MsoData } from ".";
import { GuidedDiscussionStatus } from "../models/GuidedDiscussion";

export type GuidedDiscussionStatusData = {
  id: string;
  status: GuidedDiscussionStatus;
  canSend: boolean,
  canReschedule: boolean,
  startTime?: number,
  endTime?: number,
};
export interface GuidedDiscussionStatusResponse extends MsoData {
  statuses: GuidedDiscussionStatusData[];
}
