import { Option } from "fp-ts/Option";
import { User } from "../models/User";

export enum AuthLevel {
  Auth0,
  Auth1,
  Auth2,
  Auth3,
}

export enum Credential {
  EMAIL = "EMAIL",
  PASSWORD = "PASSWORD",
  MFA = "MFA",
}

export interface Person {
  pid: string;
  authLevel: AuthLevel;
  credentials: Array<Credential>;
  updatedAt?: number;
  user: Option<User>;
}
