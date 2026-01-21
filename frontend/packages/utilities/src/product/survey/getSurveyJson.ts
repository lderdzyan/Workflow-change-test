import { tryCatch, TaskEither } from "fp-ts/TaskEither";

export enum FetchError {
  FETCH_FAILED = "fetch_failed",
}

type GetSurveyJson = <T>(path: string) => TaskEither<FetchError, T>;
export const getSurveyJson: GetSurveyJson = (path) => {
  return tryCatch(
    async () => {
      const response = await fetch(window.MS_CDN_URL + path);
      const data = await response.text();

      return JSON.parse(data);
    },
    () => FetchError.FETCH_FAILED,
  );
};

