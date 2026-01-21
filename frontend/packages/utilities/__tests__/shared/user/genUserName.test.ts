import { describe, test, expect } from "@jest/globals";

import { genUserName } from './../../../src/shared/user/genUserName';

describe("genUserName", () => {
  test("returns empty string when both firstName and lastName are undefined", () => {
    expect(genUserName(undefined, undefined)).toBe("");
  });

  test("returns firstName when lastName is undefined", () => {
    expect(genUserName("Name", undefined)).toBe("Name");
  });

  test("returns lastName when firstName is undefined", () => {
    expect(genUserName(undefined, "Surname")).toBe("Surname");
  });

  test("returns firstName and lastName separated by space when both are defined", () => {
    expect(genUserName("Name", "Surname")).toBe("Name Surname");
  });

  test("trims extra spaces if one of the names is empty string", () => {
    expect(genUserName("Name", "")).toBe("Name");
    expect(genUserName("", "Surname")).toBe("Surname");
  });
});
