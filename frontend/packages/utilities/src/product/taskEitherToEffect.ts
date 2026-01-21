import { Effect } from "effect";
import * as TE from "fp-ts/TaskEither";
import { isRight } from "fp-ts/lib/Either";

export const taskEitherToEffect = <A, E>(task: TE.TaskEither<E, A>): Effect.Effect<A, E, never> =>
  Effect.async((resume) => {
    task().then((res) => (isRight(res) ? resume(Effect.succeed(res.right)) : resume(Effect.fail(res.left))));
  });

