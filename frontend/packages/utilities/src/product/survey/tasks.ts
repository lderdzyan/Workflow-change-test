import { Effect, pipe } from "effect";
import { loadSurveys, RequestError } from "@repo/gui-sdk";
import { FetchError, getSurveyJson } from "./getSurveyJson";
import { taskEitherToEffect } from "../taskEitherToEffect";

export interface SurveyData<T> {
  id: string;
  json: T;
}

export const loadSurveyData = <T>(): Effect.Effect<SurveyData<T>, RequestError | FetchError, never> =>
  pipe(
    taskEitherToEffect(loadSurveys()),
    Effect.flatMap((surveysArr) => {
      if (surveysArr[0] == null) {
        console.error("Survey data not found");
        return Effect.fail(FetchError.FETCH_FAILED);
      }
      const { id, path } = surveysArr[0];
      return Effect.succeed({ id, path });
    }),
    Effect.flatMap(({ id, path }) =>
      pipe(
        taskEitherToEffect(getSurveyJson<T>(path)),
        Effect.tapError(() => Effect.sync(() => console.error("Could not fetch survey JSON"))),
        Effect.map((json) => ({ id, json })),
      ),
    ),
  );

