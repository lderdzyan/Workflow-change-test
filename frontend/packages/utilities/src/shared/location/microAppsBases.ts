export enum MicroAppsNames {
  MWI = "MWI",
  AUTH = "AUTH",
  GUIDES = "GUIDES",
  GUIDES_V2 = "GUIDES_V2",
  ACCOUNT_SETTINGS = "ACCOUNT_SETTINGS",
  SCHEDULING_CALENDLY = "SCHEDULING_CALENDLY",
  PAYMENT_TAXAMO = "PAYMENT_TAXAMO",
  MIRROR_REFLECTIONS = "MIRROR_REFLECTIONS",
  INDICATOR = "INDICATOR",
  DISCOUNTS = "DISCOUNTS",
  DASHBOARD = "DASHBOARD",
  BUILDER = "BUILDER",
}

export enum MicroAppsBases {
  MWI = "/tools/mwi/",
  AUTH = "/tools/auth/",
  GUIDES = "/tools/guides/",
  ACCOUNT_SETTINGS = "/account/settings/",
  SCHEDULING_CALENDLY = "/scheduling/calendly/",
  PAYMENT_TAXAMO = "/payment/taxamo/",
  GUIDES_V2 = "/tools/guides2/",
  MIRROR_REFLECTIONS = "/tools/mirrors/",
  INDICATOR = "/tools/indicator/",
  DISCOUNTS = "/tools/discounts/",
  DASHBOARD = "/tools/dashboard/",
  BUILDER = "/tools/builder/",
}

export enum IntranetMicroAppsNames {
  INT_PRICING = "INT_PRICING",
  INT_PROMO = "INT_PROMO",
  INT_SCHEDULING = "INT_SCHEDULING",
}

export enum IntranetMicroAppsBases {
  INT_PRICING = "/intranet/pricing",
  INT_PROMO = "/intranet/promo",
  INT_SCHEDULING = "/intranet/scheduling",
}

const secondaryApps: MicroAppsBases[] = [MicroAppsBases.AUTH, MicroAppsBases.DISCOUNTS, MicroAppsBases.ACCOUNT_SETTINGS];

const primaryApps: MicroAppsBases[] = [
  MicroAppsBases.MWI,
  MicroAppsBases.GUIDES,
  MicroAppsBases.SCHEDULING_CALENDLY,
  MicroAppsBases.PAYMENT_TAXAMO,
  MicroAppsBases.GUIDES_V2,
  MicroAppsBases.MIRROR_REFLECTIONS,
  MicroAppsBases.INDICATOR,
  MicroAppsBases.DASHBOARD,
  MicroAppsBases.BUILDER,
];

export const isSecondaryApp = (app: MicroAppsBases): boolean => {
  return secondaryApps.includes(app);
};

export const isPrimaryApp = (app: MicroAppsBases): boolean => {
  return primaryApps.includes(app);
};

export const makeBaseFromAppPath = (appPath: string): MicroAppsBases => ("/" + appPath + "/") as MicroAppsBases;

const conceptAppBases: MicroAppsBases[] = [MicroAppsBases.INDICATOR, MicroAppsBases.BUILDER, MicroAppsBases.DASHBOARD];

export const isConceptApp = (appPath: string) => {
  return conceptAppBases.includes(makeBaseFromAppPath(appPath));
};

