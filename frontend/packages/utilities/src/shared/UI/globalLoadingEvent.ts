import { useState, useEffect } from "react";
import { PATHS } from "../../paths";

const GlobalLoadingListenerName: string = "showGlobalLoading";

type TriggerLoading = (isLoading: boolean) => void;
export const triggerLoading: TriggerLoading = (isLoading) => {
  const event = new CustomEvent(GlobalLoadingListenerName, { detail: isLoading });
  window.dispatchEvent(event);
};

const pathsWithInitialLoading: string[] = [PATHS.MWI.SURVEY, PATHS.GUIDES.DISCUSSION];

export const useLoading = (pathname: string) => {
  const [isLoading, setIsLoading] = useState(pathsWithInitialLoading.includes(pathname));

  useEffect(() => {
    const handleToggleLoading = (event: CustomEvent<boolean>) => {
      setIsLoading(event.detail);
    };

    window.addEventListener(GlobalLoadingListenerName, handleToggleLoading as EventListener);

    return () => {
      window.removeEventListener(GlobalLoadingListenerName, handleToggleLoading as EventListener);
    };
  }, []);

  return isLoading;
};

