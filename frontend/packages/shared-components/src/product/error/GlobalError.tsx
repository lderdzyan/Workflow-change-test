import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Typography } from "@mui/material";
import { AppContentGroup } from "../Containers/AppContentGroup";

export function GlobalErrorComponent() {
  return (
    <AppContentGroup container flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
      <ErrorOutlineIcon fontSize="large" sx={{ color: ({ palette }) => palette.color4[600] }} />
      <Typography variant="label1" sx={{ color: ({ palette }) => palette.color4[600] }}>
        Sorry, something went wrong...
      </Typography>
    </AppContentGroup>
  );
}

