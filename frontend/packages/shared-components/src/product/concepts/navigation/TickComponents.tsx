import { Grid } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

export function TickComponent({ completed }: { completed: boolean }) {
  return <Grid sx={{ width: "20px", height: "20px" }}>{completed && <CheckCircleRoundedIcon fontSize="small" sx={{ color: ({ palette }) => palette.color8[600] }} />}</Grid>;
}

