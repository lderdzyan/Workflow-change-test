import { Language } from "../models";

export async function loadLanguages(): Promise<Language[]> {
  const response = await fetch(`${window.MS_CDN_URL}/languages.json`);
  return (await response.json()) as Language[];
}


