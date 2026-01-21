const APIPathsV2 = {
  Guide: {
    DiscussionSchedule: "/api/v2/guides/discussion/calendlyInfo",
    SaveFocusAreas: "/api/v2/guides/discussion/update",
    LoadAvailable: "/api/v2/guides/available",
    GetDiscussionsInfo: "/api/v2/guides/discussion/info",
  },
  MirrorReflection: {
    AddEditFeelingWordTopic: "/api/mirror-reflection/feeling-words",
    GetFeelingWordTopic: "/api/mirror-reflection/feeling-words/list",
    CreateMirrorReflection: "/api/mirror-reflection/reflection",
    GetCelebrationImage: "/api/mirror-reflection/background-image",
    GetReflectionById: "/api/mirror-reflection/reflection",
    GetReflections: "/api/mirror-reflection/reflection/list",
    DeleteRefletionById: "/api/mirror-reflection/reflection",
  },
  Indicator: {
    CompleteSurvey: "/api/indicator/answer/complete",
    GetAnswer: "/api/indicator/answer/get",
    SaveTraningPlan: "/api/indicator/training-plan",
  },
  Builder: {
    GetBuilderAnswer: "/api/builder/answer/get",
    UpdateBuilderStep: "/api/builder/answer/step",
    SaveWorkbook: "/api/builder/workbook",
  },
  Survey: {
    SaveAnswer: "/api/publish/answer/wf",
  },
};

export default APIPathsV2;



