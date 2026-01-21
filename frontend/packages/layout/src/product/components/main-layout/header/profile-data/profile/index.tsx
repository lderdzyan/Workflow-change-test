import { useState } from "react";
import { isUserGuide } from "@repo/gui-sdk";
import { UserIcon } from "./UserIcon";
import { DropdownSmallArrowFillIcon } from "@repo/assets";
import { DropdownMenu } from "./dropdownMenu";

import { Grid } from "@mui/material";

export function Profile() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  return (
    <Grid
      container
      onClick={handleOpenDropdown}
      sx={{
        alignItems: "center",
        flexWrap: "nowrap",
        transition: "300ms",
        cursor: "pointer",
        "&:hover > :last-child": {
          color: ({ palette }) => palette.color7[600],
        },
        "&:active > :last-child": {
          color: ({ palette }) => palette.color3[900],
        },
        "&:hover > div:first-of-type, &:hover > button:first-of-type": {
          backgroundColor: ({ palette }) => (isUserGuide() ? palette.color7[600] : "transparent"),
          color: ({ palette }) => (isUserGuide() ? palette.color5[200] : palette.color7[600]),
        },
        "&:active > div:first-of-type, &:active > button:first-of-type": {
          borderColor: ({ palette }) => palette.color7[600],
          color: ({ palette }) => (isUserGuide() ? palette.color5[200] : palette.color3[900]),
          backgroundColor: ({ palette }) => (isUserGuide() ? palette.color3[900] : "transparent"),
        },
      }}
    >
      <UserIcon />
      <DropdownSmallArrowFillIcon sx={{ transition: "300ms" }} />
      <DropdownMenu anchorEl={anchorEl} close={handleCloseDropdown} />
    </Grid>
  );
}

