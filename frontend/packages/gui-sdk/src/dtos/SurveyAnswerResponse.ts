import { SurveyAnswer } from "../models/SurveyAnswer";
import { MsoData } from "./";

export interface SurveyAnswerResponse extends MsoData {
  answer: SurveyAnswer;
}

