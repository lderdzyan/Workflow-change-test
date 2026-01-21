import { GuidedDiscussionStatus } from "./GuidedDiscussion";
import { Package } from "./Package";

export type Answers = Record<string, string | number>;
export type Result = Record<string, number>;

export enum SurveyAnswerProcessStatus {
  Created = "created",
  New = "new",
  InProgress = "inProgress",
  Finished = "finished",
  Pending = "pending",
  PayemenInProgress = "paymentInProgress",
  Done = "done",
  PaymentError = "paymentError",
  ProcessingError = "processingError",
}

export interface SurveyAnswer {
  id: string;
  surveyId: string;
  createdAt?: number;
  answers?: Answers;
  orderId?: string;
  completedAt?: number;
  purchaseDate?: number;
  errorMessage?: string;
  processResult?: Result;
  personId?: string;
  status: SurveyAnswerProcessStatus;
  packageInfo?: Package[];
  guidedDiscussion?: { status: GuidedDiscussionStatus };
}

