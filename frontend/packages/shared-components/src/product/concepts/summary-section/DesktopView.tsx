import { ReactElement } from "react";

import { Grid, Typography } from "@mui/material";

interface IProps {
  title: string;
  children: ReactElement;
  gap: string;
}

export function DesktopView({ title, children, gap }: IProps) {
  return (
    <Grid container justifyContent={"space-between"} gap={gap} height={"fit-content"} direction={"column"}>
      <Grid item>
        <Typography variant="h2">{title}</Typography>
      </Grid>
      {children}
    </Grid>
  );
}

