import { INavItem } from "../entities";
import { getFeatureFlagPairs } from "../featureFlagPairs";

export const filterNavItemsByFeatureFlag = (navItems: INavItem[]): INavItem[] => {
  const blockedBases = getFeatureFlagPairs()
    .filter(([enabled]) => !enabled)
    .map(([, base]) => base);

  if (!blockedBases.length) return navItems;

  return navItems.filter(({ path }) => !blockedBases.some((base) => path.includes(base)));
};
