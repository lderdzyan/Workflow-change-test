import { describe, test, expect } from "@jest/globals";

import { findMainPageRedirectionPath } from "./../../../src/product/navigations/redirectionToMainPage/index";
import { MicroAppsBases } from "../../../src/shared/location/microAppsBases";
import { NotCompletedFeature, SurveyType } from "@repo/gui-sdk";

describe("findMainPageRedirectionPath", () => {
  test("returns returnLocation if provided", () => {
    const result = findMainPageRedirectionPath(false, "/some/path");
    expect(result).toEqual({ path: "/some/path" });
  });

  test("redirects concepts user with exactly one survey (INDICATOR)", () => {
    const surveys: NotCompletedFeature[] = [{ type: SurveyType.INDICATOR, id: "1" }];
    const result = findMainPageRedirectionPath(true, null, surveys);
    expect(result).toEqual({ path: "", base: MicroAppsBases.INDICATOR });
  });

  test("redirects concepts user with exactly one survey (BUILDER)", () => {
    const surveys: NotCompletedFeature[] = [{ type: SurveyType.BUILDER, id: "1" }];
    const result = findMainPageRedirectionPath(true, null, surveys);
    expect(result).toEqual({ path: "", base: MicroAppsBases.BUILDER });
  });

  test("redirects concepts user with multiple surveys to dashboard", () => {
    const surveys: NotCompletedFeature[] = [
      { type: SurveyType.BUILDER, id: "1" },
      { type: SurveyType.INDICATOR, id: "2" },
    ];
    const result = findMainPageRedirectionPath(true, null, surveys);
    expect(result).toEqual({ path: "#/", base: MicroAppsBases.DASHBOARD });
  });

  test("redirects concepts user with no surveys to dashboard", () => {
    const result = findMainPageRedirectionPath(true, null, []);
    expect(result).toEqual({ path: "#/", base: MicroAppsBases.DASHBOARD });
  });

  test("redirects non-concepts user with no returnLocation to surveys page", () => {
    const result = findMainPageRedirectionPath(false, null);
    expect(result).toEqual({ path: "#/surveys", base: MicroAppsBases.MWI });
  });
});

