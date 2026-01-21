import { Grid, CircularProgress } from "@mui/material";

export function LoadingComponent({ loading }: { loading: boolean }) {
  return loading ? (
    <Grid
      container
      sx={{ width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center", position: "fixed", top: "0", left: "0", zIndex: 999, backgroundColor: "rgba( 255, 255, 255, 0.8 )" }}
    >
      <CircularProgress />
    </Grid>
  ) : null;
}

