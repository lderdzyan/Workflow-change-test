export enum IFrameEventActions {
  back = "redirectBack",
}

export enum IFrameEventStatuses {
  success = "success",
  fail = "fail",
}

export enum IFrameEventTypes {
  taxamoPayment = "taxamoPayment",
  accountSettings = "accountSettings",
  reportVideo = "reportVideo",
  calendlySheduling = "calendlySheduling",
  countryOfResidence = "countryOfResidence",
  chooseFocusAreas = "chooseFocusAreas",
  selectNewDateTime = "selectNewDateTime",
  notifyMFA = "notifyMFA",
  discounts = "discounts",
}

export enum IFrameEventNames {
  OPEN_GLOBAL_MODAL = "open_global_modal",
  GLOBAL_MODAL_LOADED = "global_modal_loaded",
  CLOSE_GLOBAL_MODAL = "global_modal_close",
}

export enum ITaxamoIFrameEventNames {
  TAXAMO_PAYMENT_FINISHED = "taxamo_payment_finished",
  DISCUSSION_PAYMENT_SUCCEED = "discussion_payment_succeed",
  DISCOUNTS_PAYMENT_SUCCEED = "discounts_payment_succeed",
}

export enum ICalendlyIFrameEventNames {
  CALENDLY_ACTION_FINISHED = "calendly_Action_finished",
  CALENDLY_ACTION_PENDING = "calendly_action_pending",
}

export enum IFocusAreasIFrameEventNames {
  FOCUS_AREAS_CHOOSE_FINISHED = "focus_areas_choose_finished",
}

