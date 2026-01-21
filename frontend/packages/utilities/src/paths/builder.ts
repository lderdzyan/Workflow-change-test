export const BUILDER_PATHS = {
  HOME: "/",
  PURCHASE_INTERMEDIARY: "/purchase-intermediary",
  PURCHASE_LANDING: "/purchase-landing",
  GET_STARTED: "/get-started",
  INTRODUCTION: "/introduction",
  SURVEY: "/survey-progress",
  RESPONSES: "/responses",

  WORKBOOK: {
    BASE: "/workbook",
    OVERVIEW: "/workbook/overview",
    INITIAL_REFLECTIONS: {
      BASE: "/workbook/initial-reflections",
      PATHWAYS: {
        BASE: "/workbook/initial-reflections/pathways",
        UNITY: "/workbook/initial-reflections/pathways/unity",
        SERVICE: "/workbook/initial-reflections/pathways/service",
        POTENTIAL: "/workbook/initial-reflections/pathways/expressing",
        INTEGRITY: "/workbook/initial-reflections/pathways/integrity",
      },
      TENSIONS: {
        BASE: "/workbook/initial-reflections/tensions",
        BEING_DOING: "/workbook/initial-reflections/tensions/being-doing",
        SELF: "/workbook/initial-reflections/tensions/self",
        INSPIRATION: "/workbook/initial-reflections/tensions/inspiration",
      },
      WORKLIFE: {
        BASE: "/workbook/initial-reflections/worklife",
        WELLBEING: "/workbook/initial-reflections/worklife/wellbeing",
      },
    },
    MAP_OF_MEANING: {
      BASE: "/workbook/map-of-meaning",
      AREAS: "/workbook/map-of-meaning/areas",
      DEEPER_EXPLORATION: "/workbook/map-of-meaning/deeper-exploration",
    },
    PATH_FORWARD: {
      BASE: "/workbook/path-forward",
      INTEGRATE_SUSTAIN: "/workbook/path-forward/integrate-sustain",
    },
  },
} as const;

