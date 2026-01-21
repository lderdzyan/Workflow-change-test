import { Product } from "../models/Product";
import { MsoData } from "./";

export interface ProductsResponse extends MsoData {
  products: Product[];
}
