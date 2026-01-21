import { getCurrentPerson, getDiscussionsInfo } from "@repo/gui-sdk";
import * as O from "fp-ts/Option";
import { isRight } from "fp-ts/lib/Either";
import { NavigateFunction } from "react-router-dom";
import { PATHS } from "../../paths";
import { MicroAppsBases, redirectToExternalLink } from "../../shared/location";
import { IFrameEventNames, IFrameEventStatuses, IFrameEventTypes } from "../../shared/iframe/iframeEventEnums";
import { generateIframeSource } from "../../shared/iframe/generateIframeSource";
import { dispatchEvent } from "../../shared/iframe/verificationDespatchEvent";
import { isFullyLoggedIn } from "../../shared/user/isFullyLoggedIn";
import { checkCountryUpdatedDate } from "./checkCountryUpdatedDate";
import { SurveyPageTabs } from "../survey/surveyPageTabs";

export interface ModalData {
  modalName: string;
  trigger: () => void;
}

export const checkAndReturnCountryReviewModalData = (): ModalData | null => {
  const person = getCurrentPerson();
  if (isFullyLoggedIn()) {
    if ((O.isSome(person.user) && !person.user.value.countrySetDate) || (O.isSome(person.user) && checkCountryUpdatedDate(365, person.user.value.countrySetDate))) {
      return {
        modalName: IFrameEventTypes.countryOfResidence,
        trigger: () => {
          dispatchEvent({
            eventName: IFrameEventNames.OPEN_GLOBAL_MODAL,
            status: IFrameEventStatuses.success,
            src: generateIframeSource(IFrameEventTypes.countryOfResidence, {}),
            name: IFrameEventTypes.countryOfResidence,
          });
        },
      };
    }
    return null;
  }
  return null;
};

export const checkAndReturnMFANotificationModalData = (): ModalData | null => {
  const person = getCurrentPerson();
  if (isFullyLoggedIn()) {
    if (O.isSome(person.user) && person.user.value.mfaOptout && !person.user.value.mfaOptoutSetDate) {
      return {
        modalName: IFrameEventTypes.notifyMFA,
        trigger: () => {
          dispatchEvent({
            eventName: IFrameEventNames.OPEN_GLOBAL_MODAL,
            status: IFrameEventStatuses.success,
            src: generateIframeSource(IFrameEventTypes.notifyMFA, {}),
            name: IFrameEventTypes.notifyMFA,
          });
        },
      };
    }
    return null;
  }
  return null;
};

export const checkAndReturnDiscussionsModalData = async (navigate: NavigateFunction, isSameMicroApp: boolean): Promise<ModalData | null> => {
  const response = await getDiscussionsInfo()();
  if (isRight(response)) {
    const incompleteDiscussionId = response.right.incompleteDiscussions[0];
    const canceledDiscussionId = response.right.canceledDiscussions[0];
    if (incompleteDiscussionId) {
      return {
        modalName: IFrameEventTypes.chooseFocusAreas,
        trigger: () => {
          dispatchEvent({
            eventName: IFrameEventNames.OPEN_GLOBAL_MODAL,
            status: IFrameEventStatuses.success,
            src: generateIframeSource(IFrameEventTypes.chooseFocusAreas, { answerId: incompleteDiscussionId, step: "reminder", sentEmail: "true" }),
            name: IFrameEventTypes.chooseFocusAreas,
          });
          if (isSameMicroApp) {
            navigate(`${PATHS.MWI.SURVEY}?surveyId=${incompleteDiscussionId}&tab=${SurveyPageTabs.GUIDED_DISCUSSION}`);
          } else {
            redirectToExternalLink(`#${PATHS.MWI.SURVEY}?surveyId=${incompleteDiscussionId}&tab=${SurveyPageTabs.GUIDED_DISCUSSION}`, MicroAppsBases.MWI);
          }
        },
      };
    } else if (canceledDiscussionId) {
      return {
        modalName: IFrameEventTypes.selectNewDateTime,
        trigger: () => {
          dispatchEvent({
            eventName: IFrameEventNames.OPEN_GLOBAL_MODAL,
            status: IFrameEventStatuses.success,
            src: generateIframeSource(IFrameEventTypes.selectNewDateTime, { answerId: canceledDiscussionId }),
            name: IFrameEventTypes.chooseFocusAreas,
          });
          if (isSameMicroApp) {
            navigate(`${PATHS.MWI.SURVEY}?surveyId=${canceledDiscussionId}&tab=${SurveyPageTabs.GUIDED_DISCUSSION}`);
          } else {
            redirectToExternalLink(`#${PATHS.MWI.SURVEY}?surveyId=${canceledDiscussionId}&tab=${SurveyPageTabs.GUIDED_DISCUSSION}`, MicroAppsBases.MWI);
          }
        },
      };
    } else {
      return null;
    }
  } else {
    return null;
  }
};

