import { Grid, useMediaQuery } from "@mui/material";
import { GuideCard } from "./GuideCard";
import { GuideListItem } from "./GuideListItem";

export interface GuideCardData {
  id: string;
  image?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  countryState?: string;
  city?: string;
  workLifeRoles?: string[];
  availableTimes?: {
    startTime: number;
  }[];
}

export enum GuideContainerDisplayView {
  row = "row",
  column = "column",
}

interface IGuideContainerProps {
  guides: GuideCardData[];
  handleClickItem: (id: string, toSchedule?: boolean) => void;
  displayView: GuideContainerDisplayView;
  showScheduleButton?: boolean;
}

export function GuideContainer({ guides, handleClickItem, displayView, showScheduleButton }: IGuideContainerProps) {
  const down768 = useMediaQuery("(max-width:768px)");

  const isRow = displayView === GuideContainerDisplayView.row;

  return isRow ? (
    <Grid
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(${down768 ? "168px" : "218px"}, 1fr))`,
        gap: down768 ? "8px" : "16px",
      }}
    >
      {guides.map((guide, index) => (
        <GuideCard guide={guide} key={index} handleClickItem={handleClickItem} />
      ))}
    </Grid>
  ) : (
    guides.map((guide, index) => <GuideListItem guide={guide} key={index} handleClickItem={handleClickItem} showScheduleButton={showScheduleButton} />)
  );
}

