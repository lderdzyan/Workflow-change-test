import { MutableRefObject } from "react";

export const fixIframes = (timeoutRef: MutableRefObject<ReturnType<typeof setTimeout> | undefined>) => {
  const iframes = document.getElementsByTagName("iframe") as HTMLCollectionOf<HTMLIFrameElement>;
  for (const iframe of iframes) {
    if (iframe && iframe.id === "insights_iframe" && iframe.contentWindow && iframe.contentWindow.document.body) {
      iframe.style.height = `${iframe.contentWindow.document.body.clientHeight}px`;
    }
  }

  timeoutRef.current = setTimeout(() => fixIframes(timeoutRef), 500);
};
