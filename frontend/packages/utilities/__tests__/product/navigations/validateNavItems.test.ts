import { describe, test, expect, jest, beforeEach } from "@jest/globals";

import { validateNavItems } from "./../../../src/product/navigations/navigation-bar/validateNavItems";
import { INavItem } from "../../../src/product/navigations/entities";
import { MicroAppsBases } from "../../../src/shared/location/microAppsBases";

import { getCurrentPerson } from "@repo/gui-sdk";

jest.mock("@repo/gui-sdk", () => ({
  getCurrentPerson: jest.fn(),
}));

jest.mock("../../../src/product/navigations/navigation-bar/filterByFeatureFlag", () => ({
  filterNavItemsByFeatureFlag: jest.fn((items) => items),
}));

jest.mock("../../../src/product/navigations/navigation-bar/filterByUserType", () => ({
  filterNavItemsByUserType: jest.fn((userTypes, items) => items),
}));

jest.mock("../../../src/product/navigations/navigation-bar/filterByAppList", () => ({
  filterNavItemsByAppList: jest.fn((appList, items) => items),
}));

describe("validateNavItems", () => {
  const navItems: INavItem[] = [
    { path: "/home", highlightedPath: "/home" } as INavItem,
    { path: MicroAppsBases.DASHBOARD } as INavItem,
    { path: MicroAppsBases.ACCOUNT_SETTINGS } as INavItem,
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return [] if no user is present", () => {
    (getCurrentPerson as jest.Mock).mockReturnValue({ user: { _tag: "None" } });
    const result = validateNavItems(navItems);
    expect(result).toEqual([]);
  });

  test("should return filtered items with home item included and sorted", () => {
    (getCurrentPerson as jest.Mock).mockReturnValue({
      user: { _tag: "Some", value: { userTypes: ["admin"], appList: ["dashboard"] } },
    });

    const result = validateNavItems(navItems);
    expect(result.map((i) => i.path)).toEqual([
      "/home",
      MicroAppsBases.DASHBOARD,
      MicroAppsBases.ACCOUNT_SETTINGS,
    ]);
  });

  test("should not duplicate homeNavItem if already present", () => {
    (getCurrentPerson as jest.Mock).mockReturnValue({
      user: { _tag: "Some", value: { userTypes: ["user"], appList: ["settings"] } },
    });
  
    const result = validateNavItems([
      { path: "/home", highlightedPath: "/home" } as INavItem,
    ]);
  
    const homeItems = result.filter((i) => i.path === "/home");
    expect(homeItems.length).toBe(1);
  });
});
