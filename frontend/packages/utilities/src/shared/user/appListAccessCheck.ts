import { getCurrentPerson } from "@repo/gui-sdk";
import { isSome } from "fp-ts/lib/Option";

export const appListAccessCheck = (): boolean => {
  if (window?.MS_APP_PATH) {
    const person = getCurrentPerson();
    const optionUser = person.user;
    if (isSome(optionUser)) {
      const isAppInAList = Boolean(optionUser.value.appList?.find((appPath) => appPath === "/" + window.MS_APP_PATH));
      return isAppInAList;
    }
    return false;
  }
  return false;
};

