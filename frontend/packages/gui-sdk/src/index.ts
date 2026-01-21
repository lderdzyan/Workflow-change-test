export * from "./models";

export { init } from "./init";

export { subscribeGuest } from "./sdk/guest";
export {
  setCurrentPerson,
  getCurrentPerson,
  setPassword,
  saveDemographicData,
  isUserAdmin,
  isUserGuide,
  verifyNewEmail,
  updateUserSettings,
  verifyPassword,
  getAndSetUserData,
  type DemographicDataOptions,
  updateUserOnboardingStep,
  getSourcePathFromChache,
} from "./sdk/user";
export { signIn, register, resendTOTP, forgotPassword, checkEmail, checkUserIsRegistered, setPasswordAndFetchUserInfo, personHasNeededCredentials } from "./sdk/auth";
export { signOut, setSignOutAction, resetPerson } from "./sdk/sign-out";
export { verifyEmailCountry, verifyEmail, verifyTOTPCode } from "./sdk/verify";
export { getPackages, loadAllPackages, updatePackage, getPackageById, storeChosenPackageIdInCache, removeChosenPackageIdFromCache, getChosenPackageIdFromCache } from "./sdk/package";
export { getApplicationByPath } from "./sdk/application";
export {
  startSurvey,
  setAnswer,
  finishSurvey,
  getSurveyAnswer,
  getLastSurveyAnswerId,
  loadSurveyAnswers,
  loadSurveyAnswer,
  loadSurveys,
  loadSurveysByApplicationId,
  getSurveyById,
  getSurveyAnswers,
} from "./sdk/survey";

export { saveGuideProfile, getGuideProfileByPid, loadAllGuides, getCurrentGuideProfile } from "./sdk/guide";
export {
  saveOrCreateDiscussion,
  getGuidedDiscussionById,
  getDiscussionsStatus,
  loadGuidedDiscussions,
  loadGuidedDiscussionInsides,
  saveGuidedDiscussionInsides,
  requestReschedule,
} from "./sdk/discussion";
export { uploadFile, FileType } from "./sdk/upload";

export { reportGuiError, reportRequestError } from "./sdk/publish/gui-error";
export { trackPage } from "./sdk/publish/page-tracking";
export {
  dispatchEvent,
  EventType,
  BrandAndCommsEventType,
  GuidedDiscussionEvents,
  MirrorReflectionEvents,
  MirrorReflectionAnswerActions,
  IndicatorEvents as IndicatorEvents,
} from "./sdk/publish/event-dispatch";

export { ServerError, type RequestError, NetworkError, ParserError, BackendError } from "./request-error";
export { loadAllCountries, loadSupportedCountries, loadNotAllowedCountries } from "./sdk/country";
export { loadLanguages } from "./sdk/language";

export { createOrder, loadProducts, loadProductById, getOrderById, saveTaxamoResponse, type TaxamoPaymentResult, makeFreePurchase } from "./sdk/payment";

export { isDebugActive, updateDebugValueInCache, isUserDebugger } from "./sdk/debug";

export { setDiscussionScheduleInfoV2, saveFocusAreas, getDiscussionsInfo } from "./sdk/v2/discussion";
export { loadAvailableGuides } from "./sdk/v2/guide";
export { type GuideCardData } from "./sdk/v2/models/GuideCardData";
export { SurveyType } from "./sdk/v2/models/index";

export { loadPromoCodes, createPromoCode, verifyPromoCode, getPromoCodeById, updatePromoCode, deletePromoCode } from "./sdk/promo-code";

export {
  addTopicsFeelingWords,
  getTopicsFeelingWords,
  createMirrorReflection,
  getCelebrationImageIndex,
  getMirrorReflectionById,
  getMirrorReflections,
  deleteMirrorReflectionById,
} from "./sdk/v2/mirror-reflection";

export { saveIndicatorSurveyAnswer, completeSurveyIfReady, getAnswer, saveTraningPlan, type SavingData } from "./sdk/v2/indicator";
export { type IIndicator as IIndicator, type TraningPlan, TraningPlanSteps, IndicatorSurveyCompleteStates as WLFISurveyCompleteStates } from "./sdk/v2/models/Indicator";

export { saveBuilderSurveyAnswer, getBuilderAnswer, updateWorkbook, updateBuilderStep, getVimeoVideoData } from "./sdk/v2/builder";
export { BuilderWorkbookSteps, BuilderInitialSteps, type Builder, type WorkbookData, type VimeoVideoData } from "./sdk/v2/models/Builder";

