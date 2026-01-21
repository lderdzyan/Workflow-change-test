import * as O from "fp-ts/Option";
import { getLastSurveyAnswerId } from "@repo/gui-sdk";
import { OnboardingFlow, OnboardingProgress, OnboardingStep } from "./types";
import { MicroAppsBases, VerificationTypes } from "../../shared";
import { PATHS } from "../../paths";
import { SurveyPageTabs } from "../survey/surveyPageTabs";
import { buildB2b2cUserRedirectionPath } from "../navigations";

export interface Direction {
  path: string;
  base: MicroAppsBases;
}

export const getDirectionByProgress = (progress: OnboardingProgress): { direction: Direction | null; allowedRoutes: Direction[] } => {
  if (!progress) return { direction: null, allowedRoutes: [] };
  const purchaseVerificationPath = `#${PATHS.AUTH.VERIFICATION}?type=${VerificationTypes.purchase}`;
  const finishRegistrationFirstStepPath = `#${PATHS.AUTH.FINISH_REGISTRATION}?step=start`;
  const purchaseCompletedAllowedRoute = { base: MicroAppsBases.AUTH, path: `#${PATHS.AUTH.FINISH_REGISTRATION}?step=set-password` };

  switch (progress.flow) {
    case OnboardingFlow.MWI: {
      const activeSurveyId = getLastSurveyAnswerId();
      const surveyIdQueryParam = O.isSome(activeSurveyId) ? `&surveyId=${activeSurveyId.value}` : "";
      switch (progress.step) {
        case OnboardingStep.EMAIL_ENTERED:
          return {
            direction: { path: `#${PATHS.MWI.SURVEY}?tab=${SurveyPageTabs.SURVEY}${surveyIdQueryParam}`, base: MicroAppsBases.MWI },
            allowedRoutes: [],
          };

        case OnboardingStep.SURVEY_COMPLETED:
          return { direction: { path: `#${PATHS.MWI.SURVEY}?tab=${SurveyPageTabs.PURCHASE_LANDING}${surveyIdQueryParam}`, base: MicroAppsBases.MWI }, allowedRoutes: [] };

        case OnboardingStep.PACKAGE_CHOSEN:
          return { direction: { path: purchaseVerificationPath, base: MicroAppsBases.AUTH }, allowedRoutes: [] };

        case OnboardingStep.EMAIL_VERIFIED:
          return { direction: { path: `#${PATHS.MWI.SURVEY}?tab=${SurveyPageTabs.PURCHASE_INTERMEDIARY}${surveyIdQueryParam}`, base: MicroAppsBases.MWI }, allowedRoutes: [] };

        case OnboardingStep.PURCHASE_COMPLETED:
          return { direction: { path: finishRegistrationFirstStepPath, base: MicroAppsBases.AUTH }, allowedRoutes: [purchaseCompletedAllowedRoute] };

        case OnboardingStep.PASSWORD_CREATED:
          return { direction: buildB2b2cUserRedirectionPath(), allowedRoutes: [] };

        default:
          return { direction: null, allowedRoutes: [] };
      }
    }

    case OnboardingFlow.BUILDER: {
      switch (progress.step) {
        case OnboardingStep.EMAIL_ENTERED:
          return { direction: { path: purchaseVerificationPath, base: MicroAppsBases.AUTH }, allowedRoutes: [] };

        case OnboardingStep.EMAIL_VERIFIED:
          return { direction: { path: `#${PATHS.BUILDER.PURCHASE_INTERMEDIARY}`, base: MicroAppsBases.BUILDER }, allowedRoutes: [] };

        case OnboardingStep.PURCHASE_COMPLETED:
          return {
            direction: { path: finishRegistrationFirstStepPath, base: MicroAppsBases.AUTH },
            allowedRoutes: [purchaseCompletedAllowedRoute],
          };

        case OnboardingStep.PASSWORD_CREATED:
          return { direction: { path: "", base: MicroAppsBases.BUILDER }, allowedRoutes: [] };

        default:
          return { direction: null, allowedRoutes: [] };
      }
    }

    case OnboardingFlow.INDICATOR: {
      switch (progress.step) {
        case OnboardingStep.EMAIL_ENTERED:
          return { direction: { path: `#${PATHS.INDICATOR.SURVEY}`, base: MicroAppsBases.INDICATOR }, allowedRoutes: [] };

        case OnboardingStep.SURVEY_COMPLETED:
          return {
            direction: { path: `#${PATHS.INDICATOR.RESULTS_PREVIEW}`, base: MicroAppsBases.INDICATOR },
            allowedRoutes: [
              { path: `#${PATHS.INDICATOR.SURVEY}`, base: MicroAppsBases.INDICATOR },
              { path: `#${PATHS.BUILDER.PURCHASE_LANDING}`, base: MicroAppsBases.BUILDER },
            ],
          };

        case OnboardingStep.PACKAGE_CHOSEN:
          return { direction: { path: purchaseVerificationPath, base: MicroAppsBases.AUTH }, allowedRoutes: [] };

        case OnboardingStep.EMAIL_VERIFIED:
          return { direction: { path: `#${PATHS.BUILDER.PURCHASE_INTERMEDIARY}`, base: MicroAppsBases.BUILDER }, allowedRoutes: [] };

        case OnboardingStep.PURCHASE_COMPLETED:
          return { direction: { path: finishRegistrationFirstStepPath, base: MicroAppsBases.AUTH }, allowedRoutes: [purchaseCompletedAllowedRoute] };

        case OnboardingStep.PASSWORD_CREATED:
          return { direction: { path: "", base: MicroAppsBases.BUILDER }, allowedRoutes: [] };

        default:
          return { direction: null, allowedRoutes: [] };
      }
    }

    default:
      return { direction: null, allowedRoutes: [] };
  }
};

