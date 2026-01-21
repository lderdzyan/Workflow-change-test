import { isSome } from "fp-ts/Option";
import { CacheKeys, clear, getDataFromCache, putDataToCache } from "./cache";
import { FifoQueue, Queue } from "./fifo";
import { GuiError } from "./sdk/publish/gui-error";
import { PageTracking } from "./sdk/publish/page-tracking";
import { EventTracking } from "./sdk/publish/event-dispatch";

const Version = 1;
export let guiErrorQueue: FifoQueue<GuiError>;
export let pageTrackingQueue: FifoQueue<PageTracking>;
export let eventTrackingQueue: FifoQueue<EventTracking>;
export function init() {
  if (guiErrorQueue == null) guiErrorQueue = new FifoQueue<GuiError>(Queue.GuiError);
  if (pageTrackingQueue == null) pageTrackingQueue = new FifoQueue<PageTracking>(Queue.PageTracking);
  if (eventTrackingQueue == null) eventTrackingQueue = new FifoQueue<EventTracking>(Queue.EventTracking);

  // const version = getDataFromCache<number>(CacheKeys.Version);
  // if (isSome(version)) {
  //   if (version.value !== Version) {
  //     clear();
  //   }
  // } else {
  //   clear();
  // }
  // putDataToCache(CacheKeys.Version, Version);
}
