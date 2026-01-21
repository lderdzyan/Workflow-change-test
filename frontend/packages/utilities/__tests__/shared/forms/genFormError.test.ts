import { genFormError } from "../../../src/shared/forms/genFormError";
import { describe, test, expect } from "@jest/globals";

describe("genFormError", () => {
  const mockData = {
    case1: {},
    case2: { email: "Invalid email" },
    case3: { email: "Invalid email", password: "Too short" },
    case4: { email: "Invalid email", confirmEmail: "Invalid email" },
    case5: { email: "Invalid email", password: "Too short", confirmPassword: "Invalid email" },
  };

  test("returns an empty array for empty input", () => {
    expect(genFormError(mockData.case1)).toEqual([]);
  });

  test("returns a single error for one error", () => {
    expect(genFormError(mockData.case2)).toEqual(["Invalid email"]);
  });

  test("returns unique errors for multiple unique errors", () => {
    expect(genFormError(mockData.case3)).toEqual(["Invalid email", "Too short"]);
  });

  test("filters out duplicate errors", () => {
    expect(genFormError(mockData.case4)).toEqual(["Invalid email"]);
  });

  test("handles mixed unique and duplicate errors", () => {
    expect(genFormError(mockData.case5)).toEqual(["Invalid email", "Too short"]);
  });
});
