import { describe, test, expect, jest, afterEach } from "@jest/globals";
import * as O from "fp-ts/Option";
import { getLastSurveyAnswerId } from "@repo/gui-sdk";
import { MicroAppsBases } from "../../../src/shared";
import { buildB2b2cUserRedirectionPath, demographicModalShouldBeOpened } from "../../../src/product";

jest.mock("@repo/gui-sdk");
jest.mock("../../../src/product/modalTriggers/checkDemographicDate");

const mockedGetLastSurveyAnswerId = getLastSurveyAnswerId as jest.Mock;
const mockedDemographicModalShouldBeOpened = demographicModalShouldBeOpened as jest.Mock;

describe("buildB2b2cUserRedirectionPath", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("returns report path with demographic query when answer exists and demographic is true", () => {
    mockedGetLastSurveyAnswerId.mockReturnValue(O.some("answer123"));
    mockedDemographicModalShouldBeOpened.mockReturnValue(true);

    const result = buildB2b2cUserRedirectionPath();

    expect(result).toEqual({
      path: "#/survey?surveyId=answer123&tab=report&demographic=true",
      base: MicroAppsBases.MWI,
    });
  });

  test("returns report path without demographic query when answer exists and demographic is false", () => {
    mockedGetLastSurveyAnswerId.mockReturnValue(O.some("answer456"));
    mockedDemographicModalShouldBeOpened.mockReturnValue(false);

    const result = buildB2b2cUserRedirectionPath();

    expect(result).toEqual({
      path: "#/survey?surveyId=answer456&tab=report",
      base: MicroAppsBases.MWI,
    });
  });

  test("returns surveys list path when no answer exists", () => {
    mockedGetLastSurveyAnswerId.mockReturnValue(O.none);
    mockedDemographicModalShouldBeOpened.mockReturnValue(true);

    const result = buildB2b2cUserRedirectionPath();

    expect(result).toEqual({
      path: "#/surveys",
      base: MicroAppsBases.MWI,
    });
  });
});

