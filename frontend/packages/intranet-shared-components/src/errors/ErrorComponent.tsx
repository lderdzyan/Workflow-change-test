import { Grid, Typography } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export function ErrorComponent({ errors }: { errors: string[] }) {
  return errors.length ? (
    <Grid
      container
      sx={{
        width: "100%",
        border: (theme) => `1px solid ${theme.palette.error.main}`,
        p: "13px 16px",
        borderRadius: "8px",
        flexWrap: "nowrap",
      }}
    >
      <Grid sx={{ height: "24px", mr: "12px" }}>
        <ErrorOutlineOutlinedIcon sx={{ color: (theme) => theme.palette.error.main }} />
      </Grid>
      <Grid container flexDirection={"column"} sx={{ justifyContent: "center" }}>
        {errors.map((errorMessage) => {
          return (
            <Typography variant="body2" key={errorMessage}>
              {errorMessage}
            </Typography>
          );
        })}
      </Grid>
    </Grid>
  ) : null;
}

