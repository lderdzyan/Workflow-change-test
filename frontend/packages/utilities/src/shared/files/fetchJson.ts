import { Effect, pipe } from "effect";

export enum FetchError {
  FETCH_FAILED = "fetch_failed",
}

export type FetchJson = <T>(path: string) => Effect.Effect<T, FetchError>;

export const fetchJson: FetchJson = (path: string) =>
  pipe(
    Effect.tryPromise({
      try: async () => {
        const res = await fetch(window.MS_CDN_URL + path);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        return json;
      },
      catch: () => FetchError.FETCH_FAILED,
    }),
  );

