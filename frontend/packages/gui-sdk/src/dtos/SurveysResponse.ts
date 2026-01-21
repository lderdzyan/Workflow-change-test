import { MsoData } from ".";
import { Survey } from "../models";

export interface SurveysResponse extends MsoData {
  surveys: Survey[];
}
