import { Product } from "@repo/gui-sdk";

export const calcPackagePrice = (products: Product[], packageDiscount: number = 0) => {
  const amount = products.reduce((acc, product) => acc + (product.amount || 0), 0);
  if (packageDiscount) {
    return Math.round(amount - (amount / 100) * packageDiscount);
  }
  return amount;
};

