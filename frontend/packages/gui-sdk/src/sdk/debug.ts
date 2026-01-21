import * as O from "fp-ts/Option";
import { CacheKeys, getDataFromCache, putDataToCache } from "../cache";
import { getCurrentPerson } from "./user";
import { UserType } from "../models";

export const isDebugActive = (): boolean => {
  const debugValue = getDataFromCache<boolean>(CacheKeys.DebugFlag);
  return O.isSome(debugValue) && debugValue.value;
};

export const updateDebugValueInCache = (value: boolean): boolean => {
  putDataToCache(CacheKeys.DebugFlag, value);
  return isDebugActive();
};

export function isUserDebugger(): boolean {
  const person = getCurrentPerson();
  if (O.isSome(person.user) && person.user.value.userTypes != null) {
    return person.user.value.userTypes.includes(UserType.MS_WEB_DEBUG);
  }

  return false;
}

