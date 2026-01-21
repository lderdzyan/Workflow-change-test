import { getCurrentPerson } from "@repo/gui-sdk";
import { getPersonIdentity, getPersonName } from "@repo/utilities";

import { Grid, Typography } from "@mui/material";

const ellipsisProps = {
  overflow: "hidden",
  maxWidth: "100%",
  textOverflow: "ellipsis",
};

export function Info() {
  return (
    <Grid container flexDirection={"column"} gap={"4px"}>
      <Typography variant="singleLine2" sx={{ ...ellipsisProps }}>
        {getPersonName(getCurrentPerson)}
      </Typography>
      <Typography variant="label4" sx={{ ...ellipsisProps }}>
        {getPersonIdentity(getCurrentPerson)}
      </Typography>
    </Grid>
  );
}

