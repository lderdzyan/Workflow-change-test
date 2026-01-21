import * as TE from "fp-ts/TaskEither";
import * as O from "fp-ts/Option";
import { RequestError } from "../request-error";
import { doPost } from "../request_jwt";
import { PromoCode } from "../models/PromoCode";
import { LoadPromoCodesResponse, VerifyPromoCodeResponse } from "../dtos";

export const loadPromoCodes = ({ startDate, endDate }: { startDate?: string; endDate?: string }): TE.TaskEither<RequestError, O.Option<LoadPromoCodesResponse>> =>
  doPost<LoadPromoCodesResponse>("/api/promo-service/codes/list", { startDate, endDate });

export const createPromoCode = (promoCode: PromoCode): TE.TaskEither<RequestError, O.Option<any>> => doPost<any>("/api/promo-service/codes", promoCode);

export const verifyPromoCode = (code: string): TE.TaskEither<RequestError, O.Option<VerifyPromoCodeResponse>> => doPost<VerifyPromoCodeResponse>(`/api/promo-service/codes/${code}/verify`);

export const getPromoCodeById = (id: string): TE.TaskEither<RequestError, O.Option<PromoCode>> => doPost<PromoCode>(`/api/promo-service/codes/${id}/get`);

export const updatePromoCode = (id: string, promoCode: PromoCode): TE.TaskEither<RequestError, any> => doPost<any>(`/api/promo-service/codes/${id}`, promoCode);

export const deletePromoCode = (id: string): TE.TaskEither<RequestError, O.Option<any>> => doPost<any>(`/api/promo-service/codes/${id}/delete`);

