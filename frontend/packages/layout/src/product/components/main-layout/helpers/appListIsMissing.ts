import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/function";
import { Person } from "@repo/gui-sdk";

export const isAppListMissing = (person: Person): boolean =>
  pipe(
    person.user,
    O.match(
      () => false,
      (user) => user.appList == null,
    ),
  );

