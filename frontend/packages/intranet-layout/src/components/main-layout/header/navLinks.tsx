import { useState } from "react";
import { getNavigationList } from "./navList";
import { INavItemProps } from "./burgerMenu";
import { Typography, Grid, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { handleClickNav } from "./burgerMenu";
import { useRouter } from "next/router";

export const NavLinks = () => {
  return (
    <Grid container sx={{ ml: "64px" }}>
      {getNavigationList().map((nav) => {
        if (nav.collapse) {
          return <CollapsableNavItem nav={nav} handleClickNav={handleClickNav} key={nav.title} />;
        }
        return <SingleNavItem nav={nav} handleClickNav={handleClickNav} key={nav.title} />;
      })}
    </Grid>
  );
};

const SingleNavItem = ({ nav, handleClickNav }: INavItemProps) => {
  const router = useRouter();
  const needToHighlight = nav.hightlightedPaths?.includes(router.basePath);
  return (
    <Typography
      key={nav.title}
      onClick={() => handleClickNav(nav.link)}
      sx={{
        color: needToHighlight ? (theme) => theme.palette.secondary[500] : (theme) => theme.palette.greyscale[800],
        textDecoration: needToHighlight ? "underline" : "unset",
        ":hover": {
          color: "#5b4d86",
        },
        mr: "24px",
        cursor: "pointer",
      }}
    >
      {nav.title}
    </Typography>
  );
};

const CollapsableNavItem = ({ nav, handleClickNav }: INavItemProps) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleCloseCollapse = () => setAnchorEl(null);
  const handleOpenCollapse = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Grid key={nav.title}>
      <Grid
        onClick={handleOpenCollapse}
        container
        sx={{
          width: "fit-content",
          mr: "24px",
          cursor: "pointer",
          color: (theme) => theme.palette.greyscale[800],
          ":hover": {
            color: "#5b4d86",
          },
        }}
      >
        <Typography>{nav.title}</Typography>
        <ArrowDropDownIcon />
      </Grid>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseCollapse}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        disableScrollLock={true}
        sx={{
          ".MuiList-root.MuiMenu-list ": {
            padding: "0",
          },
        }}
      >
        {nav.collapse?.map((nav) => {
          const needToHighlight = nav.hightlightedPaths?.includes(router.basePath);
          return (
            <MenuItem
              key={nav.title}
              onClick={() => handleClickNav(nav.link)}
              sx={{
                fontSize: "16px",
                lineHeight: "24px",
                color: needToHighlight ? (theme) => theme.palette.secondary[500] : (theme) => theme.palette.greyscale[800],
                padding: "6px 16px",
                textDecoration: needToHighlight ? "underline" : "unset",
                letterSpacing: "0.17px",
              }}
            >
              {nav.title}
            </MenuItem>
          );
        })}
      </Menu>
    </Grid>
  );
};

