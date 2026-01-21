import { ReactElement } from "react";
import { useDownTablet } from "../../breakpoints";
import { AccordionMS } from "../AccordionMS";
import { DesktopView } from "./DesktopView";

import { Grid } from "@mui/material";

interface IProps {
  title: string;
  children: ReactElement;
  gap?: {
    m: string;
    d: string;
  };
}

export function SummarySection({ title, children, gap = { d: "40px", m: "12px" } }: IProps) {
  const downTablet = useDownTablet();
  const ViewComponent = downTablet ? AccordionMS : DesktopView;

  return (
    <ViewComponent title={title} gap={downTablet ? gap.m : gap.d}>
      <Grid container justifyContent={"space-between"} gap={downTablet ? "12px" : "20px"} height={"fit-content"}>
        {children}
      </Grid>
    </ViewComponent>
  );
}

