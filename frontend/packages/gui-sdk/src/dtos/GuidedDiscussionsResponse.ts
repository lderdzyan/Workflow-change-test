import { MsoData } from ".";
import { GuidedDiscussion } from "../models/GuidedDiscussion";

export interface GuidedDiscussionsResponse extends MsoData {
  guidedDiscussions: GuidedDiscussion[];
}

