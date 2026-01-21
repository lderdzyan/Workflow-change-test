import * as TE from "fp-ts/TaskEither";
import { RequestError, doPost } from "../request";
import { pipe } from "fp-ts/function";
import APIPaths from "../api-paths";
import { Application } from "../models";
import { ApplicationResponse } from "../dtos";

export const getApplicationByPath = (path?: string): TE.TaskEither<RequestError, Application> =>
  pipe(
    doPost<ApplicationResponse>(APIPaths.Application.ByPath, { path: path || window.MS_APP_PATH }),
    TE.map((response) => response.application),
  );

