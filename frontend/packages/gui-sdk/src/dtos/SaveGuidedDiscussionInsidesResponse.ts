import { MsoData } from ".";
import { GuidedDiscussionAction } from "../models";

export interface SaveGuidedDiscussionInsidesResponse extends MsoData {
  d: GuidedDiscussionAction;
}
