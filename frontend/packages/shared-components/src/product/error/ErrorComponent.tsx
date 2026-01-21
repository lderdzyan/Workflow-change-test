import { BORDER_RADIUS } from "../borderRadius";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Grid, Typography } from "@mui/material";

export function ErrorComponent({ errors }: { errors: string[] }) {
  return errors.length ? (
    <Grid
      container
      sx={{
        mt: "12px",
        width: "100%",
        border: (theme) => `2px solid ${theme.palette.color4[600]}`,
        p: "16px",
        borderRadius: BORDER_RADIUS.medium,
        flexWrap: "nowrap",
        textAlign: "left",
      }}
    >
      <Grid sx={{ height: "24px", mr: "12px" }}>
        <ErrorOutlineOutlinedIcon sx={{ color: (theme) => theme.palette.color4[600] }} />
      </Grid>
      <Grid container flexDirection={"column"} sx={{ justifyContent: "center" }}>
        {errors.map((errorMessage) => {
          return (
            <Typography variant="multiLine3" sx={{ ml: "12px" }} key={errorMessage}>
              {errorMessage}
            </Typography>
          );
        })}
      </Grid>
    </Grid>
  ) : null;
}

