import * as O from "fp-ts/Option";
import { Person } from "@repo/gui-sdk";

export const pendoVisitorInit = (person: Person) => {
  if (typeof window === "undefined") return;

  const visitorId = person.pid;

  const metadata = O.isSome(person.user)
    ? {
        email: person.user.value.identity,
        first_name: person.user.value.firstName,
        last_name: person.user.value.lastName,
        user_type: person.user.value.userTypes.join(", "),
      }
    : {};

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "pendoVisitorInit",
    pendoVisitorId: visitorId,
    ...metadata,
  });
};
