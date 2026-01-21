import { Dispatch, SetStateAction } from "react";
import { addQueryParam } from "../location/addQueryParam";
import { ICustomEvent } from "../iframe/verificationDespatchEvent";
import { SetURLSearchParams } from "react-router-dom";

type HandleLoadEvent = (setIframeHeight: Dispatch<SetStateAction<number>>, setLoading: Dispatch<SetStateAction<boolean>>, elementClass: string, contentHeight: number) => void;
export const handleLoadEvent: HandleLoadEvent = (setIframeHeight, setLoading, elementClass, contentHeight) => {
  const iframeElement: HTMLIFrameElement | null = document.getElementById(elementClass) as HTMLIFrameElement | null;
  if (iframeElement && iframeElement.contentWindow) {
    iframeElement.contentWindow.document.documentElement.style.overflow = "hidden";
    const iframeContentHeight = iframeElement.contentWindow.document.body.clientHeight;
    if (iframeContentHeight > contentHeight) {
      setIframeHeight(iframeContentHeight);
      setLoading(false);
    }
  }
};

type HandleVideoEvent = (e: ICustomEvent<{ link: string }>, searchParams: URLSearchParams, setSearchParams: SetURLSearchParams) => void;
export const handleVideoEvent: HandleVideoEvent = (e: ICustomEvent<{ link: string }>, searchParams, setSearchParams) => {
  if (e.detail) {
    addQueryParam("video", `${e.detail.data?.link}`, searchParams, setSearchParams);
  }
};

