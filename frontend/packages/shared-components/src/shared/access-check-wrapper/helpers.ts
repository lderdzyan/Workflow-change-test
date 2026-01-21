import { createSearchParams } from "react-router-dom";
import { findMainPageRedirectionPath, isConceptsUser, MicroAppsBases, PATHS } from "@repo/utilities";

export enum AccessActions {
  RENDER = "render",
  REDIRECT_MAIN = "redirect_to_main",
  REDIRECT_SIGN_IN = "redirect_to_sign_in",
}

export const getAccessCheckAction = (isAllowed: boolean, loggedIn: boolean, appAccessGranted: boolean, isAuthApp?: boolean): AccessActions => {
  if (!isAllowed) return isAuthApp ? AccessActions.REDIRECT_MAIN : AccessActions.REDIRECT_SIGN_IN;
  else if (loggedIn && !appAccessGranted) return AccessActions.REDIRECT_MAIN;
  return AccessActions.RENDER;
};

export const buildDirectionToMain = (): { path: string; base?: MicroAppsBases } => findMainPageRedirectionPath(isConceptsUser(), null);

export const buildDirectionToSignInWithReturnLocation = (returnLocation: string): { path: string; base?: MicroAppsBases } => {
  const params = createSearchParams({ returnLocation }).toString();
  return {
    path: `#${PATHS.AUTH.SIGN_IN}?${params}`,
    base: MicroAppsBases.AUTH,
  };
};

