import { PromoCode } from "../models";
import { MsoData } from ".";

export interface VerifyPromoCodeResponse extends MsoData {
  promoCode: PromoCode;
}

export interface LoadPromoCodesResponse extends MsoData {
  promoCodes: PromoCode[];
  timezone: string;
}

