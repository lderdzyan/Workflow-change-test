import { createId } from "@paralleldrive/cuid2";
import * as O from "fp-ts/Option";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";

import { incrementPersonAuthLevel } from "./auth";
import { AuthLevel, Credential, Person, User, UserType } from "../models";
import { CacheKeys, getDataFromCache, putDataToCache } from "../cache";
import APIPaths from "../api-paths";
import { doPost } from "../request";
import { EmptyResponse, SignInResponse } from "../dtos";
import { RequestError } from "../request-error";

export const getCurrentPerson = (): Person =>
  pipe(
    getDataFromCache<Person>(CacheKeys.Person),
    O.match(
      () => {
        const person = createNewPerson();
        setCurrentPerson(person);
        return person;
      },
      (person) => person,
    ),
  );

export const getAccessToken = (): string =>
  pipe(
    getDataFromCache<string>(CacheKeys.AccessToken),
    O.match(
      () => "",
      (accessToken) => accessToken,
    ),
  );

export function setCurrentPerson(person: Person) {
  putDataToCache(CacheKeys.Person, person);
}

export function updatePersonWithResponseData(identity: string, response: SignInResponse): Person {
  const currentPerson = getCurrentPerson();
  const onboarding = O.isSome(currentPerson.user) ? currentPerson.user.value.onboarding : undefined;

  const updatedPerson: Person = {
    pid: response.rpid ?? currentPerson.pid,
    authLevel: currentPerson.authLevel,
    credentials: currentPerson.credentials,
    updatedAt: Date.now(),
    user: O.some<User>({
      uid: response.u.id,
      identity: identity,
      country: response.u.country,
      mfaOptout: response.u.mfaOptout,
      firstName: response.u.firstName,
      lastName: response.u.lastName,
      username: response.u.username,
      marketing: false,
      msWebAdmin: response.u.msWebAdmin,
      demographicData: response.u.demographicDate,
      userTypes: response.u.userTypes,
      isPasswordSet: response.u.isPasswordSet,
      countrySetDate: response.u.countrySetDate,
      mfaOptoutSetDate: response.u.mfaOptoutSetDate,
      appList: response.u.appList,
      isB2b2c: response.u.isB2b2c,
      onboarding: onboarding,
    }),
  };

  setCurrentPerson(updatedPerson);

  return updatedPerson;
}

export function createNewPerson(): Person {
  return {
    pid: createId(),
    authLevel: AuthLevel.Auth0,
    credentials: [],
    user: O.none,
  };
}

export function isUserGuide(): boolean {
  const person = getCurrentPerson();
  if (O.isSome(person.user) && person.user.value.userTypes != null) {
    return person.user.value.userTypes.includes(UserType.MS_GUIDE);
  }

  return false;
}

export function isUserAdmin(): boolean {
  const person = getCurrentPerson();
  if (O.isSome(person.user) && person.user.value.userTypes != null) {
    return person.user.value.userTypes.includes(UserType.MS_WEB_ADMIN);
  }

  return false;
}

const storagePersonShouldBeUpdated = (updatePeriod: number) => {
  const person = getCurrentPerson();
  if (person.updatedAt) {
    const periodInMilliseconds = updatePeriod * 60 * 60 * 1000;
    const now = Date.now();
    return now >= person.updatedAt + periodInMilliseconds;
  }
  return true;
};

type GetUserDataOptions = {
  identity: string;
};
export const getAndSetUserData = async (options: GetUserDataOptions): Promise<void> => {
  await pipe(
    fetchUserInfo({ identity: options.identity }),
    TE.chain((response) => {
      updatePersonWithResponseData(options.identity, response);
      return TE.right(response);
    }),
  )();
};

type SetPasswordOptions = {
  pwd: string;
  identity: string;
  firstName?: string;
  lastName?: string;
};
export const setPassword = (options: SetPasswordOptions): TE.TaskEither<RequestError, EmptyResponse> =>
  doPost(APIPaths.User.SetPassword, {
    sp: {
      pwd: options.pwd,
      identity: options.identity.trim().toLowerCase(),
      firstName: options.firstName,
      lastName: options.lastName,
    },
  });

export type DemographicDataOptions = {
  gender: string;
  birthRegion: string;
  age: string;
  industry: string;
  education: string;
  occupation: string;
  liveRegion: string;
};
export const saveDemographicData = (options: DemographicDataOptions): TE.TaskEither<RequestError, EmptyResponse> =>
  pipe(
    doPost(APIPaths.User.SaveDemographicData, { dd: options }),
    TE.flatMap((response) => {
      const person = getCurrentPerson();
      if (O.isSome(person.user)) {
        person.user.value.demographicData = Date.now();
        setCurrentPerson(person);
      }
      return TE.right(response);
    }),
  );

type VerifyNewEmailOptions = { email: string };
export const verifyNewEmail = (options: VerifyNewEmailOptions): TE.TaskEither<RequestError, EmptyResponse> => doPost<EmptyResponse>(APIPaths.User.VerifyEmail, { u: options });

type UpdateUserSettingsOptions = {
  firstName?: string;
  lastName?: string;
  password?: string;
  identity: string;
  email: string;
  mfaOptout?: boolean;
  country?: string;
  countryIsSet?: boolean;
  mfaOptoutIsSet?: boolean;
};

export const updateUserSettings = (options: UpdateUserSettingsOptions): TE.TaskEither<RequestError, EmptyResponse> =>
  pipe(
    doPost<SignInResponse>(APIPaths.User.Update, { u: options }),
    TE.chain((response) => {
      const currentPerson = getCurrentPerson();
      if (response.u.mfaOptout === false && O.isSome(currentPerson.user) && response.u.mfaOptout !== currentPerson.user.value.mfaOptout) {
        setCurrentPerson(incrementPersonAuthLevel(currentPerson, Credential.MFA));
      }
      const updatedUser = O.isSome(currentPerson.user) ? { ...response, u: { ...currentPerson.user.value, ...response.u } } : response;
      updatePersonWithResponseData(options.email || options.identity, updatedUser);
      return TE.right({ hdtl: response.hdtl, mdtl: response.mdtl });
    }),
  );

type VerifyPasswordOptions = { identity: string; password: string };
export const verifyPassword = (options: VerifyPasswordOptions): TE.TaskEither<RequestError, EmptyResponse> => doPost<EmptyResponse>(APIPaths.User.VerifyPassword, { u: options });

type FetchUserInfoOptions = { identity: string };
export const fetchUserInfo = (options: FetchUserInfoOptions): TE.TaskEither<RequestError, SignInResponse> => doPost<SignInResponse>(APIPaths.User.GetUserInfo, { u: { identity: options.identity } });

type OnboardingUpdateOptions = { flow?: string; step: string };
export const updateUserOnboardingStep = (options: OnboardingUpdateOptions) => {
  const person = getCurrentPerson();
  if (O.isSome(person.user)) {
    const onboardingObj = { flow: options.flow ?? person.user.value.onboarding?.flow, step: options.step };
    const updatedPerson: Person = { ...person, user: O.some({ ...person.user.value, onboarding: { ...onboardingObj } }) };
    setCurrentPerson(updatedPerson);
  }
};

export function getSourcePathFromChache(): string {
  return localStorage.getItem(CacheKeys.SourcePath) ?? "";
}

