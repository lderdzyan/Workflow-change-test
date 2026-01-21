import { isUserGuide } from "@repo/gui-sdk";
import { UserFillIcon } from "@repo/assets";

import { Grid, IconButton, Typography } from "@mui/material";

const elementSize = { width: "29px", height: "29px" };

export function UserIcon() {
  return isUserGuide() ? (
    <Grid
      container
      sx={{
        transition: "300ms",
        alignItems: "center",
        p: "5px 8px 5px 5px",
        backgroundColor: ({ palette }) => palette.color3[900],
        borderRadius: "8px",
        flexWrap: "nowrap",
        gap: "8px",
        color: ({ palette }) => palette.color5[200],
        border: "2px solid transparent",
      }}
    >
      <UserFillIcon />
      <Typography variant="label2">Guide</Typography>
    </Grid>
  ) : (
    <IconButton
      sx={{
        ...elementSize,
        lineHeight: "24px",
        border: "2px solid transparent",
        color: ({ palette }) => palette.color3[900],
        transition: "300ms",
      }}
    >
      <UserFillIcon sx={{ ...elementSize }} />
    </IconButton>
  );
}

