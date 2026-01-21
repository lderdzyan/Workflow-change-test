import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  IFrameEventTypes,
  ICustomEvent,
  IFrameEventStatuses,
  dispatchEvent,
  IFrameEventNames,
  ITaxamoIFrameEventNames,
  ICalendlyIFrameEventNames,
  IFocusAreasIFrameEventNames,
} from "@repo/utilities";

export default function useIFrameActions({
  iframeName,
  setOpenModal,
  setCurrentModalName,
}: {
  iframeName: IFrameEventTypes;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setCurrentModalName: Dispatch<SetStateAction<string>>;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  function handleLoaded() {
    setLoading(false);
  }

  function handleCloseModal(e: ICustomEvent<{ scheduleType?: string; scheduleStatus?: IFrameEventStatuses }>) {
    switch (iframeName) {
      case IFrameEventTypes.taxamoPayment: {
        if (e.detail?.status === IFrameEventStatuses.success) {
          dispatchEvent({ eventName: ITaxamoIFrameEventNames.TAXAMO_PAYMENT_FINISHED, status: IFrameEventStatuses.success });
        }
        break;
      }
      case IFrameEventTypes.discounts: {
        if (e.detail?.status === IFrameEventStatuses.success) {
          dispatchEvent({ eventName: ITaxamoIFrameEventNames.DISCOUNTS_PAYMENT_SUCCEED, status: IFrameEventStatuses.success });
        }
        break;
      }
      case IFrameEventTypes.calendlySheduling:
        {
          const disucssionIframe: HTMLIFrameElement | null = document.getElementById("discussion_iframe") as HTMLIFrameElement | null;
          if (disucssionIframe && e.detail && e.detail.data?.scheduleType) {
            dispatchEvent({
              eventName: ICalendlyIFrameEventNames.CALENDLY_ACTION_FINISHED,
              status: e.detail.status,
              data: { scheduleType: e.detail.data?.scheduleType },
              element: disucssionIframe,
            });
          }
        }
        break;
      case IFrameEventTypes.chooseFocusAreas:
        {
          const disucssionIframe: HTMLIFrameElement | null = document.getElementById("discussion_iframe") as HTMLIFrameElement | null;
          if (disucssionIframe && e.detail) {
            dispatchEvent({
              eventName: IFocusAreasIFrameEventNames.FOCUS_AREAS_CHOOSE_FINISHED,
              status: e.detail.status,
              element: disucssionIframe,
            });
          }
        }
        break;
      //TODO continue
    }
    setOpenModal(false);
    setCurrentModalName("");
  }

  useEffect(() => {
    window.document.addEventListener(IFrameEventNames.GLOBAL_MODAL_LOADED, handleLoaded);
    window.document.addEventListener(IFrameEventNames.CLOSE_GLOBAL_MODAL, handleCloseModal);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "auto";
      window.document.removeEventListener(IFrameEventNames.CLOSE_GLOBAL_MODAL, handleCloseModal);
      window.document.removeEventListener(IFrameEventNames.GLOBAL_MODAL_LOADED, handleLoaded);
    };
  }, []);

  return { loading };
}

