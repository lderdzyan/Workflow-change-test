import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import { pipe } from "fp-ts/function";
import { RequestError, doGet, doPost } from "../request";
import { EmptyResponse } from "../dtos";
import APIPaths, { IPWhoISURL } from "../api-paths";
import { reportRequestError } from "../index";
import { apiPath } from "../utils";
import { IPWhoIsResponse } from "../dtos/IPWhoIsResponse";

type GuestSubscriptionOptions = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  notify?: boolean;
};

export const subscribeGuest = (options: GuestSubscriptionOptions): TE.TaskEither<RequestError, EmptyResponse> =>
  pipe(
    doPost<EmptyResponse>(APIPaths.Guest.Subscribe, {
      u: {
        firstName: options.firstName,
        lastName: options.lastName,
        country: options.country,
        notify: options.notify,
        email: options.email.trim().toLowerCase(),
      },
    }),
    TE.orLeft((error) => {
      reportRequestError(error, apiPath(APIPaths.Guest.Subscribe));
      return T.of(error);
    }),
  );

const SUPPORTED_COUNTRIES = ["US"];
export const isSupportedCountry = (): TE.TaskEither<RequestError, boolean> =>
  pipe(
    doGet<IPWhoIsResponse>(IPWhoISURL),
    TE.map((response) => SUPPORTED_COUNTRIES.includes(response.country_code)),
  );
