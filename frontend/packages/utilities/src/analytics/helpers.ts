import { MicroAppsBases, MicroAppsNames } from "../shared/location/microAppsBases";

type GetPageType = (base: string) => string;
export const getPageType: GetPageType = (base) => {
  switch (base) {
    case MicroAppsBases.MWI:
      return MicroAppsNames.MWI;
    case MicroAppsBases.AUTH:
      return MicroAppsNames.AUTH;
    case MicroAppsBases.GUIDES:
      return MicroAppsNames.GUIDES;
    case MicroAppsBases.ACCOUNT_SETTINGS:
      return MicroAppsNames.ACCOUNT_SETTINGS;
    case MicroAppsBases.SCHEDULING_CALENDLY:
      return MicroAppsNames.SCHEDULING_CALENDLY;
    case MicroAppsBases.PAYMENT_TAXAMO:
      return MicroAppsNames.PAYMENT_TAXAMO;
    case MicroAppsBases.GUIDES_V2:
      return MicroAppsNames.GUIDES_V2;
    case MicroAppsBases.MIRROR_REFLECTIONS:
      return MicroAppsNames.MIRROR_REFLECTIONS;
    case MicroAppsBases.BUILDER:
      return MicroAppsNames.BUILDER;
    case MicroAppsBases.INDICATOR:
      return MicroAppsNames.INDICATOR;
    case MicroAppsBases.DISCOUNTS:
      return MicroAppsNames.DISCOUNTS;
    case MicroAppsBases.DASHBOARD:
      return MicroAppsNames.DASHBOARD;
    default:
      return "other";
  }
};

