import { isFullyLoggedIn } from "@repo/utilities";

import BackButton from "./BackButton";

import { Grid, Typography } from "@mui/material";

interface IProps {
  backText?: string;
  backPath?: string;
  title: string;
  statusAndDate?: string;
}

export default function BackButtonAndTitle({ backText, backPath, title, statusAndDate }: IProps) {
  return (
    <Grid container flexDirection="column" mb="2px">
      {isFullyLoggedIn() && backText && backPath && <BackButton backPath={backPath} backText={backText} />}
      <Typography variant="h3" mb="2px">
        {title}
      </Typography>
      {statusAndDate && <Typography variant="singleLine4">{statusAndDate}</Typography>}
    </Grid>
  );
}

