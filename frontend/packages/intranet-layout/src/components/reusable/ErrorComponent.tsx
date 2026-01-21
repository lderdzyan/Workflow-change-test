import { Grid, Typography } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export function ErrorComponent({ formErrors, backendErrors }: { formErrors: string[]; backendErrors?: string[] }) {
  return (
    <>
      {Boolean(formErrors?.length) && (
        <Grid
          container
          sx={{
            mt: "12px",
            width: "100%",
            border: (theme) => `1px solid ${theme.palette.error[500]}`,
            p: "16px",
            borderRadius: "8px",
            flexWrap: "nowrap",
          }}
        >
          <Grid sx={{ height: "24px" }}>
            <ErrorOutlineOutlinedIcon sx={{ color: (theme) => theme.palette.error[500] }} />
          </Grid>
          <Grid container flexDirection={"column"} sx={{ justifyContent: "center", width: "fit-content" }}>
            {formErrors.map((errorMessage) => {
              return (
                <Typography variant="body2" sx={{ ml: "12px" }} key={errorMessage}>
                  {errorMessage}
                </Typography>
              );
            })}
          </Grid>
        </Grid>
      )}
      {Boolean(backendErrors?.length) ? (
        <Grid
          container
          sx={{
            mt: "12px",
            width: "100%",
            border: (theme) => `1px solid ${theme.palette.error[500]}`,
            p: "16px",
            borderRadius: "8px",
            flexWrap: "nowrap",
          }}
        >
          <Grid sx={{ height: "24px" }}>
            <ErrorOutlineOutlinedIcon sx={{ color: (theme) => theme.palette.error[500] }} />
          </Grid>
          {backendErrors?.map((errorMessage) => {
            return (
              <Grid container sx={{ justifyContent: "center", flexWrap: "nowrap", alignItems: "center", width: "fit-content" }} key={errorMessage}>
                <Typography variant="body2" sx={{ mr: "12px" }}>
                  {errorMessage}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      ) : null}
    </>
  );
}
