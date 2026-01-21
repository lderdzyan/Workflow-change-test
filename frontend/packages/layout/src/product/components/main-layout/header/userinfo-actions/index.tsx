import { Info } from "./Info";
import { Actions } from "./Actions";

import { Divider, Grid } from "@mui/material";

export function UserInfoAndActions({ close }: { close: VoidFunction }) {
  return (
    <Grid container flexDirection={"column"} gap={"12px"}>
      <Info />
      <Divider sx={{ borderColor: ({ palette }) => palette.color5[200] }} />
      <Actions close={close} />
    </Grid>
  );
}

