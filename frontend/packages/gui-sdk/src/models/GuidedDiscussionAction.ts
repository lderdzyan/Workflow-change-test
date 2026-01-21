export enum DiscussionActionsStatus {
  CREATED = "created",
  IN_PROGRESS = "inProgress",
  FINISHED = "finished",
}

export interface DiscaussionActionValue {
  author: "guide" | "explorer";
  message: string;
}

export interface DiscussionAction {
  type: "start" | "stop" | "continue";
  values: DiscaussionActionValue[];
}
export interface GuidedDiscussionAction {
  id: string;
  explorerId: string;
  guideId: string;
  actions?: DiscussionAction[];
  status: DiscussionActionsStatus;
  message?: string;
}
