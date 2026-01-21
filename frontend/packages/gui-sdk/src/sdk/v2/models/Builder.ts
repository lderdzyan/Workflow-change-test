import { SurveyAnswerProcessStatus } from "../../..";

export enum BuilderInitialSteps {
  GET_STARTED = "get_started",
  INTRODUCTION = "introduction",
  SURVEY_PROGRESS = "survey_progress",
}

export enum BuilderWorkbookSteps {
  OVERVIEW = "overview",
  UNITY = "unity",
  SERVICE = "service",
  POTENTIAL = "expressing_full_potential",
  INTEGRITY = "integrity_with_self",
  BEING_DOING = "being_doing",
  SELF_OTHERS = "self_other",
  REALITY_INSPIRATION = "reality_inspiration",
  WELLBEING = "wellbeing",
  FOCUS_AREAS = "focus_areas",
  DEEPER_EXPLORATION = "deeper_exploration",
  INTEGRATE_SUSTAIN = "integrate_sustain",
  SUMMARY = "summary",
}

export interface Builder {
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
  step?: BuilderInitialSteps;
}

export interface WorkbookData {
  id?: string;

  createdBy?: string;
  updatedBy?: string;

  createdAt?: number;
  createdOn?: string;

  updatedAt?: number;
  updatedOn?: string;

  step?: BuilderWorkbookSteps;
  viewedModals?: string[];
  [key: string]: any;
}

export interface VimeoVideoData {
  title: string;
  description: string;
  video_id: number;
  thumbnail_url_with_play_button: string;
}
