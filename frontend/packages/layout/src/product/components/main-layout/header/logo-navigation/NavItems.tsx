import { useLocation, useNavigate } from "react-router-dom";
import { INavItem, isConceptApp, redirectToExternalLink, StateSetter } from "@repo/utilities";
import { useDownTablet } from "@repo/shared-components/product";

import { Grid, Typography } from "@mui/material";

interface INavItemsProps {
  navItems: INavItem[];
  setOpened?: StateSetter<boolean>;
  currentPath?: string;
}

export function NavItems({ navItems, setOpened, currentPath }: INavItemsProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const downTablet = useDownTablet();

  const handleClickNavItem = (route: INavItem) => {
    setOpened && setOpened(false);
    if (route.externalLink) redirectToExternalLink(route.path);
    else if (!isConceptApp(window.MS_APP_PATH)) navigate(route.path);
  };

  return (
    <Grid container sx={{ gap: "12px", flexDirection: downTablet ? "column" : "row", width: "fit-content", height: "fit-content" }}>
      {navItems.map((navItem: INavItem, index) => (
        <Typography
          key={index}
          variant="link2"
          onClick={() => handleClickNavItem(navItem)}
          sx={{
            width: "fit-content",
            cursor: "pointer",
            transition: "300ms",
            padding: "8px 12px",
            border: "2px solid transparent",
            borderRadius: "8px",
            backgroundColor: isActiveNav(currentPath ?? pathname, navItem) ? ({ palette }) => palette.color7[400] : "transparent",
            "&:hover": {
              backgroundColor: ({ palette }) => palette.color7[400],
            },
            "&:active": {
              borderColor: ({ palette }) => palette.color7[700],
            },
          }}
        >
          {navItem.title}
        </Typography>
      ))}
    </Grid>
  );
}

const isActiveNav = (currentPath: string, navItem: INavItem): boolean => {
  if (currentPath === navItem.path) return true;
  else if (navItem.highlightedPath && window.location.pathname.includes(navItem.highlightedPath)) return true;
  return false;
};

