import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { buildTheme } from "../../../styles/theme";
import * as O from "fp-ts/Option";
import {
  useLoading,
  triggerPageView,
  allowPageViewTrigger,
  checkAndReturnCountryReviewModalData,
  checkAndReturnMFANotificationModalData,
  ModalData,
  checkAndReturnDiscussionsModalData,
  MicroAppsBases,
  BaseColors,
  isFullyLoggedIn,
  performOnboardingRedirection,
} from "@repo/utilities";
import { getCurrentPerson, trackPage, getAndSetUserData } from "@repo/gui-sdk";
import { LoadingComponent } from "../../../../shared/LoadingComponent";
import IFrameWrapper from "../global-modal/IFrameWrapper";
import ErrorBoundary from "../../../../shared/errorBoundary";
import { fixIframes } from "../helpers/fixIframes";
import { initializeAnalytics } from "../helpers/initializeAnalytics";
import { isAppListMissing } from "../helpers/appListIsMissing";
import { LayoutTypes } from ".";
import { resolveOnboardingRedirect } from "../helpers/resolveOnboardingRedirect";

export default function LayoutBody({ children, layoutType, baseColors }: { children: any; layoutType: LayoutTypes; baseColors?: BaseColors }) {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useMemo(() => buildTheme(baseColors), [baseColors]);
  const isLoading = useLoading(location.pathname);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [render, setRender] = useState<boolean>(false);
  const [modalsQueue, setModalsQueue] = useState<Array<ModalData>>([]);
  const [currentModalName, setCurrentModalName] = useState<string>("");

  useEffect(() => {
    initializeAnalytics();

    if (layoutType == LayoutTypes.main) {
      (async () => {
        const person = getCurrentPerson();
        if (isFullyLoggedIn()) {
          if (isAppListMissing(person) && O.isSome(person.user)) {
            await getAndSetUserData({ identity: person.user.value.identity });
          }
          const queue: ModalData[] = [];
          const countryModalData = checkAndReturnCountryReviewModalData();
          countryModalData && queue.push(countryModalData);
          const mfaModalData = checkAndReturnMFANotificationModalData();
          mfaModalData && queue.push(mfaModalData);
          const isMWIApp = window.location.pathname === MicroAppsBases.MWI;
          const discussionModalData = await checkAndReturnDiscussionsModalData(navigate, isMWIApp);
          discussionModalData && queue.push(discussionModalData);
          setModalsQueue(queue);
        } else if (O.isSome(person.user) && !person.user.value.isPasswordSet) {
          const result = await resolveOnboardingRedirect();
          if (O.isSome(result)) {
            performOnboardingRedirection(result.value, navigate);
          } else {
            setRender(true);
          }
        }
        setRender(true);
      })();
    } else {
      setRender(true);
    }

    timeoutRef.current = setTimeout(() => fixIframes(timeoutRef), 500);
    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    const person = getCurrentPerson();
    if (isFullyLoggedIn() || layoutType !== LayoutTypes.main || !O.isSome(person.user) || person.user.value.isPasswordSet) return;
    (async () => {
      const result = await resolveOnboardingRedirect();
      if (O.isSome(result)) {
        performOnboardingRedirection(result.value, navigate);
      } else {
        setRender(true);
      }
    })();
  }, [location]);

  useEffect(() => {
    if (!currentModalName && modalsQueue.length) {
      setCurrentModalName(modalsQueue[0]!.modalName);
      modalsQueue[0]!.trigger();
      setModalsQueue((prevState) => prevState.slice(1));
    }
  }, [currentModalName, modalsQueue.length]);

  useEffect(() => {
    trackPage({
      p: {
        uri: decodeURIComponent(window.location.href),
      },
    });

    if (allowPageViewTrigger(location.pathname, window?.MS_APP_PATH)) triggerPageView();
  }, [location]);

  return (
    <ErrorBoundary>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        {render && children}
        <LoadingComponent loading={!render || isLoading} />
        <IFrameWrapper setCurrentModalName={setCurrentModalName} />
      </CssVarsProvider>
    </ErrorBoundary>
  );
}

