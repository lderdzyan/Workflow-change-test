import { Theme } from "@mui/material";

export const scrollbarStyles = {
  "&::-webkit-scrollbar": {
    height: "4px",
    width: "4px",
    borderRadius: "20px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: (theme: Theme) => theme.palette.color3[200],
    borderRadius: "20px",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: `inset 0 0 1px #D9D9D9`,
  },
};
