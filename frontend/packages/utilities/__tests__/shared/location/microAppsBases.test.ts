import { describe, test, expect } from "@jest/globals";

import { MicroAppsBases, isConceptApp, isPrimaryApp, isSecondaryApp, makeBaseFromAppPath } from "../../../src/shared/location/microAppsBases";

describe("isSecondaryApp", () => {
  test("should return true for secondary apps", () => {
    expect(isSecondaryApp(MicroAppsBases.AUTH)).toBe(true);
    expect(isSecondaryApp(MicroAppsBases.ACCOUNT_SETTINGS)).toBe(true);
  });

  test("should return false for non-secondary apps", () => {
    expect(isSecondaryApp(MicroAppsBases.MWI)).toBe(false);
    expect(isSecondaryApp(MicroAppsBases.GUIDES)).toBe(false);
  });
});

describe("isPrimaryApp", () => {
  test("should return true for primary apps", () => {
    expect(isPrimaryApp(MicroAppsBases.MWI)).toBe(true);
    expect(isPrimaryApp(MicroAppsBases.DASHBOARD)).toBe(true);
  });

  test("should return false for non-primary apps", () => {
    expect(isPrimaryApp(MicroAppsBases.AUTH)).toBe(false);
    expect(isPrimaryApp(MicroAppsBases.ACCOUNT_SETTINGS)).toBe(false);
  });
});

describe("makeBaseFromAppPath", () => {
  test("should correctly format app path into a base path", () => {
    expect(makeBaseFromAppPath("tools/mwi")).toBe("/tools/mwi/");
    expect(makeBaseFromAppPath("account/settings")).toBe("/account/settings/");
  });
});

describe("isConceptApp", () => {
  test("should return true for concept apps", () => {
    expect(isConceptApp("tools/indicator")).toBe(true);
    expect(isConceptApp("tools/builder")).toBe(true);
    expect(isConceptApp("tools/dashboard")).toBe(true);
  });

  test("should return false for non-concept apps", () => {
    expect(isConceptApp("tools/mwi")).toBe(false);
    expect(isConceptApp("tools/auth")).toBe(false);
  });
});

