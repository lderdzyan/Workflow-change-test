import { Link } from "react-router-dom";

import { Grid, Typography } from "@mui/material";

export function ContactSupport({ align }: { align?: "left" | "center" }) {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        flexDirection: "row",
        justifyContent: align,
      }}
    >
      <Typography
        variant="singleLine4"
        sx={{
          mr: "4px",
        }}
      >
        If you need help,
      </Typography>
      <Link to="https://support.meaningsphere.com/hc/en-us" target="_blank">
        <Typography
          variant="link4"
          sx={{
            color: (theme) => theme.palette.color1[500],
          }}
        >
          contact support.
        </Typography>
      </Link>
    </Grid>
  );
}
