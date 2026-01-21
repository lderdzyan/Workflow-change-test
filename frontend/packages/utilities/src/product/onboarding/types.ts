export enum OnboardingFlow {
  MWI = "mwi",
  BUILDER = "builder",
  INDICATOR = "indicator",
}

export enum OnboardingStep {
  EMAIL_ENTERED = "emailEntered",
  SURVEY_COMPLETED = "surveyCompleted",
  PACKAGE_CHOSEN = "packageChosen",
  EMAIL_VERIFIED = "emailVerified",
  PURCHASE_COMPLETED = "purchaseCompleted",
  PASSWORD_CREATED = "passwordCreated",
}

export type OnboardingProgress = {
  flow: OnboardingFlow;
  step: OnboardingStep;
};
