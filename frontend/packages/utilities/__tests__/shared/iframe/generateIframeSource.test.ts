import { describe, test, expect } from "@jest/globals";

import { MicroAppsBases } from "../../../src/shared/location/microAppsBases";
import { IFrameEventTypes } from "../../../src/shared/iframe/iframeEventEnums";
import { generateIframeSource } from "../../../src/shared/iframe/generateIframeSource";

describe("generateIframeSource", () => {
  test("should generate taxamoPayment URL", () => {
    const result = generateIframeSource(IFrameEventTypes.taxamoPayment, { orderId: "123" });
    expect(result).toBe(`${MicroAppsBases.PAYMENT_TAXAMO}#/?orderId=123`);
  });

  test("should return account settings base URL", () => {
    const result = generateIframeSource(IFrameEventTypes.accountSettings, {});
    expect(result).toBe(MicroAppsBases.ACCOUNT_SETTINGS);
  });

  test("should generate calendlyScheduling URL", () => {
    const result = generateIframeSource(IFrameEventTypes.calendlySheduling, {
      discussionSchedulingId: "abc",
      scheduleType: "video",
    });
    expect(result).toBe(`${MicroAppsBases.SCHEDULING_CALENDLY}#/?discussionSchedulingId=abc&scheduleType=video`);
  });

  test("should generate reportVideo URL", () => {
    const result = generateIframeSource(IFrameEventTypes.reportVideo, { video: "xyz" });
    expect(result).toBe(`${MicroAppsBases.MWI}#/video-modal?video=xyz`);
  });

  test("should generate countryOfResidence URL", () => {
    const result = generateIframeSource(IFrameEventTypes.countryOfResidence, {});
    expect(result).toBe(`${MicroAppsBases.ACCOUNT_SETTINGS}#/country-of-residence`);
  });

  test("should generate chooseFocusAreas URL with sentEmail=true", () => {
    const result = generateIframeSource(IFrameEventTypes.chooseFocusAreas, {
      answerId: "a1",
      step: "2",
      sentEmail: "true",
    });
    expect(result).toBe(`${MicroAppsBases.GUIDES_V2}#/choose-focus-areas?answerId=a1&step=2&sentEmail=true`);
  });

  test("should generate chooseFocusAreas URL without sentEmail", () => {
    const result = generateIframeSource(IFrameEventTypes.chooseFocusAreas, {
      answerId: "a2",
      step: "3",
    });
    expect(result).toBe(`${MicroAppsBases.GUIDES_V2}#/choose-focus-areas?answerId=a2&step=3`);
  });

  test("should generate selectNewDateTime URL", () => {
    const result = generateIframeSource(IFrameEventTypes.selectNewDateTime, {});
    expect(result).toBe(`${MicroAppsBases.GUIDES_V2}#/prompt-to-select-new-date-time`);
  });

  test("should generate notifyMFA URL", () => {
    const result = generateIframeSource(IFrameEventTypes.notifyMFA, {});
    expect(result).toBe(`${MicroAppsBases.ACCOUNT_SETTINGS}#/mfa-notification`);
  });

  test("should generate discounts URL with all params", () => {
    const result = generateIframeSource(IFrameEventTypes.discounts, {
      answerId: "a1",
      surveyId: "s1",
      packageId: "p1",
      price: "100",
      btnId: "b1",
    });
    expect(result).toBe(`${MicroAppsBases.DISCOUNTS}#/?answerId=a1&surveyId=s1&packageId=p1&price=100&btnId=b1`);
  });

  test("should generate discounts URL without btnId", () => {
    const result = generateIframeSource(IFrameEventTypes.discounts, {
      answerId: "a2",
      surveyId: "s2",
      packageId: "p2",
      price: "200",
    });
    expect(result).toBe(`${MicroAppsBases.DISCOUNTS}#/?answerId=a2&surveyId=s2&packageId=p2&price=200`);
  });
});

