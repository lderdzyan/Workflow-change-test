import { Link } from "react-router-dom";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { IconButton, Typography } from "@mui/material";

export default function BackButton({ backText, backPath }: { backText: string; backPath: string }) {
  return (
    <Link to={backPath} style={{ display: "flex" }}>
      <IconButton sx={{ color: "black", fontSize: "12px", mr: "2px" }}>
        <ArrowBackRoundedIcon fontSize="inherit" />
      </IconButton>
      <Typography variant="singleLine4">{backText}</Typography>
    </Link>
  );
}

