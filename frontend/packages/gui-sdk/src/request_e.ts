import { Effect, pipe } from "effect";

import { MsoData, RequestPayload, wrapPayload } from "./dtos";
import { apiPath } from "./utils";
import { RequestAccess } from "./request_jwt_e";
import { handleAuthErrorsE } from "./auth_error_handling";
import { NetworkError, ParserError, RequestError, ServerError, ServerErrorResponse } from "./request-error";

export enum RequestMethod {
  POST = "post",
  GET = "get",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

export const doUploadE = <T extends MsoData>(url: string, body: FormData, requestAccess: RequestAccess = RequestAccess.PRIVATE): Effect.Effect<T, RequestError> => {
  return doRequestE<T>(url, { method: RequestMethod.POST, body }, requestAccess);
};

export const doPostE = <T extends MsoData>(url: string, data?: any, skipWrapping?: boolean, requestAccess: RequestAccess = RequestAccess.PRIVATE): Effect.Effect<T, RequestError> => {
  const body = JSON.stringify(skipWrapping ? data : wrapPayload(data));
  return doRequestE<T>(url, { method: RequestMethod.POST, body, headers: { "Content-Type": "application/json" } }, requestAccess);
};

export const doPutE = <T extends MsoData>(url: string, data?: any, skipWrapping?: boolean, requestAccess: RequestAccess = RequestAccess.PRIVATE): Effect.Effect<T, RequestError> => {
  const body = JSON.stringify(skipWrapping ? data : wrapPayload(data));
  return doRequestE<T>(url, { method: RequestMethod.PUT, body, headers: { "Content-Type": "application/json" } }, requestAccess);
};

export const doGetE = <T>(url: string, requestAccess: RequestAccess = RequestAccess.PRIVATE): Effect.Effect<T, RequestError> => {
  return doDirectRequestE<T>(url, { method: RequestMethod.GET, headers: { "Content-Type": "application/json" } }, requestAccess);
};

const jsonParserE = <T = unknown>(response: Response): Effect.Effect<T, ParserError> =>
  Effect.tryPromise({
    try: () => response.json() as Promise<T>,
    catch: (e) => new ParserError((e as Error).message),
  });

function doRequestE<T extends MsoData>(url: string, init: RequestInit, requestAccess: RequestAccess): Effect.Effect<T, RequestError> {
  return pipe(
    Effect.tryPromise({
      try: () =>
        fetch(apiPath(url), {
          credentials: requestAccess === RequestAccess.PRIVATE ? "include" : "same-origin",
          ...init,
        }),
      catch: (e) => new NetworkError((e as Error).message),
    }),
    Effect.flatMap((response) => (response.ok ? onSuccessE<T>(response) : onFailureE(response))),
  );
}

function doDirectRequestE<T>(url: string, init: RequestInit, requestAccess: RequestAccess): Effect.Effect<T, RequestError> {
  return pipe(
    Effect.tryPromise({
      try: () =>
        fetch(url, {
          credentials: requestAccess === RequestAccess.PRIVATE ? "include" : "same-origin",
          ...init,
        }),
      catch: (e) => new NetworkError((e as Error).message),
    }),
    Effect.flatMap((response) => {
      if (!response.ok) {
        return Effect.fail(new NetworkError());
      }
      return jsonParserE<T>(response);
    }),
  );
}

function onSuccessE<T extends MsoData>(response: Response): Effect.Effect<T, RequestError> {
  return pipe(
    jsonParserE<RequestPayload<T>>(response),
    Effect.map((data) => {
      if (data.mso != null) data.mso.rpid = data.sub;
      return data.mso;
    }),
  );
}

function onFailureE(response: Response): Effect.Effect<never, RequestError> {
  return pipe(
    handleAuthErrorsE(response),
    Effect.flatMap(() =>
      Effect.tryPromise({
        try: () => response.json() as Promise<ServerErrorResponse>,
        catch: (e) => new ParserError((e as Error).message),
      }),
    ),
    Effect.flatMap((parsed) => Effect.fail(new ServerError(parsed))),
  );
}

