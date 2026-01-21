import { Grid, Typography } from "@mui/material";

export function SurveyMonkeyBox({ feedbackLink }: { feedbackLink: string }) {
  return (
    <Grid
      container
      sx={{
        flexDirection: "column",
        gap: "12px",
        p: "20px",
        border: (theme) => `1px solid ${theme.palette.color3[200]}`,
        borderRadius: "4px",
        backgroundColor: (theme) => theme.palette.color3[50],
      }}
    >
      <Typography variant="h3" sx={{ width: "fit-content" }}>
        How was your experience?
      </Typography>
      <Typography variant="multiLine2" sx={{ width: "fit-content" }}>
        Your feedback will help us ensure everyone’s path forward to more meaningful work through MeaningSphere is delightful and frustration-free. Will you share your feedback with us?
      </Typography>
      <Typography
        variant="link2"
        sx={{ width: "fit-content", fontWeight: "600" }}
        onClick={() => {
          window.parent.open(feedbackLink, "_blank");
        }}
      >
        Share your feedback with MeaningSphere
      </Typography>
    </Grid>
  );
}

