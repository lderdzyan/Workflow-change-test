import { OnboardingProgress } from "./types";
import { MicroAppsBases } from "../../shared";
import { Direction, getDirectionByProgress } from "./getDirectionByProgress";
import { PATHS } from "../../paths";
import { OnboardingDirection } from "./update-onboarding";

export const isCurrentLocationAllowedForOnboarding = (progress: OnboardingProgress): boolean => {
  const currentLocation = getCurrentBaseAndPath();

  const { direction, allowedRoutes } = getDirectionByProgress(progress);

  if (!direction) return true;

  return isCurrentLocationOneOfAllowedRoutes(currentLocation, [direction, ...allowedRoutes]);
};

const AuthAllowedRoutes = [PATHS.AUTH.MWI_START, PATHS.AUTH.INDICATOR_START, PATHS.AUTH.BUILDER_START, PATHS.AUTH.SIGN_IN, PATHS.AUTH.RESET_PASSWORD];

const isCurrentLocationOneOfAllowedRoutes = (currentLocation: Direction, allowedRoutes: Direction[]): boolean => {
  const locationAllowedForStep = allowedRoutes.some((route) => currentLocation.base === removeTrailingSlashes(route.base) && currentLocation.path.startsWith(route.path));

  const isAuthAllowedPage = AuthAllowedRoutes.some((onboardingStartPath) => currentLocation.path.replace("#", "").startsWith(onboardingStartPath));

  return locationAllowedForStep || isAuthAllowedPage;
};

export const removeTrailingSlashes = (value: string): string => (value.length > 1 ? value.replace(/\/+$/, "") : value);

const getCurrentBaseAndPath = (): { path: string; base: MicroAppsBases } => ({
  path: removeTrailingSlashes(window.location.hash),
  base: removeTrailingSlashes("/" + window.MS_APP_PATH) as MicroAppsBases,
});

export const isDirectionTheCurrentLocation = (direction: OnboardingDirection): boolean => {
  const currentLocation = getCurrentBaseAndPath();
  if (!direction) return false;

  return removeTrailingSlashes(direction.path) === currentLocation.path && removeTrailingSlashes(direction.base) === currentLocation.base;
};

