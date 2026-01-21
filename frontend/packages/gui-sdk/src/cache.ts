import * as O from "fp-ts/Option";
import * as F from "fp-ts/function";

// TODO: Need to use different caching systems, not only localStorage.

export enum CacheKeys {
  Version = "version",
  Person = "person",
  AccessToken = "accessToken",
  GuiError = "guiError",
  PageTracking = "pageTracking",
  EventTracking = "eventTracking",
  Packages = "packages",
  SurveyAnswers = "surveyAnswers",
  Marketing = "isMarketing",
  LastSurveyAnswerId = "lastSurveyAnswerId",
  DebugFlag = "debug",
  ChosenPackageId = "chosenPackageId",
  SourcePath = "sourcePath",
}

export function getDataFromCache<T>(key: CacheKeys): O.Option<T> {
  return F.pipe(O.fromNullable(localStorage.getItem(key)), O.map<string, T>(JSON.parse));
}

export function putDataToCache<T>(key: CacheKeys, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function removeDataFromCache(key: CacheKeys) {
  localStorage.removeItem(key);
}

export function clear() {
  localStorage.clear();
}

