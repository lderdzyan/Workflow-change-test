import { Button, CircularProgress, Grid, Typography, useMediaQuery } from "@mui/material";
import { Package } from "@repo/gui-sdk";
import { calcPackagePrice } from "@repo/utilities";

import { IFrameEventNames, IFrameEventStatuses, IFrameEventTypes, dispatchEvent, generateIframeSource } from "@repo/utilities";
import { AppButton } from "../../shared";

import type { ButtonProps } from "@mui/material/Button";

interface IProps {
  disabled: boolean;
  loading: boolean;
  packageInfo: Package | undefined;
  btnTitle: string;
  btnId?: string;
  answerId: string;
  surveyId: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, packageDetail: Package | undefined) => void;
  newStyles?: boolean;
  size?: ButtonProps["size"];
  showPrice?: boolean;
}

export function PurchaseComponent({ disabled, loading, handleClick, packageInfo, btnTitle, btnId, answerId, surveyId, newStyles, size, showPrice = true }: IProps) {
  const down768 = useMediaQuery("(max-width: 768px)");

  const price = packageInfo ? calcPackagePrice(packageInfo.products, packageInfo.discount).toString() : "";

  return (
    <Grid container flexDirection={"column"} gap={"8px"} width={down768 ? "100%" : "fit-content"}>
      <AppButton
        id={btnId}
        variant="primary"
        size={size || (down768 ? "small" : "medium")}
        sx={{
          width: down768 ? "100%" : "fit-content",
        }}
        disabled={disabled}
        loading={loading}
        onClick={(e) => handleClick(e, packageInfo)}
      >
        {newStyles ? btnTitle : `${btnTitle} ${price && showPrice ? `for $${price}` : ""}`}
      </AppButton>
      <Typography
        variant="link4"
        sx={{
          cursor: disabled ? "default" : "pointer",
          pointerEvents: disabled ? "none" : "default",
          color: (theme) => (disabled ? theme.palette.color1[100] ?? theme.palette.text.primary : theme.palette.text.primary),
        }}
        onClick={() =>
          dispatchEvent({
            eventName: IFrameEventNames.OPEN_GLOBAL_MODAL,
            status: IFrameEventStatuses.success,
            src: generateIframeSource(IFrameEventTypes.discounts, { packageId: packageInfo?.id || "", price: price, surveyId: surveyId, answerId: answerId, ...(btnId && { btnId: btnId }) }),
            name: IFrameEventTypes.discounts,
          })
        }
      >
        Have a discount code?
      </Typography>
    </Grid>
  );
}

