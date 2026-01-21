import { describe, test, expect } from "@jest/globals";

import { getConceptBRegistrationRedirectLink } from "./../../../src/product/registration/getConceptBRegistrationRedirectLink";
import { VerificationTypes } from "../../../src/shared/forms/verification";
import { MicroAppsBases } from "../../../src/shared/location/microAppsBases";
import { PATHS } from "../../../src/paths";

describe("getConceptBRegistrationRedirectLink", () => {
  test("should generate correct redirect link", () => {
    const result = getConceptBRegistrationRedirectLink();
    expect(result.base).toBe(MicroAppsBases.AUTH);

    const url = result.path;
    expect(url.startsWith(`#${PATHS.AUTH.VERIFICATION}?`)).toBe(true);

    const query = url.split("?")[1];
    const params = new URLSearchParams(query);

    expect(params.get("sourcePath")).toBe(MicroAppsBases.BUILDER);
    expect(params.get("type")).toBe(VerificationTypes.purchase);
    expect(params.get("returnLocation")).toBe(`${MicroAppsBases.BUILDER}#${PATHS.BUILDER.PURCHASE_INTERMEDIARY}`);
  });
});

