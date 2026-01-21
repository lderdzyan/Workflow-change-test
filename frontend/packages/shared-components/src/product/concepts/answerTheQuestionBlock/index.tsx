import { TargetAreaInfoBlock } from "./TargetAreaInfo";
import { BORDER_RADIUS } from "../../borderRadius";
import { useDownTablet } from "../../breakpoints";
import { ButtonVariants } from "./ButtonVariants";

import { Grid, Typography } from "@mui/material";
import { textOverflowStyles } from "../../TextOverflowStyles";

export enum AnswerBlockVariants {
  INITIAL = "initial",
  ANSWERED = "answered",
  READONLY = "readonly",
}

export interface TargetAreaInfo {
  area: string;
  exp: number;
  imp: number;
}

export function AnswerTheQuestionBlock({
  variant,
  question,
  answer,
  onBtnClick,
  targetAreaInfo,
  title,
  titleWithStyles,
  disabled = false,
}: {
  variant: AnswerBlockVariants;
  question: string;
  answer?: string;
  onBtnClick?: () => void;
  targetAreaInfo?: TargetAreaInfo;
  title?: string;
  titleWithStyles?: string;
  disabled?: boolean;
}) {
  const downTablet = useDownTablet();

  return (
    <>
      {Boolean(titleWithStyles) && (
        <Grid item>
          <Typography
            variant="h3"
            sx={{
              backgroundColor: (theme) => (downTablet ? "none" : theme.palette.color1[100]),
              mb: "-8px",
              padding: downTablet ? "12px 12px 0 12px" : "16px 20px",
              borderRadius: `${BORDER_RADIUS.medium} ${BORDER_RADIUS.medium} 0 0`,
              border: (theme) => `1px solid ${theme.palette.color1[300]}`,
              borderBottom: downTablet ? "none !important" : "inherit",
            }}
          >
            {titleWithStyles}
          </Typography>
        </Grid>
      )}
      <Grid
        container
        flexDirection={"column"}
        gap={downTablet ? "12px" : "20px"}
        sx={{
          padding: downTablet ? "12px" : "20px",
          borderTop: titleWithStyles && "none !important",
          backgroundColor: ({ palette }) => palette.white.main,
          borderRadius: titleWithStyles ? `0 0 ${BORDER_RADIUS.medium} ${BORDER_RADIUS.medium}` : BORDER_RADIUS.medium,
          border: ({ palette }) => `1px solid ${palette.color1[300]}`,
        }}
      >
        {Boolean(targetAreaInfo) && <TargetAreaInfoBlock targetAreaInfo={targetAreaInfo!} />}
        {Boolean(title) && (
          <Typography
            variant="h3"
            sx={{
              ...textOverflowStyles,
            }}
          >
            {title}
          </Typography>
        )}
        {Boolean(question) && (
          <Typography
            variant={variant === AnswerBlockVariants.ANSWERED ? "label1" : "multiLine1"}
            sx={{
              fontWeight: variant === AnswerBlockVariants.ANSWERED ? "700" : "unset",
              ...textOverflowStyles,
            }}
          >
            {question}
          </Typography>
        )}
        {Boolean(answer) && (
          <Typography
            variant="multiLine1"
            sx={{
              ...textOverflowStyles,
            }}
          >
            {answer}
          </Typography>
        )}
        {onBtnClick && !disabled && <ButtonVariants variant={variant} handleClick={onBtnClick} />}
      </Grid>
    </>
  );
}

