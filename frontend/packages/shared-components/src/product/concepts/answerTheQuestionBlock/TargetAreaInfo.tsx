import { TargetAreaInfo } from ".";
import { LightningLineIcon, StarIcon } from "@repo/assets";
import { Grid, Typography } from "@mui/material";

export function TargetAreaInfoBlock({ targetAreaInfo }: { targetAreaInfo: TargetAreaInfo }) {
  return (
    <Grid container flexWrap={"nowrap"} justifyContent={"space-between"}>
      <Typography variant="h3" sx={{ width: "fit-content", textTransform: "capitalize" }}>
        {targetAreaInfo.area}
      </Typography>
      <Grid container flexWrap={"nowrap"} gap={"12px"} sx={{ width: "fit-content" }}>
        <Grid container flexWrap={"nowrap"} gap={"2px"}>
          <Typography variant="label1">{targetAreaInfo.exp}</Typography>
          <StarIcon fontSize="small" />
        </Grid>
        <Grid container flexWrap={"nowrap"} gap={"2px"}>
          <Typography variant="label1">{targetAreaInfo.exp}</Typography>
          <LightningLineIcon fontSize="small" />
        </Grid>
      </Grid>
    </Grid>
  );
}

