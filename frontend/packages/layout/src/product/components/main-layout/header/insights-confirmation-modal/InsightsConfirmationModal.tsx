import { useEffect, useState } from "react";

import { ICustomEvent, IFrameEventStatuses } from "@repo/utilities";
import { ActionMode, AppModal, IModalButtonsActions, ModalTypes, useDownTablet } from "@repo/shared-components/product";

import { Grid, Typography } from "@mui/material";

enum ConfirmationModalSteps {
  SEND = "send",
  CLOSING = "closing",
}

export default function InsightsConfirmationModal() {
  const down768 = useDownTablet();

  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const [step, setStep] = useState<ConfirmationModalSteps>(ConfirmationModalSteps.SEND);

  const isSend = step === ConfirmationModalSteps.SEND;

  const handleOpen = (e: ICustomEvent<{}>) => {
    if (e.detail) {
      setStep(e.detail?.status === IFrameEventStatuses.success ? ConfirmationModalSteps.CLOSING : ConfirmationModalSteps.SEND);
      setOpen(true);
    }
  };

  const handleSubmit = async () => {
    const insightsIframe = document.getElementById("insights_iframe") as HTMLIFrameElement;
    if (insightsIframe) {
      insightsIframe.contentWindow?.postMessage({ action: "finish_and_send" }, "*");
    }
    handleClose();
  };

  useEffect(() => {
    window.document.addEventListener("insights_confirmation_open", handleOpen, false);
    return () => {
      window.document.removeEventListener("insights_confirmation_open", handleOpen);
    };
  }, []);

  const actionButtons: Array<IModalButtonsActions> = [
    { title: "Finish and send", variant: "primary", handleClick: handleSubmit, disabled: false, loading: false, type: "button" },
    { title: "Back", variant: "secondary", handleClick: handleClose, disabled: false, loading: false, type: "button" },
    { title: "Okay, got it", variant: "primary", handleClick: handleClose, disabled: false, loading: false, type: "button" },
  ];

  return (
    <AppModal
      type={ModalTypes.main}
      open={open}
      handleClose={handleClose}
      title={
        <Grid>
          <Typography variant="h1">{isSend ? "Send the insights and actions to the Explorer" : "Insights and actions have been sent"}</Typography>
        </Grid>
      }
      content={
        <Typography sx={{ fontSize: down768 ? "14px" : "16px", lineHeight: down768 ? "21px" : "24px" }}>
          {isSend
            ? "By finishing and sending the insights and actions, you will no longer be able to edit them, and the Explorer will receive notification that they are ready to access and review."
            : "The explorer will receive an email to review their completed insights and actions."}
        </Typography>
      }
      actions={actionButtons.filter((item) => (isSend ? item.title !== "Okay, got it" : item.title === "Okay, got it"))}
      actionMode={ActionMode.notRequired}
    />
  );
}

