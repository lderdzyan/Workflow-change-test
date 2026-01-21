import { GuideProfile } from "../models";
import { MsoData } from "./";

export interface GuidesResponse extends MsoData {
  guides: GuideProfile[];
}
