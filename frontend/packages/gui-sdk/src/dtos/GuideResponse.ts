import { GuideProfile } from "../models";
import { MsoData } from "./";

export interface GuideResponse extends MsoData {
  guideProfile: GuideProfile;
}

