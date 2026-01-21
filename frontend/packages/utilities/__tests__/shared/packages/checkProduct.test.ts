import { describe, test, expect } from "@jest/globals";

import { checkProduct } from "./../../../src/shared/packages/checkProduct";
import { ProductType, ShortName, SurveyAnswer, SurveyAnswerProcessStatus, Package } from "@repo/gui-sdk";

const makePackage = (products: { shortName: ShortName; type: ProductType }[]): Package => ({
  id: "1",
  name: "Guided discussion",
  description: "Take the inventory...",
  personId: "1",
  updatedAt: 1721920133458,
  products,
});

describe("checkProduct", () => {
  const baseSurveyAnswer: SurveyAnswer = {
    id: "1",
    surveyId: "survey-1",
    status: SurveyAnswerProcessStatus.InProgress,
    packageInfo: [makePackage([{ shortName: ShortName.Survey, type: ProductType.Taxamo }, { shortName: ShortName.GuidedDiscussion, type: ProductType.Taxamo }])],
  };

  test("should return false if surveyAnswer is null", () => {
    expect(checkProduct(null, ShortName.Survey)).toBe(false);
  });

  test("should return true if product exists in packageInfo", () => {
    expect(checkProduct(baseSurveyAnswer, ShortName.Survey)).toBe(true);
    expect(checkProduct(baseSurveyAnswer, ShortName.GuidedDiscussion)).toBe(true);
  });

  test("should return false if product does not exist in packageInfo", () => {
    expect(checkProduct(baseSurveyAnswer, ShortName.WLFBuilder)).toBe(false);
  });

  test("should return false if packageInfo is missing", () => {
    const surveyWithoutPackages: SurveyAnswer = {
      ...baseSurveyAnswer,
      packageInfo: undefined,
    };
    expect(checkProduct(surveyWithoutPackages, ShortName.Survey)).toBe(false);
  });

  test("should return false if products array is empty", () => {
    const surveyWithEmptyProducts: SurveyAnswer = {
      ...baseSurveyAnswer,
      packageInfo: [makePackage([])],
    };
    expect(checkProduct(surveyWithEmptyProducts, ShortName.Survey)).toBe(false);
  });
});

