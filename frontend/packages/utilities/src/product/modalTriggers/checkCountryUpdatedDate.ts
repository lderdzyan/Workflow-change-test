type CheckCountryUpdatedDate = (days: number, date?: number) => boolean;
export const checkCountryUpdatedDate: CheckCountryUpdatedDate = (days, date) => {
  if (days === 0) return true;
  if (date) {
    const period = days * 24 * 60 * 60 * 1000;
    const now = new Date().getTime();
    const difference = now - date;
    return difference >= period;
  } else {
    return true;
  }
};
