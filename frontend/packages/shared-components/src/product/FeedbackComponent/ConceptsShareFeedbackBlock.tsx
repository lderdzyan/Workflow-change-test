import { BORDER_RADIUS } from "../borderRadius";
import { useDownTablet } from "../breakpoints";
import { AppButton } from "../../shared";

import { Grid, Typography } from "@mui/material";

export enum FeedbackButtonTypes {
  TEXT = "text",
  REGULAR = "regular",
}

interface IProps {
  title: string;
  description: string;
  button: {
    title: string;
    link: string;
    type: FeedbackButtonTypes;
    id?: string;
  };
}

export function ConceptsShareFeedbackBlock({ title, description, button }: IProps) {
  const downTablet = useDownTablet();

  return (
    <Grid
      container
      flexDirection={"column"}
      gap={"12px"}
      sx={{
        padding: downTablet ? "12px" : "20px 28px",
        border: ({ palette }) => `1px solid ${palette.color1[200]}`,
        borderRadius: BORDER_RADIUS.medium,
        backgroundColor: ({ palette }) => palette.color1[50],
      }}
    >
      <Typography variant="label2">{title}</Typography>
      <Typography variant="multiLine3">{description}</Typography>
      {button.type === FeedbackButtonTypes.REGULAR ? (
        <AppButton
          id={button.id}
          variant="primary"
          size="small"
          sx={{ width: downTablet ? "100%" : "fit-content" }}
          onClick={() => {
            window.parent.open(button.link, "_blank");
          }}
        >
          {button.title}
        </AppButton>
      ) : (
        <Typography
          variant="link2"
          sx={{ width: "fit-content" }}
          onClick={() => {
            window.parent.open(button.link, "_blank");
          }}
        >
          {button.title}
        </Typography>
      )}
    </Grid>
  );
}

