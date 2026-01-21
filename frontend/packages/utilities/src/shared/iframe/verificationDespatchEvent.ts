import { IFrameEventActions, IFrameEventTypes, IFrameEventStatuses } from "./iframeEventEnums";

export interface ICustomEvent<T> extends Event {
  detail?: {
    status: IFrameEventStatuses;
    action?: IFrameEventActions;
    src?: string; //TODO required
    name?: IFrameEventTypes; //TODO required
    data?: T;
  };
}

type DispatchEvent = ({
  eventName,
  status,
  action,
  data,
  element,
  src,
  name,
}: {
  eventName: string;
  status: IFrameEventStatuses;
  action?: IFrameEventActions;
  data?: any;
  element?: HTMLIFrameElement;
  src?: string;
  name?: IFrameEventTypes;
  toElementDocument?: boolean;
  toTop?: boolean;
}) => void;
export const dispatchEvent: DispatchEvent = ({ eventName, status, action, data, element, src, name, toTop }) => {
  const event = new CustomEvent(eventName, {
    detail: {
      status: status,
      action,
      data,
      src,
      name,
    },
  });

  if (element) {
    element.contentWindow?.document.dispatchEvent(event);
  } else {
    if (toTop) {
      window.top?.document.dispatchEvent(event);
    } else {
      window.parent.document.dispatchEvent(event);
    }
  }
};

