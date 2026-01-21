import { Grid, TextField, Typography } from "@mui/material";
import { useDownTablet } from "../../breakpoints";
import { AnswerBlockVariants } from "../answerTheQuestionBlock";
import { FormikValues } from "formik";
import { useRef, useEffect } from "react";
import { BORDER_RADIUS } from "../../borderRadius";

export default function Content({ question, formik, backendErrors }: { variant: AnswerBlockVariants; question: string; formik: FormikValues; backendErrors: Array<string> }) {
  const downTablet = useDownTablet();
  const inputRef = useRef<HTMLInputElement>(null);
  const characterLimit = 750;
  const currentAnswerLength = formik.values.answer.length;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} id="answerTheQuestionForm">
      <Grid container flexDirection="column" gap={downTablet ? "12px" : "20px"}>
        <Grid container flexDirection={"column"} gap={"12px"}>
          <Typography variant="h2">Question</Typography>
          <Typography variant="multiLine1">{question}</Typography>
        </Grid>
        <Grid container flexDirection={"column"} gap={"12px"}>
          <Typography variant="h2">Your Answer</Typography>
          <TextField
            multiline
            inputRef={inputRef}
            minRows={5}
            fullWidth
            name="answer"
            variant="outlined"
            value={formik.values.answer}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.email) || Boolean(backendErrors.length)}
            inputProps={{
              maxLength: characterLimit,
            }}
          />
          <Grid container sx={{ mt: "-6px", alignItems: "center" }}>
            <Typography variant="label4">{`Character limit: ${currentAnswerLength}/${characterLimit}`}</Typography>
            {currentAnswerLength >= characterLimit && (
              <Typography
                variant="label4"
                sx={{
                  color: (theme) => theme.palette.color3[600],
                  padding: "2px 8px",
                  border: (theme) => `2px solid ${theme.palette.color2[400]}`,
                  borderRadius: BORDER_RADIUS.medium,
                  ml: "8px",
                }}
              >
                You've reached your limit
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

