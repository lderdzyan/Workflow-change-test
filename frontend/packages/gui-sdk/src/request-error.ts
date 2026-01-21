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
