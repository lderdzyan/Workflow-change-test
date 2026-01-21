import { MsoData } from ".";

import { EmailCheckStatus } from "../models/Auth";
export interface EmailCheckStatusResponse extends MsoData {
  status: EmailCheckStatus;
}
