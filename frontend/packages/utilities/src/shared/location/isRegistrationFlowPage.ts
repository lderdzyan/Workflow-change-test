import { SurveyPageTabs } from "./../../product/survey/surveyPageTabs";
import { PATHS } from "../../paths";

type IsRegistrationFlowPage = () => boolean;
export const isRegistrationFlowPage: IsRegistrationFlowPage = () => {
  const registrationFlowPages = [
    PATHS.AUTH.FINISH_REGISTRATION,
    PATHS.AUTH.VERIFICATION,
    "set-password",
    `tab=${SurveyPageTabs.SURVEY}`,
    `tab=${SurveyPageTabs.PURCHASE_LANDING}`,
    `tab=${SurveyPageTabs.PURCHASE_INTERMEDIARY}`,
    PATHS.BUILDER.PURCHASE_LANDING,
    PATHS.BUILDER.PURCHASE_INTERMEDIARY,
  ];
  const href = window.location.href;
  return registrationFlowPages.some((pagePath) => href.includes(pagePath));
};

