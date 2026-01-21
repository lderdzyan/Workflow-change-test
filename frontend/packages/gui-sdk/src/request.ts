import * as TE from "fp-ts/TaskEither";
import * as F from "fp-ts/function";

import { MsoData, RequestPayload, wrapPayload } from "./dtos";
import { apiPath } from "./utils";
import { handleAuthErrorsFP } from "./auth_error_handling";
import { RequestAccess } from "./request_jwt_e";

export enum RequestMethod {
  POST = "post",
  GET = "get",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}
export const doUpload = <T extends MsoData>(url: string, body: FormData, requestAccess: RequestAccess = RequestAccess.PRIVATE): TE.TaskEither<RequestError, T> => {
  return doRequest<T>(url, { method: RequestMethod.POST, body }, requestAccess);
};

export const doPost = <T extends MsoData>(url: string, data?: any, skipWrapping?: boolean, requestAccess: RequestAccess = RequestAccess.PRIVATE): TE.TaskEither<RequestError, T> => {
  const body = JSON.stringify(skipWrapping ? data : wrapPayload(data));
  return doRequest<T>(url, { method: RequestMethod.POST, body, headers: { "Content-Type": "application/json" } }, requestAccess);
};

export const doPut = <T extends MsoData>(url: string, data?: any, skipWrapping?: boolean, requestAccess: RequestAccess = RequestAccess.PRIVATE): TE.TaskEither<RequestError, T> => {
  const body = JSON.stringify(skipWrapping ? data : wrapPayload(data));
  return doRequest<T>(url, { method: RequestMethod.PUT, body, headers: { "Content-Type": "application/json" } }, requestAccess);
};

export const doGet = <T>(url: string, requestAccess: RequestAccess = RequestAccess.PRIVATE): TE.TaskEither<RequestError, T> => {
  return doDirectRequest<T>(url, { method: RequestMethod.GET, headers: { "Content-Type": "application/json" } }, requestAccess);
};

export class NetworkError extends Error {
  public constructor(message = "") {
    super(message);
  }
}

export class ParserError extends Error {
  public constructor(message = "") {
    super(message);
  }
}

export class DataNotFoundError extends Error {
  public constructor(message = "") {
    super(message);
  }
}
export class EncryptError extends Error {
  public constructor(message = "") {
    super(message);
  }
}

export interface ServerErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}
export class ServerError extends Error {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly error: string;
  public constructor(response: ServerErrorResponse) {
    super(response.message);

    this.statusCode = response.statusCode;
    this.message = response.message;
    this.error = response.error;
  }
}

interface ErrorDetails {
  fields?: Array<{ key: string; error: string }>;
}
export interface BackendErrorResponse {
  error: ErrorDetails;
}
export class BackendError extends Error {
  public readonly error: ErrorDetails;
  constructor(response: BackendErrorResponse) {
    super();
    this.error = response.error;
  }
}

export type RequestError = NetworkError | ParserError | EncryptError | ServerError | BackendError | DataNotFoundError;

function jsonParser<T = unknown>(response: Response): Promise<T> {
  return response.json();
}

function doRequest<T extends MsoData>(url: string, init: RequestInit, requestAccess: RequestAccess): TE.TaskEither<RequestError, T> {
  return F.pipe(
    TE.tryCatch(
      async () => fetch(apiPath(url), { credentials: requestAccess === RequestAccess.PRIVATE ? "include" : "same-origin", ...init }),
      (error) => new NetworkError((error as Error).message),
    ),
    TE.chain((response) => (response.ok ? onSuccess<T>(response) : onFailure(response))),
  );
}

function doDirectRequest<T>(url: string, init: RequestInit, requestAccess: RequestAccess): TE.TaskEither<RequestError, T> {
  return F.pipe(
    TE.tryCatch(
      async () => fetch(url, { credentials: requestAccess === RequestAccess.PRIVATE ? "include" : "same-origin", ...init }),
      (error) => new NetworkError((error as Error).message),
    ),
    TE.chain((response) => {
      if (response.ok) {
        return F.pipe(
          TE.tryCatch(
            async () => await jsonParser<T>(response),
            (error) => new ParserError((error as Error).message),
          ),
          TE.chain((data) => TE.right<ParserError, T>(data)),
        );
      } else {
        return TE.left(new NetworkError());
      }
    }),
  );
}

function onSuccess<T extends MsoData>(response: Response): TE.TaskEither<RequestError, T> {
  return F.pipe(
    TE.tryCatch(
      async () => await jsonParser<RequestPayload<T>>(response),
      (error) => new ParserError((error as Error).message),
    ),
    TE.chain((data) => {
      if (data.mso != null) data.mso.rpid = data.sub;
      return TE.right<ParserError, T>(data.mso);
    }),
  );
}

function onFailure(response: Response): TE.TaskEither<RequestError, never> {
  return F.pipe(
    handleAuthErrorsFP(response),
    TE.chain(() =>
      TE.tryCatch(
        async () => jsonParser<ServerErrorResponse>(response),
        (error) => new ParserError((error as Error).message),
      ),
    ),
    TE.chainW((parsedError) => TE.left(new ServerError(parsedError))),
  );
}

