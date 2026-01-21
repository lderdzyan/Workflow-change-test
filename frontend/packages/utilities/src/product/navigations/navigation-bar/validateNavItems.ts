import { getCurrentPerson } from "@repo/gui-sdk";
import { Effect, pipe } from "effect";
import { isSome, Option } from "fp-ts/lib/Option";
import { INavItem } from "../entities";
import { filterNavItemsByFeatureFlag } from "./filterByFeatureFlag";
import { filterNavItemsByUserType } from "./filterByUserType";
import { filterNavItemsByAppList } from "./filterByAppList";

export const validateNavItems = (navItems: INavItem[]): INavItem[] => {
  const person = getCurrentPerson();
  const user = person.user;
  if (!isSome(user)) return [];

  const homeNavItem = findHomeNavItem(navItems);

  return Effect.runSync(
    pipe(
      Effect.succeed(navItems),
      Effect.map(filterNavItemsByFeatureFlag),
      Effect.map((items) => filterNavItemsByUserType(user.value.userTypes, items)),
      Effect.map((items) => filterNavItemsByAppList(user.value.appList, items)),
      Effect.map((items) => insertHomeNavItem(items, homeNavItem)),
      Effect.map((items) => sortItemsByInitialOrder(navItems, items)),
    ),
  );
};

 const findHomeNavItem = (navItems: INavItem[]): INavItem | undefined => navItems.find((item) => item.highlightedPath);

 const containsItemWithSameName = (navItems: INavItem[], searchItem: INavItem): boolean => navItems.some((arrItem) => arrItem.path === searchItem.path);

 const insertHomeNavItem = (filteredItems: INavItem[], homeNavItem: INavItem | undefined): INavItem[] => {
  if (homeNavItem && !containsItemWithSameName(filteredItems, homeNavItem)) {
    return [...filteredItems, homeNavItem];
  }
  return filteredItems;
};

 const sortItemsByInitialOrder = (initialItems: INavItem[], filteredItems: INavItem[]): INavItem[] => {
  const order = initialItems.map((i) => i.path);
  return [...filteredItems].sort((a, b) => order.indexOf(a.path) - order.indexOf(b.path));
};
