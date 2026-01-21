export enum ProductType {
  Taxamo = "taxamo",
}
export enum ShortName {
  Survey = "survey",
  GuidedDiscussion = "guidedDiscussion",
  WLFBuilder = "wlfBuilder",
}

export interface Product {
  id?: string;
  name?: string;
  description?: string;
  amount?: number;
  productId?: string;
  personId?: string;
  shortName?: ShortName;
  type: ProductType;
  [key: string]: any;

  createdBy?: string;
  updatedBy?: string;

  createdAt?: number;
  createdOn?: string;

  updatedAt?: number;
  updatedOn?: string;
}

