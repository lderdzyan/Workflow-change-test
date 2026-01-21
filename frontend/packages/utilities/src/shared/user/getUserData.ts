import { Person } from "@repo/gui-sdk";
import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/Option";
import { genUserName } from "./genUserName";

type GetPersonTextProperties = (getPerson: () => Person) => string;
export const getPersonIdentity: GetPersonTextProperties = (getPerson) =>
  pipe(
    getPerson().user,
    O.match(
      () => "",
      (user) => user.identity,
    ),
  );

export const getPersonName: GetPersonTextProperties = (getPerson) =>
  pipe(
    getPerson().user,
    O.match(
      () => "",
      (user) => genUserName(user.firstName, user.lastName),
    ),
  );

export const getPersonCountry: GetPersonTextProperties = (getPerson) =>
  pipe(
    getPerson().user,
    O.match(
      () => "",
      (user) => user.country || "",
    ),
  );
