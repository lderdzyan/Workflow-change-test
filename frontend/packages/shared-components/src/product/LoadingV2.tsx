import { Grid } from "@mui/material";

export function LoadingV2() {
  return <Grid className="bouncingDotsLoader" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />;
}
