import { DesktopNavbar } from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { useDownTablet } from "../breakpoints";

export interface ISecondaryNav {
  title: string;
  path: string;
  disabled?: boolean;
  hidden?: boolean;
}

export enum SecondaryNavbarTypes {
  WITH_NAV_ITEMS = "withNavItems",
  WITHOUT_NAV_ITEMS = "withoutNavItems",
}

export interface ISecondaryNavbar {
  title: string;
  type?: SecondaryNavbarTypes;
  secondaryNavItems: ISecondaryNav[];
  currentPath: string | null;
  handleNavItemClick?: (path: string) => void;
  backText?: string;
  backPath?: string;
  statusAndDate?: string;
  navbarElId?: string;
}

export function SecondaryNavbar({
  title,
  type = SecondaryNavbarTypes.WITH_NAV_ITEMS,
  secondaryNavItems,
  currentPath,
  handleNavItemClick,
  backText,
  backPath,
  statusAndDate,
  navbarElId,
}: ISecondaryNavbar) {
  const down768 = useDownTablet();

  return down768 ? (
    <MobileNavbar
      title={title}
      secondaryNavItems={secondaryNavItems}
      currentPath={currentPath}
      handleNavItemClick={handleNavItemClick}
      backText={backText}
      backPath={backPath}
      statusAndDate={statusAndDate}
      navbarElId={navbarElId}
      type={type}
    />
  ) : (
    <DesktopNavbar
      title={title}
      secondaryNavItems={secondaryNavItems}
      currentPath={currentPath}
      handleNavItemClick={handleNavItemClick}
      backText={backText}
      backPath={backPath}
      statusAndDate={statusAndDate}
      navbarElId={navbarElId}
      type={type}
    />
  );
}

