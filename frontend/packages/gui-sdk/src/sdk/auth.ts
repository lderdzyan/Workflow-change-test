import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as O from "fp-ts/Option";

import { SignInResponse, EmptyResponse, PublishResponse } from "../dtos";
import APIPaths from "../api-paths";
import { doPost, RequestError } from "../request";
import { AuthLevel, Credential, Person } from "../models";
import { fetchUserInfo, getCurrentPerson, setCurrentPerson, setPassword, updatePersonWithResponseData } from "../sdk/user";
import { EmailCheckStatusResponse } from "../dtos/EmailCheckResponse";
import { EmailCheckStatus } from "../models/Auth";

type SignInOptions = { identity: string; password: string };
export const signIn = (options: SignInOptions): TE.TaskEither<RequestError, SignInResponse> =>
  pipe(
    doPost<SignInResponse>(APIPaths.Auth.Login, { u: { identity: options.identity, password: options.password } }),
    TE.chain((response) => {
      const person = getCurrentPerson();
      setCurrentPerson(incrementPersonAuthLevel(person, Credential.PASSWORD));
      updatePersonWithResponseData(options.identity, response);
      return TE.right(response);
    }),
  );

type SetPasswordAndFetchUserInfo = {
  pwd: string;
  identity: string;
  firstName: string;
  lastName: string;
};
export const setPasswordAndFetchUserInfo = (options: SetPasswordAndFetchUserInfo): TE.TaskEither<RequestError, SignInResponse> =>
  pipe(
    setPassword(options),
    TE.chain(() => fetchUserInfo({ identity: options.identity })),
    TE.chain((response) => {
      const person = getCurrentPerson();
      setCurrentPerson(incrementPersonAuthLevel(person, Credential.PASSWORD));
      updatePersonWithResponseData(options.identity, response);
      return TE.right(response);
    }),
  );

type RegisterOptions = {
  email: string;
  isB2b2c: boolean;
  firstName?: string;
  lastName?: string;
};
export const register = (options: RegisterOptions): TE.TaskEither<RequestError, PublishResponse> => {
  let marketing = false;
  let country: string | undefined = undefined;
  const person = getCurrentPerson();
  if (O.isSome(person.user)) {
    marketing = person.user.value.marketing ?? false;
    country = person.user.value.country;
  }
  return doPost<PublishResponse>(APIPaths.Auth.Register, { p: { ...options, marketing, country } });
};

type EmailCheckOptions = {
  email: string;
};
export const checkEmail = (options: EmailCheckOptions): TE.TaskEither<RequestError, EmailCheckStatus> =>
  pipe(
    doPost<EmailCheckStatusResponse>(APIPaths.Auth.CheckEmail, { u: { email: options.email.trim().toLowerCase() } }),
    TE.flatMap((response) => {
      if (response.status === EmailCheckStatus.EMAIL_FOUND || response.status === EmailCheckStatus.PASSWORD_NOT_SET) {
        const person = getCurrentPerson();
        setCurrentPerson({ ...person, authLevel: AuthLevel.Auth1, credentials: [Credential.EMAIL] });
      }
      return TE.right(response.status);
    }),
  );

export const checkUserIsRegistered = (email: string): TE.TaskEither<RequestError, boolean> =>
  pipe(
    doPost<EmailCheckStatusResponse>(APIPaths.Auth.CheckEmail, { u: { email: email.trim().toLowerCase() } }),
    TE.flatMap((response) => {
      return TE.right(response.status !== EmailCheckStatus.EMAIL_NOT_FOUND);
    }),
  );

type ResendTOTPOptions = {
  identity: string;
  email?: string;
};
export const resendTOTP = (options: ResendTOTPOptions): TE.TaskEither<RequestError, EmptyResponse> => doPost<EmptyResponse>(APIPaths.Auth.ResendTOTP, { u: options });

type ForgotPasswordOptions = {
  identity: string;
  email?: string;
};
export const forgotPassword = (options: ForgotPasswordOptions): TE.TaskEither<RequestError, EmptyResponse> => doPost<EmptyResponse>(APIPaths.Auth.ForgotPassword, { u: options });

export function incrementPersonAuthLevel(person: Person, credential: Credential): Person {
  if (person.credentials.includes(credential)) {
    return person;
  }
  return { ...person, authLevel: person.authLevel + 1, credentials: [...person.credentials, credential] };
}

export function personHasNeededCredentials(...credentials: Array<Credential>): boolean {
  const person = getCurrentPerson();
  return credentials.every((item) => person.credentials.includes(item));
}

