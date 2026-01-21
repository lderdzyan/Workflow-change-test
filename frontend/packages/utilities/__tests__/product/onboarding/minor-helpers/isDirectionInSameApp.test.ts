import { describe, test, expect, beforeEach, afterAll } from "@jest/globals";
import { isDirectionInSameApp } from "../../../../src/product/onboarding/utils";
import { MicroAppsBases } from "../../../../src/shared/location/microAppsBases";

describe("isDirectionInSameApp", () => {
  const originalMsAppPath = (window as any).MS_APP_PATH;

  const setMsAppPath = (value: string) => {
    (window as any).MS_APP_PATH = value;
  };

  beforeEach(() => {
    setMsAppPath("tools/auth");
  });

  afterAll(() => {
    (window as any).MS_APP_PATH = originalMsAppPath;
  });

  test("should return true when MS_APP_PATH matches direction base (without trailing slash in MS_APP_PATH)", () => {
    setMsAppPath("tools/auth");
    expect(isDirectionInSameApp(MicroAppsBases.AUTH)).toBe(true);

    setMsAppPath("tools/builder");
    expect(isDirectionInSameApp(MicroAppsBases.BUILDER)).toBe(true);

    setMsAppPath("tools/indicator");
    expect(isDirectionInSameApp(MicroAppsBases.INDICATOR)).toBe(true);
  });

  test("should return true when MS_APP_PATH includes a trailing slash", () => {
    setMsAppPath("tools/auth/");
    expect(isDirectionInSameApp(MicroAppsBases.AUTH)).toBe(true);

    setMsAppPath("tools/guides2/");
    expect(isDirectionInSameApp(MicroAppsBases.GUIDES_V2)).toBe(true);
  });

  test("should return false when MS_APP_PATH points to a different app", () => {
    setMsAppPath("tools/auth");
    expect(isDirectionInSameApp(MicroAppsBases.BUILDER)).toBe(false);
    expect(isDirectionInSameApp(MicroAppsBases.MWI)).toBe(false);
    expect(isDirectionInSameApp(MicroAppsBases.INDICATOR)).toBe(false);
  });

  test("should return false when MS_APP_PATH is missing or empty", () => {
    setMsAppPath("");
    expect(isDirectionInSameApp(MicroAppsBases.AUTH)).toBe(false);

    (window as any).MS_APP_PATH = undefined;
    expect(isDirectionInSameApp(MicroAppsBases.AUTH)).toBe(false);
  });
});

