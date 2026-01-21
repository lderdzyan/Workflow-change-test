import { Dispatch, SetStateAction } from "react";

import { alpha, CircularProgress, Dialog, Grid } from "@mui/material";

import useIFrameActions from "./useIFrameActions";
import { IFrameEventTypes } from "@repo/utilities";
import { dialogOpacity } from "../../../../../../shared-components/src/product/ModalSample/paddings";

export default function GlobalModal({
  iframeSrc,
  iframeName,
  setOpenModal,
  setCurrentModalName,
}: {
  iframeSrc: string;
  iframeName: IFrameEventTypes;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setCurrentModalName: Dispatch<SetStateAction<string>>;
}) {
  const { loading } = useIFrameActions({ iframeName, setOpenModal, setCurrentModalName });

  return (
    <Dialog
      hideBackdrop
      fullScreen
      disableScrollLock
      open={true}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
        },
        sx: {
          background: (theme) => theme.palette.white.main,
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: (theme) => alpha(theme.palette.color1[900]!, dialogOpacity),
          },
        },
      }}
    >
      <Grid
        container
        sx={{
          position: "absolute",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: loading ? "flex" : "none",
          backgroundColor: "rgba( 255, 255, 255, 0.8 )",
        }}
      >
        <CircularProgress />
      </Grid>

      {iframeSrc && (
        <iframe
          src={iframeSrc}
          id="globalIframeModal"
          style={{
            width: "100%",
            visibility: loading ? "hidden" : "visible",
            height: "100%",
            border: "none",
            background: "transparent",
          }}
        />
      )}
    </Dialog>
  );
}

