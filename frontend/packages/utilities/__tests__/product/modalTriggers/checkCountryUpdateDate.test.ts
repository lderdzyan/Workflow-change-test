import { describe, test, expect, beforeAll, afterAll, jest } from "@jest/globals";
import { checkCountryUpdatedDate } from "../../../src";

describe("checkCountryUpdatedDate", () => {
  const realDateNow = Date.now;
  const mockedDateNow = 1633024800000; // September 30, 2021 GMT

  beforeAll(() => {
    global.Date.now = jest.fn(() => mockedDateNow);
  });

  afterAll(() => {
    global.Date.now = realDateNow;
  });

  test("returns true when days is 0", () => {
    expect(checkCountryUpdatedDate(0)).toBe(true);
  });

  test("returns true when the date is older than the specified period (in days)", () => {
    const oldDate = mockedDateNow - 5 * 24 * 60 * 60 * 1000;
    expect(checkCountryUpdatedDate(3, oldDate)).toBe(true);
  });

  test("returns true when no date is provided", () => {
    expect(checkCountryUpdatedDate(3)).toBe(true);
  });

  test("returns true when the date is exactly on the period boundary", () => {
    const boundaryDate = mockedDateNow - 3 * 24 * 60 * 60 * 1000;
    expect(checkCountryUpdatedDate(3, boundaryDate)).toBe(true);
  });
});
