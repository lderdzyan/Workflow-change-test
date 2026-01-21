import { describe, test, expect } from "@jest/globals";
import { removeTrailingSlashes } from "../../../../src/product/onboarding/guard-checks";

describe("removeTrailingSlashes", () => {
  test("should return the same string if there are no trailing slashes", () => {
    expect(removeTrailingSlashes("path")).toBe("path");
    expect(removeTrailingSlashes("/path")).toBe("/path");
    expect(removeTrailingSlashes("/path/to/resource")).toBe("/path/to/resource");
  });

  test("should remove a single trailing slash", () => {
    expect(removeTrailingSlashes("path/")).toBe("path");
    expect(removeTrailingSlashes("/path/")).toBe("/path");
  });

  test("should remove multiple trailing slashes", () => {
    expect(removeTrailingSlashes("path///")).toBe("path");
    expect(removeTrailingSlashes("/path///")).toBe("/path");
    expect(removeTrailingSlashes("/path/to/resource///")).toBe("/path/to/resource");
  });

  test("should preserve root slash", () => {
    expect(removeTrailingSlashes("/")).toBe("/");
  });

  test("should preserve single-character non-slash strings", () => {
    expect(removeTrailingSlashes("a")).toBe("a");
  });

  test("should handle empty string", () => {
    expect(removeTrailingSlashes("")).toBe("");
  });

  test("should not remove internal slashes", () => {
    expect(removeTrailingSlashes("/path//to//resource/")).toBe("/path//to//resource");
  });
});

