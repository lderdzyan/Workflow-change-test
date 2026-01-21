import { chainContent } from "./content";
import { useDownDefaultDesktop, useDownLargeTablet, useDownTablet } from "../../breakpoints";

import { Grid, Typography } from "@mui/material";

import { ChainItem } from "./ChainItem";

export function WLFBChainOfSteps() {
  const downDefaultDesktop = useDownDefaultDesktop();
  const downLargeTablet = useDownLargeTablet();
  const downTablet = useDownTablet();

  const getLineStyles = (isReflect: boolean) => {
    if (downTablet) {
      return { width: "50px", left: "35px" };
    }

    if (downLargeTablet || downDefaultDesktop) {
      return {
        width: isReflect ? "120px" : "180px",
        left: isReflect ? "100%" : "90%",
      };
    }

    return {
      width: isReflect ? "165px" : "160px",
      left: isReflect ? "100%" : "90%",
    };
  };

  const getChainGap = () => {
    if (downTablet) return "20px";
    if (downLargeTablet) return "0";
    return "40px";
  };

  return (
    <Grid container justifyContent="center" alignItems="flex-start" gap={getChainGap()} sx={{ width: "100%" }}>
      {chainContent.map((item, index) => {
        const isNotLast = index !== chainContent.length - 1;
        const isReflect = item.title === "Reflect & Uncover";
        const { width: widthLine, left: leftLine } = getLineStyles(isReflect);

        return (
          <Grid
            item
            key={item.title}
            container
            direction={downTablet ? "row" : "column"}
            alignItems="center"
            justifyContent={downTablet ? "flex-start" : "center"}
            sx={{ flex: downTablet ? "flex" : "1 0 0" }}
            gap="20px"
            wrap="nowrap"
          >
            <ChainItem itemWidth={item.w} itemHeight={item.h} itemImg={item.img} isReflect={isReflect} isNotLast={isNotLast} widthLine={widthLine} leftLine={leftLine} />
            <Typography variant="label1" textAlign={downTablet ? "left" : "center"}>
              {item.title}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}

