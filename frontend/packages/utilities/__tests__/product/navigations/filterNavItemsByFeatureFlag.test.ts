import { describe, test, expect, jest, beforeEach } from "@jest/globals";

import { filterNavItemsByFeatureFlag } from "../../../src/product/navigations/navigation-bar/filterByFeatureFlag";
import { MicroAppsBases } from "../../../src/shared/location/microAppsBases";
import { INavItem } from "../../../src/product/navigations/entities";
import { getFeatureFlagPairs } from "../../../src/product/navigations/featureFlagPairs";

jest.mock("../../../src/product/navigations/featureFlagPairs", () => ({
  getFeatureFlagPairs: jest.fn(),
}));

describe("filterNavItemsByFeatureFlag", () => {
  const navItems: INavItem[] = [
    { title: "MWI", path: MicroAppsBases.MWI, externalLink: false },
    { title: "Mirrors", path: MicroAppsBases.MIRROR_REFLECTIONS, externalLink: false },
    { title: "Worklife", path: MicroAppsBases.INDICATOR, externalLink: false },
    { title: "Guides", path: MicroAppsBases.GUIDES, externalLink: false },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns all items when all feature flags enabled", () => {
    (getFeatureFlagPairs as jest.Mock).mockReturnValue([
      [true, MicroAppsBases.MIRROR_REFLECTIONS],
      [true, MicroAppsBases.BUILDER],
      [true, MicroAppsBases.INDICATOR],
    ]);

    const result = filterNavItemsByFeatureFlag(navItems);
    expect(result).toHaveLength(navItems.length);
  });

  test("filters out disabled feature flag items", () => {
    (getFeatureFlagPairs as jest.Mock).mockReturnValue([
      [false, MicroAppsBases.MIRROR_REFLECTIONS],
      [true, MicroAppsBases.INDICATOR],
    ]);

    const result = filterNavItemsByFeatureFlag(navItems);
    expect(result).toEqual(expect.not.arrayContaining([expect.objectContaining({ path: MicroAppsBases.MIRROR_REFLECTIONS })]));
  });

  test("removes multiple disabled items", () => {
    (getFeatureFlagPairs as jest.Mock).mockReturnValue([
      [false, MicroAppsBases.MIRROR_REFLECTIONS],
      [false, MicroAppsBases.INDICATOR],
    ]);

    const result = filterNavItemsByFeatureFlag(navItems);
    expect(result).toEqual([
      { title: "MWI", path: MicroAppsBases.MWI, externalLink: false },
      { title: "Guides", path: MicroAppsBases.GUIDES, externalLink: false },
    ]);
  });

  test("returns unmodified list when no flags are disabled", () => {
    (getFeatureFlagPairs as jest.Mock).mockReturnValue([]);

    const result = filterNavItemsByFeatureFlag(navItems);
    expect(result).toEqual(navItems);
  });
});

