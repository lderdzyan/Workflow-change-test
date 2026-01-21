import { Effect } from "effect";
import * as TE from "fp-ts/TaskEither";
import { signOut } from "./sdk/sign-out";

enum StatusCodes {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

export const handleAuthErrorsE = (response: Response): Effect.Effect<void, never, never> => {
  const shouldLogout = response.status === StatusCodes.Unauthorized || response.status === StatusCodes.Forbidden;
  if (shouldLogout) {
    return Effect.sync(() => signOut());
  }
  return Effect.void;
};

export const handleAuthErrorsFP = (response: Response): TE.TaskEither<never, void> => {
  const shouldLogout = response.status === StatusCodes.Unauthorized || response.status === StatusCodes.Forbidden;
  if (shouldLogout) {
    return TE.fromIO(() => signOut());
  }
  return TE.right(undefined);
};

