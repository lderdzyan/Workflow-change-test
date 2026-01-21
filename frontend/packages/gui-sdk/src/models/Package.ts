import { Product } from ".";

export interface Package {
  name: string;
  description: string;
  discount?: number;
  personId: string;
  products: Product[];
  id: string;
  updatedAt: number;
  mainPackageId?: string;
}
