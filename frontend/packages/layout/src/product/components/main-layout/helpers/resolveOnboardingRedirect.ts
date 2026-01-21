import * as O from "fp-ts/Option";
import { getEnforcedOnboardingRoute, getUserOnboardingCurrentProgress, isCurrentLocationAllowedForOnboarding, OnboardingDirection } from "@repo/utilities";
import { handleHalfOnboardedUserCase } from "./handleHalfOnboardedUserCase";

export const resolveOnboardingRedirect = async (): Promise<O.Option<OnboardingDirection>> => {
  const onboardingProgress = getUserOnboardingCurrentProgress();
  if (onboardingProgress) {
    if (isCurrentLocationAllowedForOnboarding(onboardingProgress)) {
      return O.none;
    } else {
      const direction = getEnforcedOnboardingRoute(onboardingProgress);
      if (direction) {
        return O.some(direction);
      } else {
        return O.none;
      }
    }
  } else {
    const directionToRedirect = await handleHalfOnboardedUserCase();
    if (O.isSome(directionToRedirect)) {
      return O.some(directionToRedirect.value);
    }
    return O.none;
  }
};

