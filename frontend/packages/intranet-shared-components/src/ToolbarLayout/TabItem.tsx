import { Dispatch, SetStateAction } from "react";

import { Grid, Typography } from "@mui/material";
import { ITabItem } from "./Toolbar";

export interface IProps<T extends React.ReactNode> extends ITabItem<T> {
  showContent: boolean;
  setShowContent: Dispatch<SetStateAction<boolean>>;
  isActive: boolean;
}

const TabItem = <T extends React.ReactNode>(props: IProps<T>) => {
  const { title, icon, handleClick, isActive, showContent, setShowContent } = props;
  return (
    <Grid
      container
      columnGap="12px"
      sx={{
        backgroundColor: isActive ? (theme) => theme.palette.secondary[100] : "",
        cursor: "pointer",
        borderRadius: "8px",
        alignItems: "center",
        justifyContent: showContent ? "center" : "flex-start",
        padding: showContent ? "12px 16px" : "12px 10px 12px 16px",
      }}
      onClick={() => {
        handleClick(title);
        setShowContent(false);
      }}
    >
      {icon}
      <Typography
        variant={isActive ? "subtitle2" : "body1"}
        sx={{
          display: showContent ? "none" : "flex",
          color: (theme) => (isActive ? theme.palette.secondary[500] : theme.palette.greyscale[500]),
        }}
      >
        {title}
      </Typography>
    </Grid>
  );
};

export default TabItem;

