import { Grid } from "@mui/material";
import { isUserDebugger } from "@repo/gui-sdk";
import Debug from "./Debug";
import { SupportLink } from "./SupportLink";
import { Profile } from "./profile";

export function ProfileData() {
  return (
    <Grid container gap={"12px"} sx={{ width: "fit-content", alignItems: "center", flexWrap: "nowrap" }}>
      {isUserDebugger() && <Debug />}
      <SupportLink />
      <Profile />
    </Grid>
  );
}

