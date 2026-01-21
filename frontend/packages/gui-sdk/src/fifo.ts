import * as O from "fp-ts/Option";
import * as F from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

import { CacheKeys, getDataFromCache, putDataToCache } from "./cache";
import { Mutex } from "async-mutex";
import { GuiError, sendGuiErrorTask } from "./sdk/publish/gui-error";
import { PageTracking, sendPageTrackingTask } from "./sdk/publish/page-tracking";
import { EventTracking, sendEventTrackingTask } from "./sdk/publish/event-dispatch";
import { RequestError } from "./request-error";

export enum Queue {
  GuiError = "guiError",
  PageTracking = "pageTracking",
  EventTracking = "eventTracking",
  InitPage = "initPage",
}
const QueueCacheKey: { [key: string]: CacheKeys } = {
  guiError: CacheKeys.GuiError,
  pageTracking: CacheKeys.PageTracking,
  eventTracking: CacheKeys.EventTracking,
};

export class FifoQueue<T> {
  private readonly mutex = new Mutex();
  private readonly queue: Queue;

  constructor(queue: Queue) {
    this.queue = queue;

    setInterval(async () => await this.handleNextItem(), 2000);
  }

  public async add(item: T) {
    await this.mutex.runExclusive(async () => {
      const queueItems = this.loadQueueFromCache();
      queueItems.push(item);
      const cackeKey = QueueCacheKey[this.queue];
      if (cackeKey != null) {
        putDataToCache(cackeKey, queueItems);
      }
    });
  }

  private async handleNextItem() {
    await this.mutex.runExclusive(() => {
      const queueItems = this.loadQueueFromCache();
      if (queueItems.length > 0) {
        const itemToHandle = queueItems[0];
        return F.pipe(
          this.getTask(itemToHandle!),
          O.match(
            () => {},
            (task) =>
              F.pipe(
                task,
                TE.map(() => {
                  queueItems.shift();
                  putDataToCache(QueueCacheKey[this.queue]!, queueItems);
                }),
              )(),
          ),
        );
      }
    });
  }

  private getTask(data: T): O.Option<TE.TaskEither<RequestError, any>> {
    switch (this.queue) {
      case Queue.GuiError:
        return O.some(sendGuiErrorTask(data as GuiError));
      case Queue.PageTracking:
        return O.some(sendPageTrackingTask(data as PageTracking));
      case Queue.EventTracking:
        return O.some(sendEventTrackingTask(data as EventTracking));
      default:
        return O.fromNullable(null);
    }
  }

  private loadQueueFromCache(): T[] {
    return F.pipe(
      getDataFromCache<T[]>(QueueCacheKey[this.queue]!),
      O.getOrElse<T[]>(() => []),
    );
  }
}

