import { MsoData } from "../../../dtos";
import { TraningPlan, IndicatorSurveyCompleteStates, IIndicator } from "../models";

export interface IndicatorAnswerResponse extends MsoData {
  indicator?: IIndicator;
  trainingPlan?: TraningPlan;
}

interface IndicatorSurveyCompleteState {
  status: IndicatorSurveyCompleteStates;
}

export interface IndicatorSurveyCompleteResponse extends MsoData {
  indicator: string | IndicatorSurveyCompleteState;
}

