import { GuideProfile } from "../models";
import { MsoData } from "./";

export interface GuideSaveProfileResponse extends MsoData {
  p: GuideProfile;
}
