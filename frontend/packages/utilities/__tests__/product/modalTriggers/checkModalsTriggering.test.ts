import { describe, test, expect, jest } from "@jest/globals";
import * as O from "fp-ts/Option";
import { checkAndReturnCountryReviewModalData } from "../../../src/product/modalTriggers/userDataChecks";
import { getCurrentPerson } from "@repo/gui-sdk";
import { isFullyLoggedIn } from "../../../src/shared/user/isFullyLoggedIn";
import { checkCountryUpdatedDate } from "../../../src/product/modalTriggers/checkCountryUpdatedDate";
import { IFrameEventTypes } from "../../../src/shared/iframe/iframeEventEnums";

jest.mock("@repo/gui-sdk", () => ({
  getCurrentPerson: jest.fn(),
}));

jest.mock("../../../src/shared/user/isFullyLoggedIn", () => ({
  isFullyLoggedIn: jest.fn(),
}));

jest.mock("../../../src/product/modalTriggers/checkCountryUpdatedDate", () => ({
  checkCountryUpdatedDate: jest.fn(),
}));

describe("checkAndReturnCountryReviewModalData", () => {
  const mockGetCurrentPerson = getCurrentPerson as jest.Mock;
  const mockIsFullyLoggedIn = isFullyLoggedIn as jest.Mock;
  const mockCheckCountryUpdatedDate = checkCountryUpdatedDate as jest.Mock;

  test("returns modal data and trigger modal when countrySetDate is not set", () => {
    mockIsFullyLoggedIn.mockReturnValue(true);
    mockGetCurrentPerson.mockReturnValue({
      user: O.some({
        countrySetDate: null,
      }),
    });
    mockCheckCountryUpdatedDate.mockReturnValue(true);

    const result = checkAndReturnCountryReviewModalData();
    expect(result).toEqual({
      modalName: IFrameEventTypes.countryOfResidence,
      trigger: expect.any(Function),
    });
  });

  test("returns modal data and trigger modal when countrySetDate is older than 365 days", () => {
    mockIsFullyLoggedIn.mockReturnValue(true);
    mockGetCurrentPerson.mockReturnValue({
      user: O.some({
        countrySetDate: 1633024800000,
      }),
    });
    mockCheckCountryUpdatedDate.mockReturnValue(true);

    const result = checkAndReturnCountryReviewModalData();
    expect(result).toEqual({
      modalName: IFrameEventTypes.countryOfResidence,
      trigger: expect.any(Function),
    });
  });

  test("returns null when user is not fully logged in", () => {
    mockIsFullyLoggedIn.mockReturnValue(false);
    mockGetCurrentPerson.mockReturnValue({
      user: O.some({
        countrySetDate: 1633024800000,
      }),
    });

    const result = checkAndReturnCountryReviewModalData();
    expect(result).toBeNull();
  });

  test("returns null when countrySetDate is set and not older than 365 days", () => {
    mockIsFullyLoggedIn.mockReturnValue(true);
    mockGetCurrentPerson.mockReturnValue({
      user: O.some({
        countrySetDate: 1633024800000,
      }),
    });
    mockCheckCountryUpdatedDate.mockReturnValue(false);

    const result = checkAndReturnCountryReviewModalData();
    expect(result).toBeNull();
  });
});

describe("checkAndReturnMFANotificationModalData", () => {
  const mockGetCurrentPerson = getCurrentPerson as jest.Mock;
  const mockIsFullyLoggedIn = isFullyLoggedIn as jest.Mock;

  test("returns null when user is not fully logged in", () => {
    mockIsFullyLoggedIn.mockReturnValue(false);
    mockGetCurrentPerson.mockReturnValue({
      user: O.some({
        countrySetDate: 1633024800000,
      }),
    });

    const result = checkAndReturnCountryReviewModalData();
    expect(result).toBeNull();
  });

  test("returns null when mfaOptout is false", () => {
    mockIsFullyLoggedIn.mockReturnValue(false);
    mockGetCurrentPerson.mockReturnValue({
      user: O.some({
        mfaOptout: false,
      }),
    });

    const result = checkAndReturnCountryReviewModalData();
    expect(result).toBeNull();
  });

  test("returns null when mfaOptoutSetDate is set", () => {
    mockIsFullyLoggedIn.mockReturnValue(false);
    mockGetCurrentPerson.mockReturnValue({
      user: O.some({
        mfaOptoutSetDate: 1633024800000,
      }),
    });

    const result = checkAndReturnCountryReviewModalData();
    expect(result).toBeNull();
  });

  test("returns modal data and trigger modal when mfaOptout is true and mfaOptoutSetDate is not set", () => {
    mockIsFullyLoggedIn.mockReturnValue(true);
    mockGetCurrentPerson.mockReturnValue({
      user: O.some({
        mfaOptout: true,
        mfaOptoutSetDate: null,
      }),
    });

    const result = checkAndReturnCountryReviewModalData();
    expect(result).toEqual({
      modalName: IFrameEventTypes.countryOfResidence,
      trigger: expect.any(Function),
    });
  });
});

