import { updateUserOnboardingStep } from "@repo/gui-sdk";
import { NavigateFunction } from "react-router-dom";
import { OnboardingFlow, OnboardingStep } from "./types";
import { createInitialProgress, getEnforcedOnboardingRoute, getOnboardingNextStep, isDirectionInSameApp } from "./utils";
import { MicroAppsBases, redirectToExternalLink } from "../../shared";

export type OnboardingDirection = { path: string; base: MicroAppsBases } | null;

export const startOnboarding = (flow: OnboardingFlow): OnboardingDirection => {
  const progress = createInitialProgress(flow);
  updateUserOnboardingStep(progress);
  return getEnforcedOnboardingRoute(progress);
};

export const setOnboardingStep = (flow: OnboardingFlow, step: OnboardingStep): OnboardingDirection => {
  const progress = { flow: flow, step: step };
  updateUserOnboardingStep(progress);
  return getEnforcedOnboardingRoute(progress);
};

export const continueOnboarding = (): OnboardingDirection => {
  const progress = getOnboardingNextStep();
  if (progress == null) return null;

  updateUserOnboardingStep(progress);
  return getEnforcedOnboardingRoute(progress);
};

export const performOnboardingRedirection = (direction: OnboardingDirection, navigate: NavigateFunction): void => {
  if (direction == null) return;
  if (isDirectionInSameApp(direction.base)) {
    navigate(direction.path.replace("#", ""));
  } else {
    redirectToExternalLink(direction.path, direction.base);
  }
};

