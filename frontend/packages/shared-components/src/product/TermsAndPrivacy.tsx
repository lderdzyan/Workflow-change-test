import { Link } from "react-router-dom";

import { Grid, Typography } from "@mui/material";

export function TermsAndPrivacy() {
  return (
    <Grid
      container
      sx={{
        width: "220px",
        flexDirection: "column",
        justifyContent: "center",
        gap: "4px",
      }}
    >
      <Typography variant="singleLine4" sx={{ textAlign: "center" }}>
        By using MeaningSphere you agree to the
      </Typography>
      <Grid container sx={{ gap: "4px", justifyContent: "center" }}>
        <Link to="https://support.meaningsphere.com/hc/en-us/articles/9485738538388-What-are-your-Terms-of-Use-" target="_blank">
          <Typography variant="link4">Terms of Service</Typography>
        </Link>
        <Typography variant="singleLine4">and</Typography>
        <Link to="https://support.meaningsphere.com/hc/en-us/articles/8446382859028-What-is-your-Privacy-Policy-" target="_blank">
          <Typography variant="link4">Privacy Policy.</Typography>
        </Link>
      </Grid>
    </Grid>
  );
}
