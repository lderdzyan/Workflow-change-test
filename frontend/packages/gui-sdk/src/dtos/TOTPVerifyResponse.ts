import { AuthLevel } from "../models/Person";
import { MsoData } from "./";

export interface TOTPVerifyResponse extends MsoData {
  authLevel: AuthLevel;
  secret?: string;
  personId: string;
}
