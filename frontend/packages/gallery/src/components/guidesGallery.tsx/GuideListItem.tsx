import { useState } from "react";
import Image from "next/image";

import { GuideCardData } from "./GuideContainer";
import { genUserName } from "@repo/utilities";
import { AppButton } from "@repo/shared-components/shared";

import { Card, Divider, Grid, Skeleton, Typography, useMediaQuery } from "@mui/material";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";

interface IGuideCardProps {
  guide: GuideCardData;
  handleClickItem: (id: string, toSchedule?: boolean) => void;
  showScheduleButton?: boolean;
}
export function GuideListItem({ guide, handleClickItem, showScheduleButton }: IGuideCardProps) {
  const down768 = useMediaQuery("(max-width:768px)");
  const [loaded, setLoaded] = useState<boolean>(false);

  const remainingCount = guide.availableTimes && guide.availableTimes.length > 3 ? guide.availableTimes.length - 3 : 0;

  const showGuideInfo = guide.city || guide.country || guide.countryState || guide.firstName || guide.lastName;

  return (
    <Card
      sx={{
        width: "100%",
        background: (theme) => theme.palette.primary.light,
        p: down768 ? "8px" : "12px 16px",
        borderRadius: "2px",
        transition: "300ms",
      }}
    >
      <Grid container flexWrap="nowrap" gap={down768 ? "12px" : "16px"} height="100%" alignItems="flex-start">
        {guide.image ? (
          <Grid item sx={{ position: "relative", borderRadius: "4px" }}>
            <Image
              quality={100}
              width={down768 ? 68 : 104}
              height={down768 ? 68 : 104}
              src={window.MS_UPLOADS_URL + guide.image}
              alt="guide_image"
              style={{ objectFit: "cover", borderRadius: "4px" }}
              onLoad={() => setLoaded(true)}
            />
            {!loaded && <Skeleton animation="wave" sx={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", bgcolor: "#DEDEDE", transform: "none", borderRadius: "4px" }} />}
          </Grid>
        ) : (
          <Grid item>
            <Grid container sx={{ width: down768 ? 68 : 104, height: down768 ? 68 : 104, borderRadius: "4px", backgroundColor: (theme) => theme.palette.color3[200] }}></Grid>
          </Grid>
        )}
        <Divider orientation="vertical" sx={{ borderColor: (theme) => theme.palette.color3[200] }} />
        <Grid item sx={{ width: "100%" }}>
          <Grid container flexDirection={"column"} gap="8px">
            {showGuideInfo && (
              <Grid container flexDirection={"column"}>
                <Typography variant="label3" sx={{ wordBreak: "break-word", wordWrap: "break-word", whiteSpace: "normal" }}>
                  {genUserName(guide.firstName, guide.lastName)}
                </Typography>

                <Typography variant="multiLine4" sx={{ wordBreak: "break-word", wordWrap: "break-word", whiteSpace: "normal" }}>
                  {[guide.city, guide.countryState, guide.country].filter(Boolean).join(", ")}
                </Typography>
              </Grid>
            )}
            {guide.workLifeRoles && guide.workLifeRoles.length > 0 && (
              <Typography variant="label4" sx={{ wordBreak: "break-word", wordWrap: "break-word", whiteSpace: "normal" }}>
                {guide.workLifeRoles ? guide.workLifeRoles.join(", ") : ""}
              </Typography>
            )}
            <Grid container gap="8px" alignItems={"center"}>
              <AppButton variant="secondary" size="x-small" onClick={() => handleClickItem(guide.id)} sx={{ width: down768 ? "100%" : "fit-content" }}>
                View profile
              </AppButton>
              {showScheduleButton && (
                <AppButton variant="secondary" size="x-small" onClick={() => handleClickItem(guide.id, true)} sx={{ width: down768 ? "100%" : "fit-content" }}>
                  Schedule with this Guide
                </AppButton>
              )}
            </Grid>
            {guide.availableTimes && guide.availableTimes.length > 0 && (
              <Grid container gap="2px" alignItems={"center"} flexWrap="nowrap">
                <AccessTimeTwoToneIcon sx={{ width: "20px", height: "20px", color: (theme) => theme.palette.color1[200], mr: "4px" }} />
                <Typography variant="multiLine4" sx={{ wordBreak: "break-word", wordWrap: "break-word", whiteSpace: "normal" }}>
                  {guide.availableTimes && guide.availableTimes.slice(0, 3).map((item, index, arr) => `${getHours(item.startTime)}${index < arr.length - 1 ? ", " : ""}`)}
                  {remainingCount ? `+ ${remainingCount} more` : null}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

const getHours = (epoch: number): string => new Date(epoch).toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

