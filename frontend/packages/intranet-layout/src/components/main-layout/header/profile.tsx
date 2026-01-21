import { useState } from "react";
import { getPersonIdentity, getPersonName, logOut, redirectToExternalLink } from "@repo/utilities";
import { getCurrentPerson } from "@repo/gui-sdk";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Grid, Menu, MenuItem, Typography, IconButton, Divider } from "@mui/material";

export default function Profile({ showAccountSettings }: { showAccountSettings?: boolean }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => setAnchorEl(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Grid container sx={{ width: "fit-content" }}>
      <IconButton onClick={handleClick}>
        <AccountCircleIcon />
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        disableScrollLock={true}
        sx={{
          ".MuiList-root.MuiMenu-list ": {
            padding: "20px",
          },
        }}
      >
        <Grid>
          <Typography
            sx={{
              fontSize: "14px",
              lineHeight: "17px",
              color: "#4F4F4F",
              letterSpacing: "0.17px",
            }}
          >
            {getPersonName(getCurrentPerson)}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              lineHeight: "15px",
              color: "#4F4F4F",
              letterSpacing: "0.15px",
            }}
          >
            {getPersonIdentity(getCurrentPerson)}
          </Typography>
          <Divider sx={{ margin: "12px 0" }} />
          {showAccountSettings && (
            <MenuItem
              onClick={() => redirectToExternalLink("/tools/int-profile/")}
              sx={{
                fontSize: "14px",
                lineHeight: "17px",
                color: "#4F4F4F",
                padding: "3px 8px",
                borderRadius: "4px",
                letterSpacing: "0.17px",
                marginBottom: 0,
              }}
            >
              Account Settings
            </MenuItem>
          )}
          <MenuItem
            onClick={logOut}
            sx={{
              fontSize: "14px",
              lineHeight: "17px",
              color: "#4F4F4F",
              padding: "3px 8px",
              borderRadius: "4px",
              letterSpacing: "0.17px",
              marginBottom: 0,
            }}
          >
            Log out
          </MenuItem>
        </Grid>
      </Menu>
    </Grid>
  );
}

