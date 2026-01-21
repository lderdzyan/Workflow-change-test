import { MutableRefObject, ReactNode, useEffect, useRef } from "react";

import { alpha, Divider, Grid, Typography } from "@mui/material";

import { ErrorComponent } from "../error/ErrorComponent";
import useContentMaxHeight from "./useContentMaxHeight";
import { useDownTablet } from "../breakpoints";
import { actionsGap, contentPadding, contentPaddingMobile, dialogMaxWidth, dialogOpacity, dialogTitleP, mainGap, modalMobilePadding, modalPadding } from "./paddings";
import { AppButton } from "../../shared/AppButton";
import { BORDER_RADIUS } from "../borderRadius";

interface IButtonsActions {
  title: string;
  variant: "primary" | "secondary" | "tertiary";
  disabled: boolean;
  loading: boolean;
  mobileView?: "auto" | "100%";
}
interface IButtonsActionsForms extends IButtonsActions {
  type: "submit";
  formId: string;
}

interface IButtonsActionsCustom extends IButtonsActions {
  type: "button";
  handleClick: () => void;
}

export type IModalButtonsActions = IButtonsActionsForms | IButtonsActionsCustom;

interface IProps {
  type: ModalTypes;
  handleClose: () => void;
  title: ReactNode;
  content: ReactNode;
  actions: Array<IModalButtonsActions>;
  closeButtonDisabled?: boolean;
  helperText?: string;
  errors?: string[];
  actionMode: ActionMode;
  handleOutsideClickProp?: (e: MouseEvent) => void;
  maxWidth?: string;
}

export enum ModalTypes {
  complex = "complex",
  main = "main",
}

export enum ActionMode {
  required = "required",
  notRequired = "notRequired",
}

export enum ModalScroll {
  PAPER = "paper",
  BODY = "body",
}

export function IframeModal({ type, handleClose, title, content, actions, helperText, closeButtonDisabled, errors, actionMode, handleOutsideClickProp, maxWidth }: IProps) {
  const down768 = useDownTablet();
  const wrapperRef = useRef(null);

  const { maxHeight } = useContentMaxHeight({ type, errors, down768 });

  function useOutsideAlerter(ref: MutableRefObject<null>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        const container = document.querySelector(".modalContainer");
        const selectContainer = document.querySelector(".selectContainer");
        const backdropContainer = document.querySelector(".MuiBackdrop-root");
        if (ref.current && !container?.contains(event.target as Node) && !selectContainer?.contains(event.target as Node) && !backdropContainer?.contains(event.target as Node)) {
          handleClose();
          handleOutsideClickProp && handleOutsideClickProp(event);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);
  }

  useEffect(() => {
    document.body.style.background = "transparent";
  }, []);

  useOutsideAlerter(wrapperRef);

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        alignItems: "center",
        backgroundColor: (theme) => alpha(theme.palette.color1[900]!, dialogOpacity),
        padding: down768 ? modalMobilePadding : modalPadding,
        overflowY: "hidden",
      }}
    >
      <Grid
        ref={wrapperRef}
        className="modalContainer"
        sx={{
          margin: "auto",
          maxWidth: dialogMaxWidth(down768),
          width: "100%",
          backgroundColor: (theme) => theme.palette.primary.light,
          maxHeight: "100%",
          overflowY: "hidden",
          borderRadius: BORDER_RADIUS.large,
        }}
      >
        <Grid
          id="titleBlock"
          container
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            p: dialogTitleP(type),
            gap: mainGap,
            flexWrap: "nowrap",
          }}
        >
          {title}
          {actionMode !== ActionMode.required && (
            <AppButton variant="tertiary" size="x-small" disabled={closeButtonDisabled} onClick={handleClose}>
              Close
            </AppButton>
          )}
        </Grid>
        {type === ModalTypes.complex && <Divider sx={{ backgroundColor: (theme) => theme.palette.color3[100] }} />}
        <Grid
          container
          flexDirection="column"
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
            p: down768 ? contentPaddingMobile(type) : contentPadding(type),
            maxHeight: type === ModalTypes.complex ? `calc(100vh - ${maxHeight})` : "unset",
            overflow: "auto",
            gap: mainGap,
          }}
        >
          {content}
        </Grid>
        <Divider sx={{ backgroundColor: (theme) => theme.palette.color3[100] }} />
        <Grid
          container
          alignItems={"center"}
          sx={{
            p: down768 ? modalMobilePadding : `${modalMobilePadding} ${modalPadding}`,
            gap: actionsGap,
          }}
          id="actionsBlock"
        >
          {actions.map((action, index) => {
            return (
              <AppButton
                variant={action.variant}
                size="medium"
                sx={{ width: down768 ? "100%" : "auto", marginLeft: "0 !important" }}
                key={index}
                onClick={action.type === "button" ? action.handleClick : undefined}
                disabled={action.disabled}
                form={action.type === "submit" ? action.formId : undefined}
                type={action.type}
                loading={action.loading ?? null}
              >
                {action.title}
              </AppButton>
            );
          })}
          {helperText && <Typography variant="label4">{helperText}</Typography>}
          {errors && <ErrorComponent errors={errors} />}
        </Grid>
      </Grid>
    </Grid>
  );
}

