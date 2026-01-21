import { MsoData } from "./";

export interface CreateOrderResponse extends MsoData {
  orderId: string;
}
