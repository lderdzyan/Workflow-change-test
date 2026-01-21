import { INavItem, StateSetter } from "@repo/utilities";
import { NavItems } from "../logo-navigation/NavItems";
import { UserInfoAndActions } from "../userinfo-actions";

import { Grid } from "@mui/material";

export function BurgerMenuBody({ opened, setOpened, navItems }: { opened: boolean; setOpened: StateSetter<boolean>; navItems: INavItem[] }) {
  return (
    <Grid
      container
      flexDirection={"column"}
      sx={{
        backgroundColor: ({ palette }) => palette.color5[100],
        position: "absolute",
        top: "calc(100% + 1px)",
        right: "-12px",
        height: opened ? "calc(100vh - (100% + 9px))" : "0px",
        width: "100vw",
        zIndex: "2000",
        transition: "500ms",
        overflow: "hidden",
      }}
    >
      <Grid
        container
        sx={{
          pt: "8px",
          backgroundColor: (theme) => theme.palette.color5[200],
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
          p: "20px 12px 12px",
          height: "fit-content",
          mt: "-1px",
        }}
      >
        <NavItems navItems={navItems} setOpened={setOpened} />
      </Grid>
      <Grid container sx={{ height: "fit-content", p: "12px 24px" }}>
        <UserInfoAndActions close={() => setOpened(false)} />
      </Grid>
    </Grid>
  );
}

