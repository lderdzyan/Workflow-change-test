import { MsoData } from ".";
import { GuidedDiscussionAction } from "../models";

export interface GuidedDiscussionActionResponse extends MsoData {
  discussionActions: GuidedDiscussionAction;
}
