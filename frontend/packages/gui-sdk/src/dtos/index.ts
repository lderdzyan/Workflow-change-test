export * from "../dtos/SignInResponse";
export * from "../dtos/PublishResponse";
export * from "../dtos/IPWhoIsResponse";
export * from "../dtos/SurveyAnswersResponse";
export * from "../dtos/SurveyAnswerResponse";
export * from "../dtos/CreateOrderResponse";
export * from "../dtos/TOTPVerifyResponse";
export * from "../dtos/ProductsResponse";
export * from "../dtos/ProductResponse";
export * from "../dtos/PackagesResponse";
export * from "../dtos/ApplicationResponse";
export * from "../dtos/SurveysResponse";
export * from "../dtos/OrderResponse";
export * from "../dtos/GuidedDiscussionStatusResponse";
export * from "../dtos/GuidedDiscussionsResponse";
export * from "../dtos/GuidedDiscussionActionResponse";
export * from "../dtos/GuidedDiscussionResponse";
export * from "../dtos/SaveGuidedDiscussionInsidesResponse";
export * from "../dtos/PromoCodesResponses";
export * from "../dtos/GuidedDiscussioneScheduleInfoResponse";
export * from "../dtos/MirrorReflectionResponse";

import { createId } from "@paralleldrive/cuid2";
import { getCurrentPerson } from "../";

export interface MsoData {
  rpid?: string;
  mdtl: number;
  hdtl: number;
}
export interface RequestPayload<T extends MsoData> {
  aud: string;
  jti: string;
  exp: number;
  nbf: number;
  iat: number;
  aut: boolean;
  sub: string;
  mso: T;
}
export interface ErrorResponse {
  statusCode: number;
  error: string;
  message: string;
}
export type EmptyResponse = MsoData;
export function wrapPayload<T>(payload: T): RequestPayload<MsoData> {
  const person = getCurrentPerson();
  const now = Date.now();
  return {
    aud: person.pid,
    jti: createId(),
    exp: now + 10 * 60 * 1000,
    nbf: now,
    iat: now,
    aut: false,
    sub: person.pid,
    mso: {
      ...payload,
      mdtl: 1,
      hdtl: 1,
    },
  };
}

