import { describe, test, expect, beforeEach, afterAll } from "@jest/globals";
import { isDirectionTheCurrentLocation } from "../../../../src/product/onboarding/guard-checks";
import { MicroAppsBases } from "@repo/utilities";

describe("isDirectionTheCurrentLocation", () => {
  const originalMsAppPath = (window as any).MS_APP_PATH;

  const setMsAppPath = (value: string) => {
    (window as any).MS_APP_PATH = value;
  };

  const setHash = (hash: string) => {
    window.location.hash = hash;
  };

  beforeEach(() => {
    setMsAppPath("tools/auth");
    setHash("#/verification");
  });

  afterAll(() => {
    (window as any).MS_APP_PATH = originalMsAppPath;
  });

  test("should return false when direction is null", () => {
    expect(isDirectionTheCurrentLocation(null)).toBe(false);
  });

  test("should return true when base and hash path match exactly", () => {
    setMsAppPath("tools/auth");
    setHash("#/verification");

    expect(
      isDirectionTheCurrentLocation({
        base: MicroAppsBases.AUTH,
        path: "#/verification",
      }),
    ).toBe(true);
  });

  test("should return true when direction base has trailing slashes (base is normalized)", () => {
    setMsAppPath("tools/auth");
    setHash("#/verification");

    const baseWithExtraSlash = (MicroAppsBases.AUTH + "/") as MicroAppsBases;

    expect(
      isDirectionTheCurrentLocation({
        base: baseWithExtraSlash,
        path: "#/verification",
      }),
    ).toBe(true);
  });

  test("should return true when current hash has trailing slashes (hash is normalized)", () => {
    setMsAppPath("tools/auth");
    setHash("#/verification///");

    expect(
      isDirectionTheCurrentLocation({
        base: MicroAppsBases.AUTH,
        path: "#/verification",
      }),
    ).toBe(true);
  });

  test("should return true when direction path has trailing slashes (direction path is normalized)", () => {
    setMsAppPath("tools/auth");
    setHash("#/verification");

    expect(
      isDirectionTheCurrentLocation({
        base: MicroAppsBases.AUTH,
        path: "#/verification///",
      }),
    ).toBe(true);
  });

  test("should return true when both current hash and direction path have trailing slashes", () => {
    setMsAppPath("tools/auth");
    setHash("#/verification///");

    expect(
      isDirectionTheCurrentLocation({
        base: MicroAppsBases.AUTH,
        path: "#/verification/////",
      }),
    ).toBe(true);
  });

  test("should return false when hash differs", () => {
    setMsAppPath("tools/auth");
    setHash("#/verification");

    expect(
      isDirectionTheCurrentLocation({
        base: MicroAppsBases.AUTH,
        path: "#/finish-registration",
      }),
    ).toBe(false);
  });

  test("should return false when base differs", () => {
    setMsAppPath("tools/auth");
    setHash("#/verification");

    expect(
      isDirectionTheCurrentLocation({
        base: MicroAppsBases.BUILDER,
        path: "#/verification",
      }),
    ).toBe(false);
  });

  test("should return false when MS_APP_PATH points to another app, even if hash matches", () => {
    setMsAppPath("tools/builder");
    setHash("#/verification");

    expect(
      isDirectionTheCurrentLocation({
        base: MicroAppsBases.AUTH,
        path: "#/verification",
      }),
    ).toBe(false);
  });
});

