import { makeBaseFromAppPath, MicroAppsBases } from "../../shared";

const homePathname = "/";

const appsWithIgnoredHomePages = [MicroAppsBases.INDICATOR, MicroAppsBases.BUILDER];

const isAppPathInIgnoredList = (appPath: string | undefined, ignoredApps: MicroAppsBases[]) => {
  if (appPath == null) return false;
  return ignoredApps.includes(makeBaseFromAppPath(appPath));
};

export const allowPageViewTrigger = (pathname: string, appPath: string | undefined): boolean => !(pathname === homePathname && isAppPathInIgnoredList(appPath, appsWithIgnoredHomePages));

