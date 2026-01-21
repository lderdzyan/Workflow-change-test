import { IntranetMicroAppsNames, MicroAppsNames } from "../shared/location/microAppsBases";
import { ACCOUNT_SETTINGS_PATHS } from "./account-settings";
import { AUTH_PATHS } from "./auth";
import { BUILDER_PATHS } from "./builder";
import { CALENDLY_SCHEDULING_PATHS } from "./calendly-scheduling";
import { DASHBOARD_PATHS } from "./dashboard";
import { DISCOUNTS_PATHS } from "./discounts";
import { GUIDES_PATHS } from "./guides";
import { GUIDES_V2_PATHS } from "./guides-v2";
import { INDICATOR_PATHS } from "./indicator";
import { INT_PRICING_PATHS } from "./int-pricing";
import { INT_PROMO_PATHS } from "./int-promo";
import { INT_SCHEDULING_PATHS } from "./int-scheduling";
import { MIRROR_REFLECTIONS_PATHS } from "./mirror-reflections";
import { MWI_PATHS } from "./mwi";
import { TAXAMO_PAYMENT_PATHS } from "./taxamo-payment";

export const PATHS = {
  [MicroAppsNames.ACCOUNT_SETTINGS]: ACCOUNT_SETTINGS_PATHS,
  [MicroAppsNames.AUTH]: AUTH_PATHS,
  [MicroAppsNames.SCHEDULING_CALENDLY]: CALENDLY_SCHEDULING_PATHS,
  [MicroAppsNames.DASHBOARD]: DASHBOARD_PATHS,
  [MicroAppsNames.DISCOUNTS]: DISCOUNTS_PATHS,
  [MicroAppsNames.GUIDES]: GUIDES_PATHS,
  [MicroAppsNames.GUIDES_V2]: GUIDES_V2_PATHS,
  [MicroAppsNames.MIRROR_REFLECTIONS]: MIRROR_REFLECTIONS_PATHS,
  [MicroAppsNames.BUILDER]: BUILDER_PATHS,
  [MicroAppsNames.MWI]: MWI_PATHS,
  [MicroAppsNames.PAYMENT_TAXAMO]: TAXAMO_PAYMENT_PATHS,
  [MicroAppsNames.INDICATOR]: INDICATOR_PATHS,
  [IntranetMicroAppsNames.INT_PRICING]: INT_PRICING_PATHS,
  [IntranetMicroAppsNames.INT_PROMO]: INT_PROMO_PATHS,
  [IntranetMicroAppsNames.INT_SCHEDULING]: INT_SCHEDULING_PATHS,
};

