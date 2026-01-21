import { describe, test, expect } from "@jest/globals";

import { calcPackagePrice } from './../../../src/shared/packages/calcPackagePrice';
import { Product, ProductType } from '@repo/gui-sdk';

describe('calcPackagePrice', () => {
  test('should return 0 if products array is empty', () => {
    expect(calcPackagePrice([])).toBe(0);
  });

  test('should sum amounts of all products when no discount', () => {
    const products: Product[] = [
      { amount: 100, type: ProductType.Taxamo },
      { amount: 200, type: ProductType.Taxamo },
      { amount: 50, type: ProductType.Taxamo },
    ];
    expect(calcPackagePrice(products)).toBe(350);
  });

  test('should treat missing amount as 0', () => {
    const products: Product[] = [
      { type: ProductType.Taxamo },
      { amount: 200, type: ProductType.Taxamo },
    ];
    expect(calcPackagePrice(products)).toBe(200);
  });

  test('should apply package discount correctly', () => {
    const products: Product[] = [
      { amount: 100, type: ProductType.Taxamo },
      { amount: 200, type: ProductType.Taxamo },
    ];
    expect(calcPackagePrice(products, 10)).toBe(Math.round(300 - (300 * 0.1)));
  });

  test('should return the same amount if discount is 0', () => {
    const products: Product[] = [
      { amount: 150, type: ProductType.Taxamo },
      { amount: 50, type: ProductType.Taxamo },
    ];
    expect(calcPackagePrice(products, 0)).toBe(200);
  });
});
