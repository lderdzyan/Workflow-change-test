import { Grid, useMediaQuery } from "@mui/material";
import Trail from "./trail";
import Toolbar, { ITabItem } from "./Toolbar";

interface IProps<T extends React.ReactNode> {
  views: Array<ITabItem<T>>;
  activeTab: string;
  children: React.ReactNode;
  links: Array<{title: string; path: string; isExternal?: boolean}>;
}

export const ToolbarLayout = <T extends React.ReactNode>(props: IProps<T>) => {
  const { views, activeTab, children, links } = props;

  const down768 = useMediaQuery("(max-width:768px)");
  const down426 = useMediaQuery("(max-width:426px)");
  const down900 = useMediaQuery("(max-width:900px)");

  return (
    <Grid container columnGap="24px" justifyContent={"space-between"} alignItems={"flex-start"} flexWrap={"nowrap"} sx={{ minHeight: "100vh" }}>
      <Toolbar tabs={views} activeTab={activeTab} />
      <Grid
        container
        sx={{
          maxWidth: down900 ? "calc(100% - 90px)" : "calc(100% - 300px)",
          width: "100%",
          minHeight: "inherit",
          marginLeft: { xs: "90px", sm: "95px", md: "300px" },
          rowGap: down426 ? "16px" : down768 ? "24px" : "32px",
        }}
        className="rightPartContainer"
        flexDirection={"column"}
        flexWrap={"nowrap"}
      >
        <Trail links={links} />
        {children}
      </Grid>
    </Grid>
  );
};

