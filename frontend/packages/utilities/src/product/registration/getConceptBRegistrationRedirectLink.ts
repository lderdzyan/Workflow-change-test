import { createSearchParams } from "react-router-dom";

import { MicroAppsBases } from "./../../shared/location/microAppsBases";
import { VerificationTypes } from "./../../shared/forms/verification";
import { PATHS } from './../../paths/index';

export const getConceptBRegistrationRedirectLink = () => {
  const searchParams = createSearchParams({
    sourcePath: MicroAppsBases.BUILDER,
    type: VerificationTypes.purchase,
    returnLocation: `${MicroAppsBases.BUILDER}#${PATHS.BUILDER.PURCHASE_INTERMEDIARY}`,
  }).toString();

  return { path: `#${PATHS.AUTH.VERIFICATION}?${searchParams}`, base: MicroAppsBases.AUTH };
};

