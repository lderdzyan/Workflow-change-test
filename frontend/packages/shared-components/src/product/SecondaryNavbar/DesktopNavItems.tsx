import { ISecondaryNav } from ".";

import { Grid, Typography } from "@mui/material";

interface IProps {
  secondaryNavItems: ISecondaryNav[];
  currentPath: string | null;
  handleNavItemClick?: (path: string) => void;
}

export default function DesktopNavItems({ secondaryNavItems, currentPath, handleNavItemClick }: IProps) {
  return (
    <Grid container sx={{ gap: 1 }}>
      {secondaryNavItems.map((navItem) => {
        if (navItem.hidden) return null;

        const isActive = !!currentPath?.includes(navItem.path);
        const isDisabled = !!navItem.disabled;

        return (
          <Grid
            key={navItem.title}
            item
            onClick={() => !isDisabled && handleNavItemClick && handleNavItemClick(navItem.path)}
            sx={(theme) => ({
              p: "8px 12px",
              width: "fit-content",
              borderRadius: "8px",
              transition: "300ms",
              cursor: isDisabled ? "default" : "pointer",
              pointerEvents: isDisabled ? "none" : "auto",
              border: "2px solid transparent",
              backgroundColor: isActive && !isDisabled ? theme.palette.color7[400] : "transparent",
              "&:hover": {
                backgroundColor: !isDisabled ? theme.palette.color7[400] : "transparent",
              },
              "&:active": {
                borderColor: theme.palette.color7[700],
              },
            })}
          >
            <Typography
              variant="link3"
              sx={(theme) => ({
                width: "fit-content",
                color: isDisabled ? theme.palette.color3[500] : "inherit",
              })}
            >
              {navItem.title}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}

