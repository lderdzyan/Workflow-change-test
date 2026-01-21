import * as O from "fp-ts/Option";
import { Person, personHasNeededCredentials, Credential } from "@repo/gui-sdk";
import { isRegistrationFlowPage, PATHS } from "@repo/utilities";
import { createSearchParams } from "react-router-dom";
import { LayoutTypes } from "../layout";

const isNotIframe = (layoutType: LayoutTypes): boolean => layoutType !== LayoutTypes.iframe;

type CheckUserSetPassword = (person: Person, layoutType: LayoutTypes) => Promise<O.Option<string>>;
export const checkUserPasswordIsSet: CheckUserSetPassword = async (person, layoutType) => {
  if (O.isSome(person.user)) {
    const hasRequiredCredentials = personHasNeededCredentials(Credential.EMAIL, Credential.MFA);
    const passwordNotSet = !person.user.value.isPasswordSet;
    const mustBeChecked = hasRequiredCredentials && !isRegistrationFlowPage() && passwordNotSet && isNotIframe(layoutType);
    if (mustBeChecked) {
      const searchParams = createSearchParams({
        step: "set-password",
      }).toString();
      return O.some(`#${PATHS.AUTH.FINISH_REGISTRATION}?${searchParams}`);
    } else {
      return O.none;
    }
  } else {
    return O.none;
  }
};

