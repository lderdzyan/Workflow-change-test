import { ReactNode, useEffect, useMemo } from "react";
import { appListAccessCheck, genReturnLocationString, isFullyLoggedIn, redirectToExternalLink } from "@repo/utilities";
import { AccessActions, buildDirectionToMain, buildDirectionToSignInWithReturnLocation, getAccessCheckAction } from "./helpers";

interface IProps {
  children: ReactNode;
  accessChecker: () => boolean;
  isAuthApp?: boolean;
}

export function AccessCheckWrapper({ children, accessChecker, isAuthApp = false }: IProps) {
  const isAllowed = useMemo(() => accessChecker(), []);
  const action = useMemo(() => getAccessCheckAction(isAllowed, isFullyLoggedIn(), appListAccessCheck(), isAuthApp), [isAllowed]);

  useEffect(() => {
    if (action === AccessActions.REDIRECT_MAIN) {
      const { path, base } = buildDirectionToMain();
      redirectToExternalLink(path, base);
    } else if (action === AccessActions.REDIRECT_SIGN_IN) {
      const { path, base } = buildDirectionToSignInWithReturnLocation(genReturnLocationString());
      redirectToExternalLink(path, base);
    }
  }, [isAllowed, action]);

  return action === AccessActions.RENDER ? children : null;
}

