import { MsoData } from ".";
import { Survey } from "../models";

export interface SurveyResponse extends MsoData {
  survey: Survey;
}
