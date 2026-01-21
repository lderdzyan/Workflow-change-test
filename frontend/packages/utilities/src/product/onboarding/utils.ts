import * as O from "fp-ts/Option";
import { getCurrentPerson } from "@repo/gui-sdk";
import { FLOW_STEPS_ORDER } from "./steps-order";
import { OnboardingFlow, OnboardingProgress } from "./types";
import { MicroAppsBases } from "../../shared";
import { getDirectionByProgress } from "./getDirectionByProgress";
import { OnboardingDirection } from "./update-onboarding";
import { removeTrailingSlashes } from "./guard-checks";

export const createInitialProgress = (flow: OnboardingFlow): OnboardingProgress => {
  const firstStep = FLOW_STEPS_ORDER[flow]?.[0];

  if (!firstStep) {
    throw new Error(`No onboarding steps configured for flow: ${flow}`);
  }

  return { flow, step: firstStep };
};

export const getOnboardingNextStep = (): OnboardingProgress | null => {
  const currentProgress = getUserOnboardingCurrentProgress();
  if (currentProgress == null) return null;

  if (currentProgress.flow == null) {
    throw new Error(`No onboarding flow configured for step: ${currentProgress.step}`);
  }

  const steps = FLOW_STEPS_ORDER[currentProgress.flow];
  if (!steps) return null;

  const currentIndex = steps.indexOf(currentProgress.step);
  if (currentIndex === -1) return null;

  const nextStep = steps[currentIndex + 1];
  if (!nextStep) return null;

  return { flow: currentProgress.flow, step: nextStep };
};

export const getUserOnboardingCurrentProgress = (): OnboardingProgress | null => {
  const person = getCurrentPerson();
  if (O.isSome(person.user) && person.user.value.onboarding) {
    return person.user.value.onboarding as OnboardingProgress;
  }
  return null;
};

export const isDirectionInSameApp = (directionBase: MicroAppsBases): boolean => {
  const currentBase = "/" + window.MS_APP_PATH;
  return currentBase === removeTrailingSlashes(directionBase);
};

export const getEnforcedOnboardingRoute = (progress: OnboardingProgress | null): OnboardingDirection => {
  if (!progress) return null;

  const { direction } = getDirectionByProgress(progress);
  if (!direction) return null;

  return { path: direction.path, base: direction.base };
};

