import { Grid, useMediaQuery } from "@mui/material";

export function CircleBackground() {
  const down768 = useMediaQuery("(max-width: 768px)");

  return (
    <Grid
      container
      sx={{
        position: "absolute",
        backgroundColor: (theme) => theme.palette.color1[200],
        width: down768 ? "400px" : "584px",
        height: down768 ? "400px" : "584px",
        borderRadius: "50%",
        top: down768 ? "-73px" : "-232px",
        left: down768 ? "-120px" : "-232px",
      }}
    />
  );
}

