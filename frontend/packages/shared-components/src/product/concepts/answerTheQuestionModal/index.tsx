import { ReactNode, useEffect, useMemo, useState } from "react";

import { Effect, pipe } from "effect";
import { useFormik } from "formik";
import * as yup from "yup";
import { ActionMode, AnswerBlockVariants, ModalTypes } from "../..";
import { AppModal } from "../../ModalSample/AppModal";
import Content from "./Content";
import { genFormError } from "@repo/utilities";
import { RequestError } from "@repo/gui-sdk";

import { Grid } from "@mui/material";
export interface CategoryData {
  title: string;
  areas: Array<{ area: string; exp: number; imp: number }>;
}
export interface IProps<T> {
  variant: AnswerBlockVariants;
  handleClose: () => void;
  additionalContent: ReactNode;
  question: string;
  initialAnswer?: string;
  handleSave: (newAnswer: string) => Effect.Effect<T, RequestError, never>;
}

const validationSchema = yup.object({
  answer: yup.string().trim("Your answer cannot be empty or just spaces").required("Your answer is required"),
});

export function AnswerTheQuestionModal<T>({ variant, handleClose, additionalContent, question, initialAnswer, handleSave }: IProps<T>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [backendErrors, setBackendErrors] = useState<Array<string>>([]);

  const formik = useFormik<{ answer: string }>({
    initialValues: {
      answer: initialAnswer ?? "",
    },
    validateOnChange: false,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      Effect.runPromise(
        pipe(
          handleSave(values.answer.trim()),
          Effect.tap(() =>
            Effect.sync(() => {
              handleClose();
            }),
          ),
          Effect.catchAllCause((e) =>
            Effect.sync(() => {
              console.log(e, "error");
              setBackendErrors(["Something went wrong."]);
              setLoading(false);
            }),
          ),
        ),
      );
    },
  });

  const blockNavigation = useMemo(() => {
    return variant !== AnswerBlockVariants.READONLY && formik.values.answer && (!initialAnswer || formik.values.answer !== initialAnswer);
  }, [variant, formik.values.answer, initialAnswer]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    if (blockNavigation) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [blockNavigation]);

  const handleBackdropClick = () => {
    if (blockNavigation) {
      setBackendErrors(["If you close this now, your input will be lost. Please press Save your answer to keep your answer."]);
    } else {
      handleClose();
    }
  };

  return (
    <AppModal
      open
      type={ModalTypes.complex}
      handleClose={handleBackdropClick}
      title={<Grid></Grid>}
      content={
        <>
          {additionalContent}
          <Content variant={variant} question={question} formik={formik} backendErrors={backendErrors} />
        </>
      }
      actions={[
        {
          title: loading ? "Processing" : "Save your answer",
          variant: "primary",
          formId: "answerTheQuestionForm",
          disabled: loading,
          loading: loading,
          type: "submit",
        },
        {
          title: "Cancel",
          variant: "secondary",
          handleClick: handleClose,
          disabled: loading,
          loading: false,
          type: "button",
        },
      ]}
      actionMode={ActionMode.notRequired}
      errors={genFormError(formik.errors).concat(backendErrors)}
    />
  );
}

