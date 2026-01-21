import BackButtonAndTitle from "./BackButtonAndTitle";
import { ISecondaryNavbar, SecondaryNavbarTypes } from ".";

import { Grid, Typography } from "@mui/material";

export default function MobileNavbar({ title, secondaryNavItems, currentPath, handleNavItemClick, backText, backPath, statusAndDate, navbarElId, type }: ISecondaryNavbar) {
  const getBorderRadius = (index: number, total: number) => {
    if (total === 1) return "0 0 12px 12px";
    if (index === 0) return "0 0 0 12px";
    if (index === total - 1) return "0  0 12px 0";
    return 0;
  };

  const notHiddenItems = secondaryNavItems.filter((item) => !item.hidden);

  const showNavItems = type === SecondaryNavbarTypes.WITH_NAV_ITEMS;

  return (
    <Grid id={navbarElId} container flexDirection="column">
      <Grid container flexDirection="column" p="8px 20px" sx={{ backgroundColor: (theme) => theme.palette.color5[100], borderRadius: showNavItems ? "0" : "0 0 12px 12px" }}>
        <BackButtonAndTitle backText={backText} backPath={backPath} title={title} statusAndDate={statusAndDate} />
      </Grid>

      {showNavItems && (
        <Grid container justifyContent="space-between" flexWrap="nowrap">
          {notHiddenItems.map((navItem, index) => {
            const isActive = Boolean(currentPath?.includes(navItem.path));
            const isDisabled = Boolean(navItem.disabled);
            const borderRadius = getBorderRadius(index, notHiddenItems.length);

            return (
              <Grid
                container
                item
                alignItems={"center"}
                justifyContent={"center"}
                key={navItem.title}
                xs={notHiddenItems.length === 1 ? 12 : 6}
                onClick={() => !isDisabled && handleNavItemClick && handleNavItemClick(navItem.path)}
                sx={(theme) => ({
                  p: "12px 8px",
                  transition: "300ms",
                  cursor: isDisabled ? "default" : "pointer",
                  pointerEvents: isDisabled ? "none" : "auto",
                  border: "2px solid transparent",
                  backgroundColor: isActive && !isDisabled ? theme.palette.color7[400] : theme.palette.color5[50],
                  "&:active": {
                    borderColor: theme.palette.color7[700],
                  },
                  borderRadius,
                })}
              >
                <Typography
                  variant="link4"
                  sx={(theme) => ({
                    textAlign: "center",
                    color: isDisabled ? theme.palette.color3[500] : "inherit",
                  })}
                >
                  {navItem.title}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Grid>
  );
}

