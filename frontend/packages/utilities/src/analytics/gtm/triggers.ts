import { getCurrentPerson } from "@repo/gui-sdk";
import { getPageType } from "../helpers";
export enum GTMEvents {
  page = "PageView",
  ecommerce = "purchase",
  click = "customClick",
}

type TriggerPageView = () => void;
export const triggerPageView: TriggerPageView = () => {
  triggerGTMEvent({ event: GTMEvents.page });
};

type EcommerceDataItem = {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
};

type EcommerceData = {
  transaction_id: string;
  value: number;
  tax: number;
  shipping: number;
  currency: string;
  coupon: string;
  items: EcommerceDataItem[];
};
type TriggerEcommerce = (data: EcommerceData) => void;
export const triggerEcommerce: TriggerEcommerce = (data) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  triggerGTMEvent({
    event: GTMEvents.ecommerce,
    ecommerce: {
      ...data,
    },
  });
};

type TriggerClick = <T>(data: T) => void;
export const triggerClick: TriggerClick = (data) => {
  triggerGTMEvent({ event: GTMEvents.click, ...data });
};

type triggerGTMEvent = <T>(data: T) => void;
export const triggerGTMEvent: triggerGTMEvent = (data) => {
  const { href, pathname } = window.location;
  const isLoggedIn = getCurrentPerson().authLevel >= 2;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    pagePath: href,
    pageType: getPageType(pathname),
    loginStatus: isLoggedIn ? "1" : "0",
    ...data,
  });
};

