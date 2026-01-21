import { ISecondaryNavbar, SecondaryNavbarTypes } from ".";
import { BORDER_RADIUS } from "../borderRadius";
import BackButtonAndTitle from "./BackButtonAndTitle";
import DesktopNavItems from "./DesktopNavItems";

import { Grid } from "@mui/material";

export function DesktopNavbar({ title, secondaryNavItems, currentPath, handleNavItemClick, backText, backPath, statusAndDate, navbarElId, type }: ISecondaryNavbar) {
  return (
    <Grid container sx={{ p: "16px 24px 0" }}>
      <Grid
        container
        id={navbarElId}
        sx={{
          borderRadius: BORDER_RADIUS.medium,
          backgroundColor: (_theme) => _theme.palette.color5[100],
          p: "16px 32px",
        }}
      >
        <Grid container flexDirection="column" gap="12px">
          <BackButtonAndTitle backText={backText} backPath={backPath} title={title} statusAndDate={statusAndDate} />
          {type === SecondaryNavbarTypes.WITH_NAV_ITEMS && <DesktopNavItems secondaryNavItems={secondaryNavItems} currentPath={currentPath} handleNavItemClick={handleNavItemClick} />}
        </Grid>
      </Grid>
    </Grid>
  );
}

