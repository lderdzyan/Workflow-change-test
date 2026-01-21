import { describe, test, expect } from "@jest/globals";
import { createInitialProgress } from "../../../src/product/onboarding/utils";
import { FLOW_STEPS_ORDER } from "../../../src/product/onboarding/steps-order";
import { OnboardingFlow } from "../../../src/product/onboarding/types";

describe("createInitialProgress", () => {
  test("should return first step for MWI flow", () => {
    const result = createInitialProgress(OnboardingFlow.MWI);

    expect(result).toEqual({
      flow: OnboardingFlow.MWI,
      step: FLOW_STEPS_ORDER[OnboardingFlow.MWI][0],
    });
  });

  test("should return first step for BUILDER flow", () => {
    const result = createInitialProgress(OnboardingFlow.BUILDER);

    expect(result).toEqual({
      flow: OnboardingFlow.BUILDER,
      step: FLOW_STEPS_ORDER[OnboardingFlow.BUILDER][0],
    });
  });

  test("should return first step for INDICATOR flow", () => {
    const result = createInitialProgress(OnboardingFlow.INDICATOR);

    expect(result).toEqual({
      flow: OnboardingFlow.INDICATOR,
      step: FLOW_STEPS_ORDER[OnboardingFlow.INDICATOR][0],  
    });
  });

  test("should throw when flow has no configured steps", () => {
    const invalidFlow = "unknown-flow" as OnboardingFlow;

    expect(() => createInitialProgress(invalidFlow)).toThrow("No onboarding steps configured for flow: unknown-flow");
  });
});

