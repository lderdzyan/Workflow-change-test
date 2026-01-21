import { loadNotAllowedCountries } from "@repo/gui-sdk";

type IsCountryAvailable = (countryCode: string) => Promise<boolean>;
export const isCountryAvailable: IsCountryAvailable = async (countryCode) => {
  const notAllowedCountries = await loadNotAllowedCountries();
  return !Boolean(notAllowedCountries.find((notAllowed) => notAllowed.cca2 === countryCode));
};
