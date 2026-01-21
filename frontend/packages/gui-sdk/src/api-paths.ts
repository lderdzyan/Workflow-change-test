const APIPaths = {
  Application: {
    ByPath: "/api/application/byPath",
  },
  Guest: {
    Subscribe: "/api/v2/guest/subscribe",
  },
  GuiError: "/api/publish/page/error",
  PageTracking: "/api/publish/page/tracking",
  EventTracking: "/api/publish/event/dispatch",
  Auth: {
    ResendTOTP: "/api/auth/resendTotp",
    Register: "/api/publish/auth/register",
    Login: "/api/auth-service/login",
    VerifyEmailCountry: "/api/auth/verifyEmailCountry",
    VerifyEmail: "/api/auth-service/verifyEmail",
    VerifyTOTPCode: "/api/auth/verifyCode",
    ForgotPassword: "/api/auth/forgotPassword",
    CheckEmail: "/api/auth-service/checkEmail",
  },
  Survey: {
    List: "/api/survey/get",
    SaveAnswer: "/api/publish/survey/answer",
    LoadAnswers: "/api/v2/survey/answers",
    GetAnswer: "/api/v2/survey/answers/get",
    GetById: "/api/survey/get/byId",
  },
  User: {
    SetPassword: "/api/user/password",
    SaveDemographicData: "/api/user/demographic",
    VerifyEmail: "/api/user/verifyEmail",
    VerifyPassword: "/api/user/verifyPassword",
    Update: "/api/user/update",
    GetUserInfo: "/api/user/info",
  },
  Guide: {
    SaveProfile: "/api/guides/profile",
    LoadAll: "/api/guides/list",
    GetByPid: "/api/guides/get",
    DiscussionSave: "/api/guides/discussion",
    Discussions: "/api/guides/discussion/guide",
    DiscussionSchedule: "/api/guides/discussion/calendlyInfo",
    DiscussionById: "/api/guides/discussion/get",
    DiscussionStatusCheck: "/api/guides/discussion/statusCheck",
    LoadInsides: "/api/guides/discussion/actions/get",
    SaveInsides: "/api/guides/discussion/actions",
    RequestReschedule: "/api/guides/discussion/requestReschedule",
  },
  UploadFile: "/api/file/upload",
  Product: {
    List: "/api/product/list",
    ById: "/api/product/get",
  },
  Payment: {
    CreateOrder: "/api/order/create",
    OrderById: "/api/order/get",
    SaveTaxamoResponse: "/api/taxamo/response/save",
    TaxamoWebhook: "/api/publish/taxamo/webhook",
  },
  Package: {
    List: "/api/package/list",
    AllList: "/api/intranet/package/all",
    Update: "/api/intranet/package/update",
    ById: "/api/package/get",
  },
  PromoService: {
    list: "/api/promo-service/codes",
  },
};

// TODO: Need to change after having own endpoint for this.
export const IPWhoISURL = "https://ipwho.is";

export default APIPaths;

