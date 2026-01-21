import { PublishResponse } from "../../dtos";
import APIPaths from "../../api-paths";
import { eventTrackingQueue } from "../../init";
import { doPost } from "../../request";

export enum EventType {
  MomitEvent = "momitEventDetails",
  SurveyReportViewEvent = "surveyReportViewEventDetails",
  BrandAndCommsEvent = "brandAndCommsEventDetails",
  GuidedDiscussionEvent = "guidedDiscussionEventDetails",
  MirrorReflectionEvent = "mirrorReflectionEventDetails",
  BuilderEvent = "wlfBuilderEventDetails",
  IndicatorEvent = "indicatorEventDetails",
  MomitMOMEvent = "momitMomEventDetails",
}

export enum GuidedDiscussionEvents {
  PackageInfo = "packageInfo",
  Explorer = "explorer",
  Guide = "guide",
  CompletionStatus = "completionStatus",
  Refunded = "refunded",
  FocusAreasStarted = "focusAreasStarted",
  RescheduleRequested = "rescheduleRequested",
}

export enum BrandAndCommsEventType {
  verifyEmail = "emailVerified",
  setPassword = "passwordCreated",
  selectCountry = "countrySelected",
}

export enum MirrorReflectionEvents {
  Started = "started",
  QuestionAnswered = "questionAnswered",
  Completed = "completed",
  Deleted = "deleted",
}

export enum MirrorReflectionAnswerActions {
  CREATE = "create",
  UPDATE = "update",
}

export enum IndicatorEvents {
  pdfDownloaded = "pdfDownloaded",
}

type EventData = { [key: string]: string | number | string[] | number[] | undefined };
export type EventTracking = {
  e: {
    type: EventType;
    createdAt: number;
  };
} & { e: EventData };
export async function dispatchEvent(event: EventType, data?: EventData) {
  if (eventTrackingQueue == null) throw Error("MOSS SDK not initialized.");
  await eventTrackingQueue.add({
    e: {
      type: event,
      createdAt: Date.now(),
      ...data,
    },
  });
}

export const sendEventTrackingTask = (data: EventTracking) => doPost<PublishResponse>(APIPaths.EventTracking, data);

