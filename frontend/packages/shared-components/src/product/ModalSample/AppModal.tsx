import { ReactNode, useEffect } from "react";

import { actionsGap, contentPadding, contentPaddingMobile, mainGap, modalPadding, modalMobilePadding, dialogMaxWidth, dialogTitleP, dialogOpacity } from "./paddings";
import { ModalTypes, ActionMode, IModalButtonsActions, ModalScroll } from "./IframeModal";
import { ErrorComponent } from "../error/ErrorComponent";
import useContentMaxHeight from "./useContentMaxHeight";
import { AppButton } from "../../shared/AppButton";
import { BORDER_RADIUS } from "../borderRadius";
import { useDownTablet } from "../breakpoints";

import { alpha, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Typography } from "@mui/material";

interface IProps {
  open: boolean;
  type: ModalTypes;
  handleClose: () => void;
  title: ReactNode;
  content: ReactNode;
  actions: Array<IModalButtonsActions>;
  helperText?: string;
  errors?: string[];
  actionMode: ActionMode;
  scrollType?: ModalScroll;
}

export function AppModal({ type, handleClose, title, content, actions, open, helperText, errors, actionMode, scrollType = ModalScroll.PAPER }: IProps) {
  const down768 = useDownTablet();

  const { maxHeight } = useContentMaxHeight({ type, errors, down768 });
  const margin = down768 ? modalMobilePadding : modalPadding;

  const isPaperScroll = scrollType === ModalScroll.PAPER;

  useEffect(() => {
    if (!isPaperScroll && open) {
      document.documentElement.style.overflowX = "visible";
    } else {
      document.documentElement.style.overflowX = "hidden";
    }

    return () => {
      document.documentElement.style.overflowX = "hidden";
    };
  }, [open, isPaperScroll]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      scroll={scrollType}
      PaperProps={{
        sx: {
          margin: margin,
          maxWidth: dialogMaxWidth(down768),
          width: down768 ? "none" : "100%",
          borderRadius: BORDER_RADIUS.large,
          background: (theme) => theme.palette.white.main,
          maxHeight: isPaperScroll ? `calc(100vh - ${parseFloat(margin) * 2 + "px"})` : "unset",
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
      <DialogTitle
        id="titleBlock"
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: mainGap,
          p: dialogTitleP(type),
        }}
      >
        <Typography variant="h1">{title}</Typography>
        {actionMode !== ActionMode.required && (
          <AppButton variant="tertiary" size="x-small" onClick={handleClose}>
            Close
          </AppButton>
        )}
      </DialogTitle>
      {type === ModalTypes.complex && (
        <Divider
          sx={{
            backgroundColor: (theme) => theme.palette.color3[100],
          }}
        />
      )}
      <DialogContent
        sx={{
          "&::-webkit-scrollbar": {
            width: "15px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: (theme) => theme.palette.color3[300],
            backgroundClip: "padding-box",
            border: `3px solid transparent`,
            borderRadius: "12px",
          },
          display: "flex",
          flexDirection: "column",
          gap: mainGap,
          p: down768 ? contentPaddingMobile(type) : contentPadding(type),
          maxHeight: type === ModalTypes.complex && isPaperScroll ? `calc(100vh - ${maxHeight})` : "unset",
          overflow: "auto",
        }}
      >
        {content}
      </DialogContent>
      <Divider
        sx={{
          backgroundColor: (theme) => theme.palette.color3[100],
        }}
      />
      <DialogActions
        id="actionsBlock"
        sx={{
          p: down768 ? modalMobilePadding : `${modalMobilePadding} ${modalPadding}`,
          gap: actionsGap,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
          "& :not(style)~:not(style)": {
            marginLeft: "0",
          },
        }}
      >
        <Grid container sx={{ gap: actionsGap, display: "flex", alignItems: "center", flexDirection: down768 ? "column" : "row" }}>
          {actions.map((action, index) => {
            return (
              <AppButton
                variant={action.variant}
                size="medium"
                sx={{ width: down768 ? "100%" : "auto", marginLeft: "0 !important" }}
                key={index}
                form={action.type === "submit" ? action.formId : undefined}
                onClick={action.type === "button" ? action.handleClick : undefined}
                disabled={action.disabled}
                type={action.type}
                loading={action.loading ?? null}
              >
                {action.title}
              </AppButton>
            );
          })}
        </Grid>

        {helperText && <Typography variant="label4">{helperText}</Typography>}
        {errors && <ErrorComponent errors={errors} />}
      </DialogActions>
    </Dialog>
  );
}

