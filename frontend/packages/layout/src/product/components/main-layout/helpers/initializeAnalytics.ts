import { getCurrentPerson } from "@repo/gui-sdk";
import { initializeGTM, pendoVisitorInit } from "@repo/utilities";

export const initializeAnalytics = () => {
  initializeGTM(window.MS_GOOGLE_TAG_MANAGER_ID);
  pendoVisitorInit(getCurrentPerson());
};

