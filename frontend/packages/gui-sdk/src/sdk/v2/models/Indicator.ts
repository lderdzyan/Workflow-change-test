import { SurveyAnswerProcessStatus } from "../../..";

export interface IIndicator {
  id?: string;

  createdBy?: string;
  updatedBy?: string;

  createdAt?: number;
  createdOn?: string;

  updatedAt?: number;
  updatedOn?: string;

  purchaseDate?: number;
  completedAt?: number;

  answers: string;
  surveyId: string;
  processResult?: string;
  name?: string;
  status?: SurveyAnswerProcessStatus;
}

export interface TraningPlan {
  id?: string;

  createdBy?: string;
  updatedBy?: string;

  createdAt?: number;
  createdOn?: string;

  updatedAt?: number;
  updatedOn?: string;

  step?: TraningPlanSteps;
  [TraningPlanSteps.CHOOSE_TARGET_AREAS]?: string[];
  [key: string]: any;
}

export enum TraningPlanSteps {
  OVERVIEW = "overview",
  WARM_UP = "warm_up",
  CHOOSE_TARGET_AREAS = "choose_target_areas",
  COMPLETE_PLAN = "complete_plan",
  SUMMARY = "summary",
}

export enum IndicatorSurveyCompleteStates {
  NOT_READY = "notReadyToBeCompleted",
}

