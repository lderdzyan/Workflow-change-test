import { SurveyAnswer } from "../models/SurveyAnswer";
import { MsoData } from "./";

export interface SurveyAnswersResponse extends MsoData {
  answers: SurveyAnswer[];
}
