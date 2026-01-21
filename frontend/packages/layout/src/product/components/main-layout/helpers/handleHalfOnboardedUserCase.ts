import * as O from "fp-ts/Option";
import { isRight } from "fp-ts/lib/Either";
import { Effect } from "effect";
import { createSearchParams } from "react-router-dom";
import { checkUserIsRegistered, Credential, getAnswer, getCurrentPerson, getSourcePathFromChache, getSurveyAnswers, personHasNeededCredentials, SurveyAnswerProcessStatus } from "@repo/gui-sdk";
import { isDirectionTheCurrentLocation, MicroAppsBases, OnboardingDirection, OnboardingFlow, OnboardingStep, PATHS, setOnboardingStep, VerificationTypes } from "@repo/utilities";

//function for handling half passed users onboarding that don't have
export const handleHalfOnboardedUserCase = async () => {
  const person = getCurrentPerson();

  if (!O.isSome(person.user)) {
    return O.none;
  }

  const registrationResult = await checkUserIsRegistered(person.user.value.identity)();

  if (isRight(registrationResult) && registrationResult.right) {
    return wrapDirectionWithOption(redirectToFinishRegistration());
  }

  const mwiStepDirection = getMWIOnboardingStep();
  if (mwiStepDirection) {
    return wrapDirectionWithOption(mwiStepDirection);
  }

  const indicatorStepDirection = await getIndicatorOnboardingStep();
  if (indicatorStepDirection) {
    return wrapDirectionWithOption(indicatorStepDirection);
  }

  const source = getSourcePathFromChache();

  const redirectTarget = {
    path: source === MicroAppsBases.BUILDER ? `#${PATHS.AUTH.BUILDER_START}` : `#${PATHS.AUTH.INDICATOR_START}`,
    base: MicroAppsBases.AUTH,
  };

  return wrapDirectionWithOption(redirectTarget);
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
    const lastSurvey = cachedSurvey.value.at(-1);
    if (!lastSurvey) return null;

    const isCompleted = Object.keys(lastSurvey.answers ?? {}).length === 31;

    return isCompleted ? setOnboardingStep(OnboardingFlow.MWI, OnboardingStep.SURVEY_COMPLETED) : setOnboardingStep(OnboardingFlow.MWI, OnboardingStep.EMAIL_ENTERED);
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

const wrapDirectionWithOption = (direction: OnboardingDirection) => (isDirectionTheCurrentLocation(direction) ? O.none : O.some(direction));

