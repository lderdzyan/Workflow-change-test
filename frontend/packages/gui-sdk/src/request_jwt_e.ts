import { Effect, pipe } from "effect";
import * as O from "effect/Option";
import { getAccessToken } from "./sdk/user";
import { RequestMethod } from "./request";
import { apiPath } from "./utils";
import { generateMSToken, jsonParser, JWTEncryptData, key } from "./request_jwt";
import { handleAuthErrorsE } from "./auth_error_handling";
import { BackendError, EncryptError, NetworkError, ParserError, RequestError } from "./request-error";

export enum RequestAccess {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export const doPostE = <T>(url: string, data: any = {}, requestAccess: RequestAccess = RequestAccess.PRIVATE): Effect.Effect<O.Option<T>, RequestError, never> =>
  pipe(
    encryptJsonE(key, data),
    Effect.flatMap((encryptedJson) =>
      pipe(
        getHeadersE(key),
        Effect.flatMap((headers) => doRequestE<T>(url, { method: RequestMethod.POST, body: O.isSome(encryptedJson) ? JSON.stringify(encryptedJson.value) : null, headers }, requestAccess)),
      ),
    ),
  );

export const doGetE = <T>(url: string, requestAccess: RequestAccess = RequestAccess.PRIVATE): Effect.Effect<T, RequestError, never> =>
  doDirectRequestE<T>(
    url,
    {
      method: RequestMethod.GET,
    },
    requestAccess,
  );

const doRequestE = <T>(url: string, init: RequestInit, requestAccess: RequestAccess): Effect.Effect<O.Option<T>, RequestError, never> =>
  pipe(
    Effect.tryPromise({
      try: () => fetch(apiPath(url), { credentials: requestAccess === RequestAccess.PRIVATE ? "include" : "same-origin", ...init }),
      catch: (error) => new NetworkError((error as Error).message),
    }),
    Effect.flatMap((response) => (response.ok ? onSuccessE<T>(response) : onFailureE(response))),
  );

const doDirectRequestE = <T>(url: string, init: RequestInit, requestAccess: RequestAccess): Effect.Effect<T, RequestError, never> => {
  const credentials: RequestCredentials = requestAccess === RequestAccess.PRIVATE ? "include" : "same-origin";

  return pipe(
    Effect.tryPromise({
      try: () =>
        fetch(url, {
          credentials,
          ...init,
        }),
      catch: (error) => new NetworkError((error as Error)?.message),
    }),
    Effect.flatMap((response) => {
      if (response.ok) {
        return Effect.tryPromise({
          try: () => jsonParser<T>(response),
          catch: (error) => new ParserError((error as Error)?.message),
        });
      } else {
        return Effect.fail<RequestError>(new NetworkError());
      }
    }),
  );
};

const onSuccessE = <T>(response: Response): Effect.Effect<O.Option<T>, RequestError, never> =>
  pipe(
    Effect.tryPromise({
      try: () => jsonParser<JWTEncryptData>(response),
      catch: (error) => new ParserError((error as Error).message),
    }),
    Effect.flatMap((encryptedResponse) => decryptJsonE<T>(key, encryptedResponse)),
  );

const onFailureE = (response: Response): Effect.Effect<never, RequestError, never> =>
  pipe(
    handleAuthErrorsE(response),
    Effect.flatMap(() =>
      Effect.tryPromise({
        try: () => jsonParser<JWTEncryptData>(response),
        catch: (error) => new ParserError((error as Error).message),
      }),
    ),
    Effect.flatMap((encryptedResponse) => decryptJsonE<any>(key, encryptedResponse)),
    Effect.flatMap((parsedError) => (O.isSome(parsedError) ? Effect.fail(new BackendError(parsedError.value)) : Effect.fail(new ParserError()))),
  );

const getHeadersE = (key: string, isPrivate: boolean = true): Effect.Effect<HeadersInit, EncryptError, never> => {
  const headers: HeadersInit = { "Content-Type": "application/json" };

  if (isPrivate) {
    headers["Authorization"] = `Bearer ${getAccessToken()}`;
  }

  return pipe(
    encryptJsonE(key, generateMSToken()),
    Effect.map((encryptedMSToken) => {
      if (O.isSome(encryptedMSToken)) {
        headers["x-ms-token"] = JSON.stringify(encryptedMSToken.value);
      }
      return headers;
    }),
  );
};

const decryptJsonE = <T>(key: string, encryptedData?: JWTEncryptData): Effect.Effect<O.Option<T>, EncryptError, never> => {
  if (encryptedData == null) return Effect.succeed(O.none());

  const decoder = new TextDecoder();
  const iv = Uint8Array.from(atob(encryptedData.iv), (c) => c.charCodeAt(0));
  const encrypted = Uint8Array.from(atob(encryptedData.data), (c) => c.charCodeAt(0));

  return pipe(
    Effect.tryPromise({
      try: () => crypto.subtle.importKey("raw", new TextEncoder().encode(key), { name: "AES-CBC" }, false, ["decrypt"]),
      catch: (reason) => new EncryptError((reason as Error).message),
    }),
    Effect.flatMap((cryptoKey) =>
      Effect.tryPromise({
        try: () => crypto.subtle.decrypt({ name: "AES-CBC", iv }, cryptoKey, encrypted),
        catch: (reason) => new EncryptError((reason as Error).message),
      }),
    ),
    Effect.map((decrypted) => {
      const obj = JSON.parse(decoder.decode(decrypted));
      if (obj == null) {
        return O.none();
      } else {
        return O.some(obj as T);
      }
    }),
  );
};

const encryptJsonE = (key: string, jsonData?: any): Effect.Effect<O.Option<JWTEncryptData>, EncryptError, never> => {
  if (jsonData == null) return Effect.succeed(O.none());

  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(16));

  return pipe(
    Effect.tryPromise({
      try: () => crypto.subtle.importKey("raw", encoder.encode(key), { name: "AES-CBC" }, false, ["encrypt"]),
      catch: (reason) => new EncryptError((reason as Error).message),
    }),
    Effect.flatMap((cryptoKey) =>
      Effect.tryPromise({
        try: () => crypto.subtle.encrypt({ name: "AES-CBC", iv }, cryptoKey, encoder.encode(JSON.stringify(jsonData))),
        catch: (reason) => new EncryptError((reason as Error).message),
      }),
    ),
    Effect.map((encrypted) => O.some({ iv: btoa(String.fromCharCode(...iv)), data: btoa(String.fromCharCode(...new Uint8Array(encrypted))) })),
  );
};

