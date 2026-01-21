import { PATHS } from "../../paths";
import { MicroAppsBases } from "../location/microAppsBases";
import { IFrameEventTypes } from "./iframeEventEnums";

export const generateIframeSource = <T extends Record<string, string>>(name: IFrameEventTypes, srcData: T): string => {
  switch (name) {
    case IFrameEventTypes.taxamoPayment:
      return `${MicroAppsBases.PAYMENT_TAXAMO}#${PATHS.PAYMENT_TAXAMO.HOME}?orderId=${srcData.orderId}`;
    case IFrameEventTypes.accountSettings:
      return MicroAppsBases.ACCOUNT_SETTINGS;
    case IFrameEventTypes.calendlySheduling:
      return `${MicroAppsBases.SCHEDULING_CALENDLY}#${PATHS.SCHEDULING_CALENDLY.HOME}?discussionSchedulingId=${srcData.discussionSchedulingId}&scheduleType=${srcData.scheduleType}`;
    case IFrameEventTypes.reportVideo:
      return `${MicroAppsBases.MWI}#${PATHS.MWI.VIDEO_MODAL}?video=${srcData.video}`;
    case IFrameEventTypes.countryOfResidence:
      return `${MicroAppsBases.ACCOUNT_SETTINGS}#${PATHS.ACCOUNT_SETTINGS.COUNTRY_OF_RESIDENCE}`;
    case IFrameEventTypes.chooseFocusAreas:
      return `${MicroAppsBases.GUIDES_V2}#${PATHS.GUIDES_V2.CHOOSE_FOCUS_AREAS}?answerId=${srcData.answerId}&step=${srcData.step}${srcData.sentEmail ? "&sentEmail=true" : ""}`;
    case IFrameEventTypes.selectNewDateTime:
      return `${MicroAppsBases.GUIDES_V2}#${PATHS.GUIDES_V2.PROMPT_TO_NEW_DATE}`;
    case IFrameEventTypes.notifyMFA:
      return `${MicroAppsBases.ACCOUNT_SETTINGS}#${PATHS.ACCOUNT_SETTINGS.MFA_NOTIFICATION}`;
    case IFrameEventTypes.discounts:
      return `${MicroAppsBases.DISCOUNTS}#${PATHS.DISCOUNTS.HOME}?answerId=${srcData.answerId}&surveyId=${srcData.surveyId}&packageId=${srcData.packageId}&price=${srcData.price}${srcData.btnId ? `&btnId=${srcData.btnId}` : ""}`;
  }
};

