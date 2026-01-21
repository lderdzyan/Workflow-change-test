import { useState } from "react";
import Image from "next/image";
import { GuideCardData } from "./GuideContainer";
import { genUserName } from "@repo/utilities";

import { Card, Grid, Skeleton, Typography, useMediaQuery } from "@mui/material";

interface IGuideCardProps {
  guide: GuideCardData;
  handleClickItem: (id: string) => void;
}
export function GuideCard({ guide, handleClickItem }: IGuideCardProps) {
  const down768 = useMediaQuery("(max-width:768px)");
  const [loaded, setLoaded] = useState<boolean>(false);
  return (
    <Card
      sx={{
        width: down768 ? "168px" : "218px",
        height: down768 ? "330px" : "378px",
        background: (theme) => theme.palette.color3[50],
        margin: "auto",
        cursor: "pointer",
        ":hover": {
          "& .MuiGrid-root .hoverStateContainer": {
            opacity: "1",
          },
        },
      }}
      onClick={() => handleClickItem(guide.id)}
    >
      <Grid
        sx={{
          width: down768 ? "168px" : "218px",
          height: down768 ? "252px" : "300px",
          backgroundColor: (theme) => theme.palette.color3[200],
          borderRadius: "2px",
          overflow: "hidden",
          flexShrink: 0,
          position: "relative",
        }}
      >
        {guide.image ? (
          <Grid sx={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              quality={100}
              width={down768 ? 168 : 218}
              height={down768 ? 252 : 300}
              src={window.MS_UPLOADS_URL + guide.image}
              alt="guide_image"
              style={{ objectFit: "cover" }}
              onLoad={() => setLoaded(true)}
            />
            {!loaded && <Skeleton animation="wave" sx={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", bgcolor: "#DEDEDE", transform: "none", borderRadius: "0" }} />}
          </Grid>
        ) : null}
        <Grid
          className="hoverStateContainer"
          sx={{
            width: "calc(100% - 8px)",
            height: "calc(100% - 8px)",
            border: "4px solid rgba(255, 255, 255, 0.7)",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -50%)",
            top: "50%",
            borderRadius: "2px",
            transition: "300ms",
            opacity: "0",
          }}
        />
      </Grid>
      <Grid container flexDirection="column" sx={{ p: "8px 12px 12px" }}>
        <Typography variant="label3" sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", width: down768 ? "144px" : "194px" }}>
          {genUserName(guide.firstName, guide.lastName)}
        </Typography>
        <Typography
          variant="multiLine4"
          sx={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            width: down768 ? "144px" : "194px",
          }}
        >
          {[guide.city, guide.countryState, guide.country].filter(Boolean).join(", ")}
        </Typography>
        <Typography
          variant="label4"
          sx={{
            mt: "8px",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            width: down768 ? "144px" : "194px",
          }}
        >
          {guide.workLifeRoles ? guide.workLifeRoles.join(", ") : ""}
        </Typography>
      </Grid>
    </Card>
  );
}

