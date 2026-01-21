import { useState, useEffect } from "react";
import BurgerMenu from "./burgerMenu";
import { Logo } from "./logo";
import Profile from "./profile";
import { NavLinks } from "./navLinks";
import { Box, AppBar, useMediaQuery, Grid } from "@mui/material";

export function Header({ showAccountSettings }: { showAccountSettings?: boolean }) {
  const down768 = useMediaQuery("(max-width:768px)");
  const [isOpened, setOpened] = useState<boolean>(false);
  useEffect(() => {
    const wholeHtml = document.querySelector("html");
    wholeHtml ? (wholeHtml.style.overflowY = isOpened ? "hidden" : "") : null;
  }, [isOpened]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          padding: down768 ? "20px" : "20px 48px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0px 3px 16px 0px rgba(28, 37, 46, 0.16)",
          position: 'relative',
          zIndex: '3'
        }}
      >
        <Grid container sx={{ width: "fit-content", flexWrap: "nowrap", alignItems: "center" }}>
          <Logo />
          {down768 ? null : <NavLinks />}
        </Grid>
        <Grid container sx={{ width: "fit-content", flexWrap: "nowrap", alignItems: "center" }}>
          {down768 ? <BurgerMenu isOpened={isOpened} setOpened={setOpened} showAccountSettings={showAccountSettings}/> : <Profile showAccountSettings={showAccountSettings} />}
        </Grid>
      </AppBar>
    </Box>
  );
}

