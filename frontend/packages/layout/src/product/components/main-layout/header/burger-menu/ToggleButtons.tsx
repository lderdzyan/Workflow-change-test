import { StateSetter } from "@repo/utilities";

import { Grid, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export function ToggleButtons({ opened, setOpened }: { opened: boolean; setOpened: StateSetter<boolean> }) {
  const icon = opened ? <CloseOutlinedIcon fontSize="small" /> : <MenuOutlinedIcon fontSize="small" />;

  const handleClickIcon = () => setOpened((prev) => !prev);

  return (
    <Grid container gap={"4px"} sx={{ alignItems: "center", flexWrap: "nowrap", width: "fit-content" }} onClick={handleClickIcon}>
      <Typography variant="label4">{opened ? "CLOSE" : "MENU"}</Typography>
      {icon}
    </Grid>
  );
}

