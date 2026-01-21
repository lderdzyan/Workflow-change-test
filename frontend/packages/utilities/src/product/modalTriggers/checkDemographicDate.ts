import { getCurrentPerson } from "@repo/gui-sdk";
import * as O from "fp-ts/Option";

type CheckDemographicDate = (date: number, days: number) => boolean;
const checkDemographicDate: CheckDemographicDate = (date, days) => {
  const period = days * 24 * 60 * 60 * 1000;
  const now = new Date().getTime();
  const difference = now - date;
  return difference >= period;
};

const DEMOGRAPHIC_MODAL_REOPENING_DAYS = 180;

export const demographicModalShouldBeOpened = (): boolean => {
  const person = getCurrentPerson();
  const user = person.user;
  const lastDemographicDate = O.isSome(user) ? user.value.demographicData || 0 : 0;
  return checkDemographicDate(lastDemographicDate, DEMOGRAPHIC_MODAL_REOPENING_DAYS);
};

