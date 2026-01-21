export enum UserType {
  MS_WEB_ADMIN = "MS_WEB_ADMIN",
  MS_GUIDE = "MS_GUIDE",
  MS_USER = "MS_USER",
  MS_WEB_DEBUG = "MS_WEB_DEBUG",
}

export interface User {
  uid: string;
  identity: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  marketing?: boolean;
  country?: string;
  mfaOptout?: boolean;
  userTypes: UserType[];
  msWebAdmin?: boolean;
  demographicData?: number;
  isPasswordSet?: boolean;
  countrySetDate?: number;
  mfaOptoutSetDate?: number;
  appList?: string[];
  isB2b2c?: boolean;
  onboarding?: {
    flow?: string;
    step: string;
  };
}

export const createUser = (uid: string, identity: string, marketing: boolean = false, country: string | undefined = undefined): User => ({
  uid,
  identity,
  marketing,
  userTypes: [UserType.MS_USER],
  country,
});
