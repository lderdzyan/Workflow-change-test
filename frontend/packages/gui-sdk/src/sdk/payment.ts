import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { Order, Product } from "../models";
import { CreateOrderResponse, EmptyResponse, OrderResponse, ProductResponse, ProductsResponse } from "../dtos";
import { RequestError, doPost, doPut } from "../request";
import APIPaths from "../api-paths";
import { RequestAccess } from "../request_jwt_e";

export const loadProducts = (): TE.TaskEither<RequestError, Product[]> => pipe(
  doPost<ProductsResponse>(APIPaths.Product.List),
  TE.map((response: ProductsResponse) => response.products),
);

export const loadProductById = (id: string): TE.TaskEither<RequestError, Product> => pipe(
  doPost<ProductResponse>(APIPaths.Product.ById, { id }),
  TE.map((response: ProductResponse) => response.product),
);

type CreateOrderOptions = { packageId: string; surveyId: string; answerId: string, promoId?: string };
export const createOrder = (options: CreateOrderOptions): TE.TaskEither<RequestError, string> =>
  pipe(
    doPost<CreateOrderResponse>(APIPaths.Payment.CreateOrder, { o: options }),
    TE.map(response => response.orderId),
  );

export const getOrderById = (orderId: string): TE.TaskEither<RequestError, Order> =>
  pipe(
    doPost<OrderResponse>(APIPaths.Payment.OrderById, { id: orderId }),
    TE.map(response => response.order),
  );

type FreePurchaseOptions = {
  orderId: string;
  pid: string;
};
export const makeFreePurchase = (options: FreePurchaseOptions): TE.TaskEither<RequestError, EmptyResponse> =>
  doPut<EmptyResponse>(APIPaths.Payment.TaxamoWebhook, { ms_order_id: options.orderId, ms_person_id: options.pid }, true, RequestAccess.PUBLIC);
  
export type TaxamoPaymentResult = {
  custom_id: string,
  amount: number;
  custom_fields: { key: string; value: string }[];
  transaction_lines: { description: string; amount: number; product_type: string; quantity: number, product_tax_code: string }[];
  currency_code: string;
  tax_amount: number;
}
export const saveTaxamoResponse = (paymentData: TaxamoPaymentResult): TE.TaskEither<RequestError, EmptyResponse> => 
  doPost<EmptyResponse>(APIPaths.Payment.SaveTaxamoResponse, { t: paymentData });
