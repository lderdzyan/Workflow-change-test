import { MsoData } from "./";
import { AuthLevel, NotCompletedFeature, UserType } from "../models";

export interface SignInResponse extends MsoData {
  toDoSurveys?: NotCompletedFeature[];
  u: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    country: string;
    mfaOptout: boolean;
    msWebAdmin: boolean;
    authLevel?: AuthLevel;
    userTypes: UserType[];
    demographicDate?: number;
    isPasswordSet?: boolean;
    countrySetDate?: number;
    mfaOptoutSetDate?: number;
    appList: string[];
    isB2b2c: boolean;
  };
}
