import * as O from "fp-ts/Option";
import { getCurrentPerson, personHasNeededCredentials, Credential } from "@repo/gui-sdk";

type IsFullyLoggedIn = () => boolean;
export const isFullyLoggedIn: IsFullyLoggedIn = () => {
  const person = getCurrentPerson();
  if (!O.isSome(person.user)) {
    return false;
  } else if (!person.credentials) {
    return false;
  } else {
    if (person.user.value.mfaOptout) {
      return personHasNeededCredentials(Credential.EMAIL, Credential.PASSWORD);
    } else {
      return personHasNeededCredentials(Credential.EMAIL, Credential.PASSWORD, Credential.MFA);
    }
  }
};
