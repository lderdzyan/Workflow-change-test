import { Effect } from "effect";

const ParseError = new Error("Parsing failed");

export const parseJSONData = <T>(raw: string): Effect.Effect<T, Error, never> =>
  Effect.try({
    try: () => JSON.parse(raw) as T,
    catch: () => ParseError,
  });

