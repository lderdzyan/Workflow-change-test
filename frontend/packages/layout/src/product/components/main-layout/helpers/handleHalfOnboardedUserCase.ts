import * as O from "fp-ts/Option";
import { isRight } from "fp-ts/lib/Either";
import { Effect } from "effect";
import { createSearchParams } from "react-router-dom";
import { checkUserIsRegistered, Credential, getAnswer, getCurrentPerson, getSourcePathFromChache, getSurveyAnswers, personHasNeededCredentials, SurveyAnswerProcessStatus } from "@repo/gui-sdk";
import { MicroAppsBases, OnboardingFlow, OnboardingStep, PATHS, setOnboardingStep, VerificationTypes } from "@repo/utilities";

//function for handling half passed users onboarding that don't have
export const handleHalfOnboardedUserCase = async () => {
  const person = getCurrentPerson();

  if (!O.isSome(person.user)) {
    return O.none;
  }

  const registrationResult = await checkUserIsRegistered(person.user.value.identity)();

  if (isRight(registrationResult) && registrationResult.right) {
    return O.some(redirectToFinishRegistration());
  }

  const mwiStep = getMWIOnboardingStep();
  if (mwiStep) {
    return O.some(mwiStep);
  }

  const indicatorStep = await getIndicatorOnboardingStep();
  if (indicatorStep) {
    return O.some(indicatorStep);
  }

  const source = getSourcePathFromChache();

  return O.some({
    path: source === MicroAppsBases.BUILDER ? `#${PATHS.AUTH.BUILDER_START}` : `#${PATHS.AUTH.INDICATOR_START}`,
    base: MicroAppsBases.AUTH,
  });
};

const redirectToFinishRegistration = () => {
  if (personHasNeededCredentials(Credential.MFA)) {
    const search = createSearchParams({ step: "set-password" }).toString();

    return {
      path: `#${PATHS.AUTH.FINISH_REGISTRATION}?${search}`,
      base: MicroAppsBases.AUTH,
    };
  }

  const search = createSearchParams({
    type: VerificationTypes.default,
    returnLocation: `#${PATHS.AUTH.FINISH_REGISTRATION}?step=set-password`,
  }).toString();

  return {
    path: `#${PATHS.AUTH.VERIFICATION}?${search}`,
    base: MicroAppsBases.AUTH,
  };
};

const getMWIOnboardingStep = () => {
  const cachedSurvey = getSurveyAnswers();

  if (O.isSome(cachedSurvey)) {
    return cachedSurvey.value.length === 31 ? setOnboardingStep(OnboardingFlow.MWI, OnboardingStep.SURVEY_COMPLETED) : setOnboardingStep(OnboardingFlow.MWI, OnboardingStep.EMAIL_ENTERED);
  }

  return null;
};

const getIndicatorOnboardingStep = async () => {
  const result = await Effect.runPromise(getAnswer());

  if (!O.isSome(result) || !result.value.indicator) {
    return null;
  }

  const step = result.value.indicator.status === SurveyAnswerProcessStatus.Done ? OnboardingStep.SURVEY_COMPLETED : OnboardingStep.EMAIL_ENTERED;

  return setOnboardingStep(OnboardingFlow.INDICATOR, step);
};

