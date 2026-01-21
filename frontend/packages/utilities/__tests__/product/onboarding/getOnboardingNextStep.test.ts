import { describe, test, expect, jest, afterEach } from "@jest/globals";
import * as O from "fp-ts/Option";
import { getCurrentPerson } from "@repo/gui-sdk";
import { getOnboardingNextStep } from "../../../src/product/onboarding/utils";
import { FLOW_STEPS_ORDER } from "../../../src/product/onboarding/steps-order";
import { OnboardingFlow, OnboardingStep } from "../../../src/product/onboarding/types";

jest.mock("@repo/gui-sdk");

const mockedGetCurrentPerson = getCurrentPerson as jest.Mock;

describe("getOnboardingNextStep", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const personWithOnboarding = (onboarding: any) => ({
    user: O.some({
      onboarding,
    }),
  });

  const personWithoutUser = () => ({
    user: O.none,
  });

  test("returns null when user is None", () => {
    mockedGetCurrentPerson.mockReturnValue(personWithoutUser());
    expect(getOnboardingNextStep()).toBeNull();
  });

  test("returns null when onboarding is missing", () => {
    mockedGetCurrentPerson.mockReturnValue(personWithOnboarding(undefined));
    expect(getOnboardingNextStep()).toBeNull();
  });

  test("throws when flow is missing in onboarding progress", () => {
    mockedGetCurrentPerson.mockReturnValue(
      personWithOnboarding({
        step: OnboardingStep.EMAIL_ENTERED,
      }),
    );

    expect(() => getOnboardingNextStep()).toThrow(
      `No onboarding flow configured for step: ${OnboardingStep.EMAIL_ENTERED}`,
    );
  });

  test("returns null when step is not part of flow steps order", () => {
    mockedGetCurrentPerson.mockReturnValue(
      personWithOnboarding({
        flow: OnboardingFlow.MWI,
        step: "unknownStep" as OnboardingStep,
      }),
    );

    expect(getOnboardingNextStep()).toBeNull();
  });

  test("returns the next step when current step has a successor", () => {
    const steps = FLOW_STEPS_ORDER[OnboardingFlow.MWI];
    expect(steps.length).toBeGreaterThanOrEqual(2);

    const currentStep = steps[0]!;
    const nextStep = steps[1]!;

    mockedGetCurrentPerson.mockReturnValue(
      personWithOnboarding({
        flow: OnboardingFlow.MWI,
        step: currentStep,
      }),
    );

    expect(getOnboardingNextStep()).toEqual({
      flow: OnboardingFlow.MWI,
      step: nextStep,
    });
  });

  test("returns null when current step is the last step of the flow", () => {
    const steps = FLOW_STEPS_ORDER[OnboardingFlow.BUILDER];
    expect(steps.length).toBeGreaterThanOrEqual(1);

    const lastStep = steps[steps.length - 1]!;

    mockedGetCurrentPerson.mockReturnValue(
      personWithOnboarding({
        flow: OnboardingFlow.BUILDER,
        step: lastStep,
      }),
    );

    expect(getOnboardingNextStep()).toBeNull();
  });
});
