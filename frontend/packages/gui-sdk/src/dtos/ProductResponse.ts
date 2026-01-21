import { Product } from "../models/Product";
import { MsoData } from "./";

export interface ProductResponse extends MsoData {
  product: Product;
}

