import * as TE from "fp-ts/TaskEither";
import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/function";
import { createId } from "@paralleldrive/cuid2";
import APIPaths from "../api-paths";
import { TOTPVerifyResponse, EmptyResponse } from "../dtos";
import { doPost, RequestError } from "../request";
import { getCurrentPerson, setCurrentPerson } from "../sdk/user";
import { createUser } from "../models/User";
import { AuthLevel, Credential } from "../models";
import { incrementPersonAuthLevel } from "./auth";

type VerifyEmailCountryOptions = { email: string; country: string };
export const verifyEmailCountry = (options: VerifyEmailCountryOptions): TE.TaskEither<RequestError, EmptyResponse> =>
  doPost<EmptyResponse>(APIPaths.Auth.VerifyEmailCountry, { u: { email: options.email.trim().toLowerCase(), country: options.country } });

type VerifyEmailOptions = { email: string; country: string; marketing?: boolean; isB2b2cFlow: boolean };
export const verifyEmail = (options: VerifyEmailOptions): TE.TaskEither<RequestError, EmptyResponse> => {
  const currentPerson = getCurrentPerson();
  if (O.isNone(currentPerson.user)) {
    currentPerson.user = O.some(createUser("", options.email.trim().toLowerCase(), options.marketing ?? false, options.country));
  } else {
    if (currentPerson.user.value.identity !== options.email.trim().toLowerCase()) {
      currentPerson.user = O.some(createUser("", options.email.trim().toLowerCase(), options.marketing ?? false, options.country));
      currentPerson.pid = createId();
    }
  }
  setCurrentPerson({ ...currentPerson, authLevel: AuthLevel.Auth1, credentials: [Credential.EMAIL] });

  return doPost<EmptyResponse>(APIPaths.Auth.VerifyEmail, { d: { email: options.email.trim().toLowerCase(), isB2b2c: options.isB2b2cFlow } });
};

type VerifyTOTPCode = {
  code: string;
  identity: string;
  reg?: boolean;
  authUpdate?: boolean;
  email?: string;
};
export const verifyTOTPCode = (options: VerifyTOTPCode): TE.TaskEither<RequestError, string> =>
  pipe(
    doPost<TOTPVerifyResponse>(APIPaths.Auth.VerifyTOTPCode, {
      v: {
        code: options.code,
        identity: options.identity.trim().toLowerCase(),
        reg: options.reg,
        email: options.email,
      },
    }),
    TE.flatMap((response) => {
      const currentPerson = getCurrentPerson();
      currentPerson.pid = response.personId;
      if (options.authUpdate) {
        setCurrentPerson(incrementPersonAuthLevel(currentPerson, Credential.MFA));
      } else {
        setCurrentPerson(currentPerson);
      }

      return TE.right(response.secret ?? "");
    }),
  );

