import { AppContentWrapper } from "../Containers/AppContentWrapper";
import { LogoMSBlack, LogoSize } from "../logos/LogoMSBlack";
import { AppContainer } from "../Containers/AppContainer";
import { TermsAndPrivacy } from "../TermsAndPrivacy";
import { ContactSupport } from "../ContactSupport";
import { isFullyLoggedIn } from "@repo/utilities";
import PurchaseButtons from "./PurchaseButtons";
import { ErrorComponent } from "../error";
import { Package } from "@repo/gui-sdk";

import { Typography, useTheme } from "@mui/material";

export function PurchaseIntermediaryContent({
  title,
  subtitle,
  packageData,
  loading,
  paymentLoading,
  btnId,
  surveyId,
  paymentFinished,
  flow,
  handlePurchase,
  errors,
  answerId,
}: {
  title: string;
  subtitle: string;
  packageData: Package | undefined;
  loading: boolean;
  paymentLoading: boolean;
  btnId: string;
  surveyId: string;
  paymentFinished: boolean;
  flow: string;
  handlePurchase: () => void;
  errors?: string[];
  answerId: string;
}) {
  const { palette } = useTheme();

  return (
    <AppContentWrapper
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!isFullyLoggedIn() && <LogoMSBlack size={LogoSize.MEDIUM} />}
      <AppContainer maxWidth="600px" sx={{ backgroundColor: palette.color5[100], textAlign: "center" }}>
        <Typography variant="display1">{title}</Typography>
        <PurchaseButtons
          flow={flow}
          btnId={btnId}
          loading={loading}
          surveyId={surveyId}
          subtitle={subtitle}
          packageData={packageData}
          paymentLoading={paymentLoading}
          paymentFinished={paymentFinished}
          handlePurchase={handlePurchase}
          answerId={answerId}
        />
        <ContactSupport align="center" />
        {errors && Boolean(errors.length) && <ErrorComponent errors={errors} />}
      </AppContainer>
      {!isFullyLoggedIn() && <TermsAndPrivacy />}
    </AppContentWrapper>
  );
}

