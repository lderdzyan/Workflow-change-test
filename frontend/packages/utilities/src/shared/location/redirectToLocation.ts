import { findLocationBase } from "./findLocationBase";
import { MicroAppsBases, isSecondaryApp } from "./microAppsBases";
import { appBaseColors } from "../UI/appBaseColors";

let leaveCheck: (() => Promise<boolean>) | null = null;

export function registerLeaveCheck(cb: (() => Promise<boolean>) | null) {
  leaveCheck = cb;
}

export async function confirmLeave(): Promise<boolean> {
  return leaveCheck ? leaveCheck() : true;
}

export const redirectToBase = () => {
  redirectToExternalLink(findLocationBase());
};

const performRedirect = (url: string) => {
  const topWindow = window.top;

  if (topWindow && topWindow !== window.self) {
    topWindow.location.href = url;
  } else {
    window.location.href = url;
  }
};

type RedirectToExternalLink = (path: string, basePath?: MicroAppsBases, rawPath?: boolean) => void;
export const redirectToExternalLink: RedirectToExternalLink = (path, basePath, rawPath) => {
  const redirectionPath = `${basePath ?? ""}${path}`;

  const buildRedirectWithSourcePathParam = (): string => {
    if (basePath && isSecondaryApp(basePath)) {
      const appBase = ("/" + window.MS_APP_PATH + "/") as MicroAppsBases;
      const colorSource = appBaseColors[appBase];
      if (colorSource) {
        const sourcePathParam = `sourcePath=${appBase}`;

        const stringAfterQuestionMark = redirectionPath.split("?")[1];
        if (stringAfterQuestionMark) {
          return redirectionPath + "&" + sourcePathParam;
        }
        return redirectionPath + "?" + sourcePathParam;
      }
    }
    return redirectionPath;
  };

  const finalPath = rawPath ? redirectionPath : buildRedirectWithSourcePathParam();

  if (!leaveCheck) {
    performRedirect(finalPath);
  } else {
    leaveCheck().then((ok) => {
      if (ok) performRedirect(finalPath);
    });
  }
};

