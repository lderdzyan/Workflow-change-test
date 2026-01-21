export function apiPath(path: string): string {
  const locationProtocol = window.location.hostname.includes("localhost") ? "https:" : window.location.protocol;
  return locationProtocol + "//" + window.MS_API_SERVICES + path;
}

