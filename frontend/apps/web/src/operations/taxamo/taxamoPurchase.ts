import * as O from "fp-ts/Option";
import { Order, Product, TaxamoPaymentResult, getCurrentPerson, saveTaxamoResponse } from "@repo/gui-sdk";
import { Dispatch, SetStateAction } from "react";

import { createId } from "@paralleldrive/cuid2";
import { genUserName, IFrameEventStatuses, triggerEcommerce } from "@repo/utilities";
interface ITaxamoWindow extends Window {
  Taxamo: {
    options: {
      checkoutSrc: string;
    };
    initialize: Function;
    defaultTransaction: {
      billing_country_code: string;
    };
    Checkout: any;
    subscribe: Function;
  };
}

declare var window: ITaxamoWindow;
export interface ITaxamoResponseData {
  message_type: string;
  payment_result: TaxamoPaymentResult;
  success: boolean;
}

export interface ITransactionFields {
  buyer_name: string;
  buyer_email: string;
}

export function doTaxamoPurchase(orderId: string, order: Order, setLoaded: Dispatch<SetStateAction<boolean>>): Promise<IFrameEventStatuses> | undefined {
  if (window["Taxamo"]) {
    const Taxamo = window["Taxamo"];

    const person = getCurrentPerson();
    const user = person.user;

    const { identity = "", firstName = "", lastName = "" } = O.isSome(user) ? user.value : {};

    Taxamo.options.checkoutSrc = "https://p.taxamo.com";

    Taxamo.subscribe("taxamo.checkout.complete", function () {
      setLoaded(true);
    });

    Taxamo.initialize(window.TAXAMO_PUBLIC_KEY || process.env.NEXT_PUBLIC_PUBLIC_API_KEY);

    function calculateDiscountAmount(percentage: number, total: number) {
      return Math.round(total - (total / 100) * percentage);
    }

    const transactionLines = order.package.products.map((item: Product) => {
      return {
        product_tax_code: item.productTaxCode,
        product_type: item.productType,
        amount: order.package.discount ? calculateDiscountAmount(order.package.discount, item.amount as number) : item.amount,
        custom_id: createId(),
        description: item.name,
      };
    });

    const transaction = {
      transaction_lines: transactionLines,
      buyer_name: genUserName(firstName, lastName) || "",
      buyer_email: identity || "",
      customer_id: person.pid,
      currency_code: "USD",
      billing_country_code: Taxamo.defaultTransaction.billing_country_code,
      custom_id: orderId,
      custom_fields: [
        { key: "orderId", value: orderId },
        {
          key: "identity",
          value: identity,
        },
      ],
    };

    const metadata = {
      finished_message: `Thank you. Your payment was successful`,
      show_summary: true,
      show_buyer_name: true,
      require_buyer_name: true,
      show_certificate_provider_logo: true,
      show_payment_provider_logo: true,
    };

    const checkout = new Taxamo.Checkout(transaction, metadata);

    return new Promise((resolve) => {
      checkout.overlay(async function (data: ITaxamoResponseData) {
        if (data.message_type !== "window_closed") {
          if (data.success) {
            const paymentData = data.payment_result;
            triggerEcommerce({
              transaction_id: paymentData.custom_id,
              value: paymentData.amount,
              tax: paymentData.tax_amount,
              shipping: 0,
              currency: paymentData.currency_code,
              coupon: "",
              items: paymentData.transaction_lines.map((product) => ({
                item_id: product.product_tax_code,
                item_name: product.description,
                price: product.amount,
                quantity: product.quantity,
              })),
            });
            if (window.MS_SAVE_TAXAMO_RESPONSE) {
              await saveTaxamoResponse(data.payment_result)();
            }
            document.querySelectorAll("iframe").forEach(function (elem) {
              elem.id.includes("Taxamo") && elem.parentNode!.removeChild(elem);
            });
            resolve(IFrameEventStatuses.success);
          }
          resolve(IFrameEventStatuses.fail);
        }
        resolve(IFrameEventStatuses.fail);
      });
    });
  }
}

