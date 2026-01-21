import { useFormik } from "formik";
import * as yup from "yup";

import { DemographicModalButtonNames, IFormFields, formMockData } from "./formMockData";
import { ActionMode, ModalTypes } from "../ModalSample/IframeModal";
import { DemographicDataOptions } from "@repo/gui-sdk";
import { AppModal } from "../ModalSample/AppModal";
import { genFormError } from "@repo/utilities";

import { Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@mui/material";

const errorText = "All fields are required.";
const fields = ["gender", "birthRegion", "age", "industry", "education", "occupation", "liveRegion"] as const;
const validationSchema = yup.object(
  fields.reduce(
    (acc, field) => ({
      ...acc,
      [field]: yup.string().required(errorText),
    }),
    {} as Record<(typeof fields)[number], yup.StringSchema>,
  ),
);

export function DemographicModal({
  open,
  handleClose,
  handleSubmit,
  handleBack,
  handleCancel,
  loading,
  errors,
}: {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (values: DemographicDataOptions) => void;
  handleBack: () => void;
  handleCancel: () => void;
  loading: DemographicModalButtonNames | undefined;
  errors: string[];
}) {
  const formik = useFormik<DemographicDataOptions>({
    initialValues: {
      gender: "",
      birthRegion: "",
      age: "",
      industry: "",
      education: "",
      occupation: "",
      liveRegion: "",
    },
    validateOnChange: false,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });

  const submitBtnLoading = loading === DemographicModalButtonNames.SUBMIT;
  const backBtnLoading = loading === DemographicModalButtonNames.BACK;
  const cancelBtnLoading = loading === DemographicModalButtonNames.CANCEL;

  return (
    <AppModal
      type={ModalTypes.complex}
      open={open}
      handleClose={handleClose}
      title={
        <Grid>
          <Typography variant="h1">Please complete all seven fields</Typography>
        </Grid>
      }
      content={Object.keys(formMockData).map((key: string) => {
        return (
          <FormControl fullWidth key={key} error={Boolean(formik.errors[key as keyof DemographicDataOptions]) || Boolean(errors.length)}>
            <InputLabel>{formMockData[key as keyof IFormFields].title}</InputLabel>
            <Select
              name={key}
              value={formik.values[key as keyof DemographicDataOptions]}
              label={formMockData[key as keyof IFormFields].title}
              onChange={formik.handleChange}
              error={Boolean(formik.errors[key as keyof DemographicDataOptions]) || Boolean(errors.length)}
            >
              {formMockData[key as keyof IFormFields].options.map((option, index) => (
                <MenuItem
                  key={index}
                  value={option}
                  sx={{
                    whiteSpace: "wrap",
                    "&.Mui-selected": {
                      backgroundColor: (theme) => theme.palette.primary.main,
                      color: (theme) => theme.palette.primary.light,
                      "&:hover": {
                        backgroundColor: (theme) => theme.palette.primary.main,
                      },
                    },
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.color1[200],
                    },
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      })}
      actions={[
        {
          title: submitBtnLoading ? "Processing" : "Submit",
          variant: "primary",
          handleClick: () => formik.handleSubmit(),
          disabled: Boolean(loading),
          loading: submitBtnLoading,
          type: "button",
        },
        { title: "Back", variant: "secondary", handleClick: handleBack, disabled: Boolean(loading), loading: backBtnLoading, type: "button" },
        {
          title: "I no longer wish to share any data",
          variant: "secondary",
          handleClick: handleCancel,
          disabled: Boolean(loading),
          loading: cancelBtnLoading,
          type: "button",
        },
      ]}
      actionMode={ActionMode.required}
      errors={genFormError(formik.errors).concat(errors)}
    />
  );
}

