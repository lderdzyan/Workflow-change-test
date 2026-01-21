import { describe, test, expect, beforeEach } from "@jest/globals";
import { getDirectionByProgress } from "../../../src/product/onboarding/getDirectionByProgress";
import { OnboardingFlow, OnboardingStep } from "../../../src/product/onboarding/types";
import { MicroAppsBases, VerificationTypes } from "../../../src/shared";
import { PATHS } from "../../../src/paths";
import { SurveyPageTabs } from "../../../src/product/survey/surveyPageTabs";

describe("getDirectionByProgress", () => {
  const setLastSurveyAnswerId = (id: string | null) => {
    if (id == null) {
      localStorage.removeItem("lastSurveyAnswerId");
      return;
    }
    localStorage.setItem("lastSurveyAnswerId", JSON.stringify(id));
  };

  beforeEach(() => {
    localStorage.clear();
    setLastSurveyAnswerId(null);
  });

  describe("MWI", () => {
    test("EMAIL_ENTERED → survey tab (includes surveyId when present)", () => {
      setLastSurveyAnswerId("survey-123");

      const result = getDirectionByProgress({
        flow: OnboardingFlow.MWI,
        step: OnboardingStep.EMAIL_ENTERED,
      });

      expect(result.direction).toEqual({
        base: MicroAppsBases.MWI,
        path: `#${PATHS.MWI.SURVEY}?tab=${SurveyPageTabs.SURVEY}&surveyId=survey-123`,
      });
      expect(result.allowedRoutes).toEqual([]);
    });

    test("SURVEY_COMPLETED → purchase landing tab (includes surveyId when present)", () => {
      setLastSurveyAnswerId("survey-abc");

      const result = getDirectionByProgress({
        flow: OnboardingFlow.MWI,
        step: OnboardingStep.SURVEY_COMPLETED,
      });

      expect(result.direction).toEqual({
        base: MicroAppsBases.MWI,
        path: `#${PATHS.MWI.SURVEY}?tab=${SurveyPageTabs.PURCHASE_LANDING}&surveyId=survey-abc`,
      });
      expect(result.allowedRoutes).toEqual([]);
    });

    test("PACKAGE_CHOSEN → purchase verification page", () => {
      const result = getDirectionByProgress({
        flow: OnboardingFlow.MWI,
        step: OnboardingStep.PACKAGE_CHOSEN,
      });

      expect(result.direction).toEqual({
        base: MicroAppsBases.AUTH,
        path: `#${PATHS.AUTH.VERIFICATION}?type=${VerificationTypes.purchase}`,
      });
      expect(result.allowedRoutes).toEqual([]);
    });

    test("PURCHASE_COMPLETED → finish registration start + allowed route set-password", () => {
      const result = getDirectionByProgress({
        flow: OnboardingFlow.MWI,
        step: OnboardingStep.PURCHASE_COMPLETED,
      });

      expect(result.direction).toEqual({
        base: MicroAppsBases.AUTH,
        path: `#${PATHS.AUTH.FINISH_REGISTRATION}?step=start`,
      });

      expect(result.allowedRoutes).toEqual([
        {
          base: MicroAppsBases.AUTH,
          path: `#${PATHS.AUTH.FINISH_REGISTRATION}?step=set-password`,
        },
      ]);
    });

    test("PASSWORD_CREATED → if lastSurveyAnswerId exists, redirects to report tab (with surveyId); otherwise goes to surveys list", () => {
      setLastSurveyAnswerId("survey-999");

      const withSurvey = getDirectionByProgress({
        flow: OnboardingFlow.MWI,
        step: OnboardingStep.PASSWORD_CREATED,
      });

      expect(withSurvey.direction?.base).toBe(MicroAppsBases.MWI);

      const expectedPrefix = `#${PATHS.MWI.SURVEY}?surveyId=survey-999&tab=${SurveyPageTabs.REPORT}`;
      expect(withSurvey.direction?.path.startsWith(expectedPrefix)).toBe(true);
      expect(withSurvey.allowedRoutes).toEqual([]);

      setLastSurveyAnswerId(null);

      const withoutSurvey = getDirectionByProgress({
        flow: OnboardingFlow.MWI,
        step: OnboardingStep.PASSWORD_CREATED,
      });

      expect(withoutSurvey.direction).toEqual({
        base: MicroAppsBases.MWI,
        path: `#${PATHS.MWI.SURVEYS_LIST}`,
      });
      expect(withoutSurvey.allowedRoutes).toEqual([]);
    });
  });

  describe("BUILDER", () => {
    test("EMAIL_ENTERED → purchase verification page", () => {
      const result = getDirectionByProgress({
        flow: OnboardingFlow.BUILDER,
        step: OnboardingStep.EMAIL_ENTERED,
      });

      expect(result.direction).toEqual({
        base: MicroAppsBases.AUTH,
        path: `#${PATHS.AUTH.VERIFICATION}?type=${VerificationTypes.purchase}`,
      });
      expect(result.allowedRoutes).toEqual([]);
    });

    test("PURCHASE_COMPLETED → finish registration start + allowed route set-password", () => {
      const result = getDirectionByProgress({
        flow: OnboardingFlow.BUILDER,
        step: OnboardingStep.PURCHASE_COMPLETED,
      });

      expect(result.direction).toEqual({
        base: MicroAppsBases.AUTH,
        path: `#${PATHS.AUTH.FINISH_REGISTRATION}?step=start`,
      });

      expect(result.allowedRoutes).toEqual([
        {
          base: MicroAppsBases.AUTH,
          path: `#${PATHS.AUTH.FINISH_REGISTRATION}?step=set-password`,
        },
      ]);
    });
  });

  describe("INDICATOR", () => {
    test("SURVEY_COMPLETED → results preview + allowed routes (survey + builder purchase landing)", () => {
      const result = getDirectionByProgress({
        flow: OnboardingFlow.INDICATOR,
        step: OnboardingStep.SURVEY_COMPLETED,
      });

      expect(result.direction).toEqual({
        base: MicroAppsBases.INDICATOR,
        path: `#${PATHS.INDICATOR.RESULTS_PREVIEW}`,
      });

      expect(result.allowedRoutes).toEqual([
        { base: MicroAppsBases.INDICATOR, path: `#${PATHS.INDICATOR.SURVEY}` },
        { base: MicroAppsBases.BUILDER, path: `#${PATHS.BUILDER.PURCHASE_LANDING}` },
      ]);
    });

    test("PACKAGE_CHOSEN → purchase verification page", () => {
      const result = getDirectionByProgress({
        flow: OnboardingFlow.INDICATOR,
        step: OnboardingStep.PACKAGE_CHOSEN,
      });

      expect(result.direction).toEqual({
        base: MicroAppsBases.AUTH,
        path: `#${PATHS.AUTH.VERIFICATION}?type=${VerificationTypes.purchase}`,
      });
      expect(result.allowedRoutes).toEqual([]);
    });

    test("PURCHASE_COMPLETED → finish registration start + allowed route set-password", () => {
      const result = getDirectionByProgress({
        flow: OnboardingFlow.INDICATOR,
        step: OnboardingStep.PURCHASE_COMPLETED,
      });

      expect(result.direction).toEqual({
        base: MicroAppsBases.AUTH,
        path: `#${PATHS.AUTH.FINISH_REGISTRATION}?step=start`,
      });

      expect(result.allowedRoutes).toEqual([
        {
          base: MicroAppsBases.AUTH,
          path: `#${PATHS.AUTH.FINISH_REGISTRATION}?step=set-password`,
        },
      ]);
    });
  });
});

