import * as TE from "fp-ts/TaskEither";
import * as O from "fp-ts/Option";
import { RequestMethod } from "./request";
import { apiPath } from "./utils";
import { pipe } from "fp-ts/lib/function";
import { getAccessToken, getCurrentPerson } from "./sdk/user";
import { createId } from "@paralleldrive/cuid2";
import { handleAuthErrorsFP } from "./auth_error_handling";
import { RequestAccess } from "./request_jwt_e";
import { BackendError, EncryptError, NetworkError, ParserError, RequestError } from "./request-error";

export type JWTEncryptData = {
  iv: string;
  data: string;
};

// TODO: need to change
export const key = "d6be95e07c28df770519ca910b037377";

export const doGet = <T>(url: string, requestAccess: RequestAccess = RequestAccess.PRIVATE): TE.TaskEither<RequestError, O.Option<T>> =>
  pipe(
    getHeaders(key),
    TE.chain((headers) => doRequest<T>(url, { method: RequestMethod.GET, headers }, requestAccess)),
  );

export const doPost = <T>(url: string, data?: any, requestAccess: RequestAccess = RequestAccess.PRIVATE): TE.TaskEither<RequestError, O.Option<T>> =>
  pipe(
    encryptJson(key, data),
    TE.chain((encryptedJson) =>
      pipe(
        getHeaders(key),
        TE.chain((headers) => doRequest<T>(url, { method: RequestMethod.POST, body: O.isSome(encryptedJson) ? JSON.stringify(encryptedJson.value) : null, headers }, requestAccess)),
      ),
    ),
  );

export const doPatch = <T>(url: string, data?: any, requestAccess: RequestAccess = RequestAccess.PRIVATE): TE.TaskEither<RequestError, O.Option<T>> =>
  pipe(
    encryptJson(key, data),
    TE.chain((encryptedJson) =>
      pipe(
        getHeaders(key),
        TE.chain((headers) => doRequest<T>(url, { method: RequestMethod.PATCH, body: O.isSome(encryptedJson) ? JSON.stringify(encryptedJson.value) : null, headers }, requestAccess)),
      ),
    ),
  );

const doRequest = <T>(url: string, init: RequestInit, requestAccess: RequestAccess): TE.TaskEither<RequestError, O.Option<T>> =>
  pipe(
    TE.tryCatch(
      () => fetch(apiPath(url), { credentials: requestAccess === RequestAccess.PRIVATE ? "include" : "same-origin", ...init }),
      (error) => new NetworkError((error as Error).message),
    ),
    TE.chain((response) => (response.ok ? onSuccess<T>(response) : onFailure(response))),
  );

export const jsonParser = <T = unknown>(response: Response): Promise<T> => response.json();

const onSuccess = <T>(response: Response): TE.TaskEither<RequestError, O.Option<T>> =>
  pipe(
    TE.tryCatch(
      async () => await jsonParser<JWTEncryptData>(response),
      (error) => new ParserError((error as Error).message),
    ),
    TE.chain((encryptedResponse) => decryptJson<T>(key, encryptedResponse)),
  );

const onFailure = (response: Response): TE.TaskEither<RequestError, never> =>
  pipe(
    handleAuthErrorsFP(response),
    TE.chain(() =>
      TE.tryCatch(
        async () => jsonParser<JWTEncryptData>(response),
        (error) => new ParserError((error as Error).message),
      ),
    ),
    TE.chain((encryptedResponse) => decryptJson<any>(key, encryptedResponse)),
    TE.chain((parsedError) => (O.isSome(parsedError) ? TE.left<RequestError>(new BackendError(parsedError.value)) : TE.left<RequestError>(new ParserError()))),
  );

const getHeaders = (key: string, isPrivate: boolean = true): TE.TaskEither<EncryptError, HeadersInit> => {
  const headers: HeadersInit = { "Content-Type": "application/json" };

  if (isPrivate) {
    headers["Authorization"] = `Bearer ${getAccessToken()}`;
  }

  return pipe(
    encryptJson(key, generateMSToken()),
    TE.map((encryptedMSToken) => {
      if (O.isSome(encryptedMSToken)) {
        headers["x-ms-token"] = JSON.stringify(encryptedMSToken.value);
      }

      return headers;
    }),
  );
};

export const generateMSToken = () => {
  const person = getCurrentPerson();
  const now = Date.now();
  return {
    aud: person.pid,
    jti: createId(),
    exp: now + 10 * 60 * 1000,
    nbf: now,
    iat: now,
    aut: false,
    sub: person.pid,
  };
};

const decryptJson = <T>(key: string, encryptedData?: JWTEncryptData): TE.TaskEither<EncryptError, O.Option<T>> => {
  if (encryptedData == null) return TE.right(O.none);

  const decoder = new TextDecoder();
  const iv = Uint8Array.from(atob(encryptedData.iv), (c) => c.charCodeAt(0));
  const encrypted = Uint8Array.from(atob(encryptedData.data), (c) => c.charCodeAt(0));

  return pipe(
    TE.tryCatch(
      () => crypto.subtle.importKey("raw", new TextEncoder().encode(key), { name: "AES-CBC" }, false, ["decrypt"]),
      (reason) => new EncryptError((reason as Error).message),
    ),
    TE.chain((cryptoKey) =>
      pipe(
        TE.tryCatch(
          () => crypto.subtle.decrypt({ name: "AES-CBC", iv }, cryptoKey, encrypted),
          (reason) => new EncryptError((reason as Error).message),
        ),
      ),
    ),
    TE.map((decrypted) => {
      const obj = JSON.parse(decoder.decode(decrypted));
      if (obj == null) {
        return O.none;
      } else {
        return O.some(obj as T);
      }
    }),
  );
};

const encryptJson = (key: string, jsonData?: any): TE.TaskEither<EncryptError, O.Option<JWTEncryptData>> => {
  if (jsonData == null) return TE.right(O.none);

  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(16));

  return pipe(
    TE.tryCatch(
      () => crypto.subtle.importKey("raw", encoder.encode(key), { name: "AES-CBC" }, false, ["encrypt"]),
      (reason) => new EncryptError((reason as Error).message),
    ),
    TE.chain((cryptoKey) =>
      pipe(
        TE.tryCatch(
          () => crypto.subtle.encrypt({ name: "AES-CBC", iv }, cryptoKey, encoder.encode(JSON.stringify(jsonData))),
          (reason) => new EncryptError((reason as Error).message),
        ),
      ),
    ),
    TE.map((encrypted) => O.some({ iv: btoa(String.fromCharCode(...iv)), data: btoa(String.fromCharCode(...new Uint8Array(encrypted))) })),
  );
};

