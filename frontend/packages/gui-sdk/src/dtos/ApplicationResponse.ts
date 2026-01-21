import { MsoData } from ".";
import { Application } from "../models";

export interface ApplicationResponse extends MsoData {
  application: Application;
}
