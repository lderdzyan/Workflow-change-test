export enum GuidedDiscussionStatus {
  CREATED = "created",
  SCHECHULED = "schechuled",
  STARTED = "started",
  FINISHED = "finished",
  COMPLETED = "completed",
  DELETED = "deleted",
  READY = "ready",
  CANCELED = "canceled"
}

export interface GuidedDiscussion {
  id: string;
  guideId: string;
  surveyId?: string;
  explorerId: string;
  inventoryItems?: string[];
  explorerName?: string;
  status: GuidedDiscussionStatus;
  startTime: number;
  endTime: number;
  calendlyUsername?: string;
  zoomUrl?: string;
  rescheduleUrl?: string;
  cancelUrl?: string;
  rescheduleRequested?: boolean;
}
