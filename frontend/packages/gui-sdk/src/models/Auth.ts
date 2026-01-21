import { SurveyType } from "../sdk/v2/models";

export enum EmailCheckStatus {
  EMAIL_NOT_FOUND = "EMAIL_NOT_FOUND",
  EMAIL_FOUND = "EMAIL_FOUND",
  PASSWORD_NOT_SET = "PASSWORD_NOT_SET",
}

export interface NotCompletedFeature {
  type: SurveyType;
  id: string;
}
