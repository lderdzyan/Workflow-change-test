import { describe, test, expect } from "@jest/globals";

import { MicroAppsBases, MicroAppsNames } from "../../../src/shared/location/microAppsBases";
import { getPageType } from "../../../src/analytics/helpers";

describe("getPageType", () => {
  test("should return correct MicroAppsNames for known bases", () => {
    expect(getPageType(MicroAppsBases.MWI)).toBe(MicroAppsNames.MWI);
    expect(getPageType(MicroAppsBases.AUTH)).toBe(MicroAppsNames.AUTH);
    expect(getPageType(MicroAppsBases.GUIDES)).toBe(MicroAppsNames.GUIDES);
    expect(getPageType(MicroAppsBases.ACCOUNT_SETTINGS)).toBe(MicroAppsNames.ACCOUNT_SETTINGS);
    expect(getPageType(MicroAppsBases.SCHEDULING_CALENDLY)).toBe(MicroAppsNames.SCHEDULING_CALENDLY);
    expect(getPageType(MicroAppsBases.PAYMENT_TAXAMO)).toBe(MicroAppsNames.PAYMENT_TAXAMO);
    expect(getPageType(MicroAppsBases.MIRROR_REFLECTIONS)).toBe(MicroAppsNames.MIRROR_REFLECTIONS);
    expect(getPageType(MicroAppsBases.INDICATOR)).toBe(MicroAppsNames.INDICATOR);
  });

  test("should return 'other' for unknown base", () => {
    expect(getPageType("/unknown/base/")).toBe("other");
  });
});

