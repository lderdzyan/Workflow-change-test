import { MsoData } from ".";
import { Order } from "../models";

export interface OrderResponse extends MsoData {
  order: Order;
}
