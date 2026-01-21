import { OnboardingFlow, OnboardingStep } from "./types";

export const FLOW_STEPS_ORDER: Record<OnboardingFlow, OnboardingStep[]> = {
  [OnboardingFlow.MWI]: [OnboardingStep.EMAIL_ENTERED, OnboardingStep.SURVEY_COMPLETED, OnboardingStep.PACKAGE_CHOSEN, OnboardingStep.EMAIL_VERIFIED, OnboardingStep.PURCHASE_COMPLETED, OnboardingStep.PASSWORD_CREATED],
  [OnboardingFlow.BUILDER]: [OnboardingStep.EMAIL_ENTERED, OnboardingStep.EMAIL_VERIFIED, OnboardingStep.PURCHASE_COMPLETED, OnboardingStep.PASSWORD_CREATED],
  [OnboardingFlow.INDICATOR]: [
    OnboardingStep.EMAIL_ENTERED,
    OnboardingStep.SURVEY_COMPLETED,
    OnboardingStep.PACKAGE_CHOSEN,
    OnboardingStep.EMAIL_VERIFIED,
    OnboardingStep.PURCHASE_COMPLETED,
    OnboardingStep.PASSWORD_CREATED,
  ],
};

