import Image from "next/image";

import { getImageSrc } from "@repo/utilities";
import { useDownLargeTablet, useDownTablet } from "../../breakpoints";

import { Box, Grid } from "@mui/material";

export function ChainItem({
  itemWidth,
  itemHeight,
  itemImg,
  isReflect,
  isNotLast,
  leftLine,
  widthLine,
}: {
  itemWidth: number;
  itemHeight: number;
  itemImg: string;
  isReflect: boolean;
  isNotLast: boolean;
  leftLine: string;
  widthLine: string;
}) {
  const downLargeTablet = useDownLargeTablet();
  const downTablet = useDownTablet();

  const renderTabletLines = () => (
    <>
      {isReflect && !downTablet && (
        <Box
          sx={{
            height: "6px",
            width: "8px",
            background: (theme) => theme.palette.color5[100],
            position: "absolute",
            top: downTablet ? "107px" : "50%",
            left: "95%",
            transform: downTablet ? "rotate(90deg)" : "translateY(-50%)",
            zIndex: 12,
          }}
        />
      )}

      {isNotLast && (
        <Box
          sx={{
            height: "6px",
            background: (theme) => theme.palette.color5[100],
            position: "absolute",
            top: downTablet ? "100%" : "50%",
            left: leftLine,
            transform: downTablet ? "rotate(90deg)" : "translateY(-50%)",
            width: widthLine,
            zIndex: -1,
          }}
        />
      )}
    </>
  );

  const renderDesktopArrow = () =>
    isNotLast && <Image width={58} height={8} src={getImageSrc("product/builder/purchase/chain-arrow.svg")} alt="chain-arrow" style={{ position: "absolute", right: "-70%" }} />;

  return (
    <Grid item sx={{ position: "relative", display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          backgroundImage: `url(${getImageSrc(itemImg)})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          width: `${itemWidth}px`,
          height: `${itemHeight}px`,
          zIndex: 11,
        }}
      />

      {downLargeTablet ? renderTabletLines() : renderDesktopArrow()}
    </Grid>
  );
}

