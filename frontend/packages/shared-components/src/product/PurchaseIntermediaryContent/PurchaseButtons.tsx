import { IFrameEventNames, IFrameEventStatuses, IFrameEventTypes, dispatchEvent, generateIframeSource, calcPackagePrice, triggerClick } from "@repo/utilities";
import { AppButtonsContent } from "../Containers/AppButtonsContent";
import PurchaseButtonsLoading from "./PurchaseButtonsLoading";
import { AppButton, LoadingComponent } from "../../shared";
import { getCurrentPerson, Package } from "@repo/gui-sdk";

import { Typography } from "@mui/material";

export default function PurchaseButtons({
  subtitle,
  packageData,
  loading,
  paymentLoading,
  btnId,
  surveyId,
  paymentFinished,
  flow,
  handlePurchase,
}: {
  subtitle: string;
  packageData: Package | undefined;
  loading: boolean;
  paymentLoading: boolean;
  btnId: string;
  surveyId: string;
  paymentFinished: boolean;
  flow: string;
  handlePurchase: () => void;
}) {
  const person = getCurrentPerson();
  const price = packageData ? calcPackagePrice(packageData.products, packageData.discount).toString() : "";

  const handleClickPurchase = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    triggerClick({
      btnName: target.innerText,
      btnId: target.id,
      flow: flow,
    });
    handlePurchase();
  };

  if (loading) return <PurchaseButtonsLoading />;

  return (
    <>
      <Typography variant="label3">
        {subtitle} {price}$
      </Typography>
      <AppButtonsContent container flexDirection={"column"}>
        <AppButton variant="primary" size="medium" id={btnId} loading={paymentLoading} onClick={handleClickPurchase}>
          Start Your Purchase
        </AppButton>
        <AppButton
          variant="tertiary"
          size="medium"
          onClick={() => {
            dispatchEvent({
              eventName: IFrameEventNames.OPEN_GLOBAL_MODAL,
              status: IFrameEventStatuses.success,
              src: generateIframeSource(IFrameEventTypes.discounts, {
                packageId: packageData?.id || "",
                price: price,
                surveyId: surveyId,
                answerId: person.pid,
                btnId: btnId,
              }),
              name: IFrameEventTypes.discounts,
            });
          }}
          disabled={paymentLoading}
        >
          Have a discount code?
        </AppButton>
        <LoadingComponent loading={paymentFinished} />
      </AppButtonsContent>
    </>
  );
}

