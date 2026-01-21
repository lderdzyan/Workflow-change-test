import * as O from "fp-ts/Option";
import { NotCompletedFeature, SurveyType, getLastSurveyAnswerId } from "@repo/gui-sdk";
import { demographicModalShouldBeOpened } from "../../modalTriggers/checkDemographicDate";
import { PATHS } from "../../../paths";
import { MicroAppsBases } from "../../../shared/location";
import { SurveyPageTabs } from "../../survey/surveyPageTabs";

const SurveyTypeToAppBase: Partial<Record<SurveyType, MicroAppsBases>> = {
  [SurveyType.INDICATOR]: MicroAppsBases.INDICATOR,
  [SurveyType.BUILDER]: MicroAppsBases.BUILDER,
};

export const findMainPageRedirectionPath = (isConceptsUser: boolean, returnLocation: string | null, toDoSurveys?: NotCompletedFeature[]): { path: string; base?: MicroAppsBases } => {
  if (returnLocation) {
    return { path: returnLocation };
  } else {
    if (isConceptsUser) {
      return conceptsUserRedirection(toDoSurveys);
    } else {
      return { path: `#${PATHS.MWI.SURVEYS_LIST}`, base: MicroAppsBases.MWI };
    }
  }
};

const conceptsUserRedirection = (toDoSurveys?: NotCompletedFeature[]): { path: string; base?: MicroAppsBases } => {
  if (toDoSurveys?.length === 1) {
    const onlySurvey = toDoSurveys[0] as NotCompletedFeature;
    return { path: "", base: SurveyTypeToAppBase[onlySurvey.type] };
  }
  return { path: `#${PATHS.DASHBOARD.HOME}`, base: MicroAppsBases.DASHBOARD };
};

export const buildB2b2cUserRedirectionPath = (): { path: string; base: MicroAppsBases } => {
  const answer = getLastSurveyAnswerId();
  if (O.isSome(answer)) {
    const activeSurveyPagePath = `#${PATHS.MWI.SURVEY}?surveyId=${answer.value}&tab=${SurveyPageTabs.REPORT}`;
    return { path: injectDemographicQuery(activeSurveyPagePath), base: MicroAppsBases.MWI };
  }
  return { path: `#${PATHS.MWI.SURVEYS_LIST}`, base: MicroAppsBases.MWI };
};

const injectDemographicQuery = (path: string): string => {
  const demographicQuery = demographicModalShouldBeOpened() ? "&demographic=true" : "";
  return path + demographicQuery;
};

