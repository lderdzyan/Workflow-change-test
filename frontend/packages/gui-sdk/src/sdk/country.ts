import { Country } from "../models";

export async function loadAllCountries(): Promise<Country[]> {
  const response = await fetch(`${window.MS_CDN_URL}/countries.json`);
  return (await response.json()) as Country[];
}

export async function loadSupportedCountries(): Promise<Country[]> {
  const response = await fetch(`${window.MS_CDN_URL}/msCountries.json`);
  return (await response.json()) as Country[];
}

export async function loadNotAllowedCountries(): Promise<Country[]> {
  const response = await fetch(`${window.MS_CDN_URL}/notAllowedCountries.json`);
  return (await response.json()) as Country[];
}
