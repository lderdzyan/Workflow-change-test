import { describe, test, expect, jest } from "@jest/globals";

import { SurveyJson, getQuestionsFromSurveyJson } from "../../../src/product/survey/getQuestionsFromSurveyJson";
import { FetchError, getSurveyJson } from "../../../src/product/survey/getSurveyJson";
import * as TE from "fp-ts/TaskEither";

jest.mock("../../../src/product/survey/getSurveyJson");

describe("getQuestionsFromSurveyJson", () => {
  const mockedGetSurveyJson = getSurveyJson as jest.MockedFunction<typeof getSurveyJson>;

  test("should return [] when getSurveyJson fails", async () => {
    mockedGetSurveyJson.mockReturnValue(TE.left(FetchError.FETCH_FAILED));

    const result = await getQuestionsFromSurveyJson("invalid-path");
    expect(result).toEqual([]);
  });

  test("should return descriptions from survey pages", async () => {
    const mockSurvey: SurveyJson = {
      title: "Test survey",
      pages: [
        { name: "p1", elements: [{ description: "Question 1", type: "text", name: "q1" }] },
        { name: "p2", elements: [{ description: "Question 2", type: "text", name: "q2" }] },
      ],
    };

    mockedGetSurveyJson.mockReturnValue(TE.right(mockSurvey));

    const result = await getQuestionsFromSurveyJson("/survey");
    expect(result).toEqual(["Question 1", "Question 2"]);
  });

  test("should handle missing element descriptions", async () => {
    const mockSurvey: SurveyJson = {
      title: "Test survey",
      pages: [
        { name: "p1", elements: [] },
        { name: "p2", elements: [{ type: "text", name: "q2" }] },
      ],
    };

    mockedGetSurveyJson.mockReturnValue(TE.right(mockSurvey));

    const result = await getQuestionsFromSurveyJson("/survey");
    expect(result).toEqual(["", ""]);
  });
});

