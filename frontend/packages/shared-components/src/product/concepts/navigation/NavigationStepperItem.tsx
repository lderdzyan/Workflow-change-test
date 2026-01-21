import { Grid } from "@mui/material";
import { BORDER_RADIUS } from "../../borderRadius";

export interface SectionItem {
  title: string;
  path: string;
}

export function NavigationStepperItem({ keyItem, isSelected, isPrev }: { keyItem: number | string; isSelected: boolean; isPrev: boolean }) {
  return (
    <Grid
      key={keyItem}
      sx={{
        width: "100%",
        boxShadow: ({ palette }) => `0px 0px 0px 2px ${isSelected ? palette.color8[600] : "tansparent"}`,
        borderRadius: BORDER_RADIUS.small,
        backgroundColor: ({ palette }) => palette.color8[isPrev ? 400 : 200],
      }}
    />
  );
}

