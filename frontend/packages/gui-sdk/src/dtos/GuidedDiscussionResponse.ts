import { MsoData } from ".";
import { GuidedDiscussion } from "../models/GuidedDiscussion";

export interface GuidedDiscussionResponse extends MsoData {
  guidedDiscussion: GuidedDiscussion;
}
