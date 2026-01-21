import { Effect, pipe } from "effect";

const DEFAULT_ENDPOINT = "https://ipwho.is";

export interface LocationTimezoneData {
  id: string;
  utc: string;
  offset: number;
  current_time: string;
}

export interface LocationData {
  ip?: string;
  continent: string;
  continent_code: string;
  country: string;
  country_code: string;
  region: string;
  region_code: string;
  city: string;
  capital: string;
  latitude: number;
  longitude: number;
  timezone: LocationTimezoneData;
}

export enum LocationProperties {
  IP = "ip",
  CONTINENT = "continent",
  CONTINENT_CODE = "continent_code",
  COUNTRY = "country",
  COUNTRY_CODE = "country_code",
  REGION = "region",
  REGION_CODE = "region_code",
  CITY = "city",
  CAPITAL = "capital",
  LATITUDE = "latitude",
  LONGITUDE = "longitude",
  TIMEZONE = "timezone",
}

export interface GetUserLocationOptions {
  endpoint?: string;
  properties?: LocationProperties[];
}

export type LocationError = { _tag: "RequestError"; reason: unknown };

type GetUserLocationData = {
  (): Effect.Effect<LocationData, LocationError>;
  <Properties extends LocationProperties>(options: { endpoint?: string; properties: Properties[] }): Effect.Effect<Pick<LocationData, Properties>, LocationError, never>;
};

export const getUserLocationData: GetUserLocationData = <P extends LocationProperties>(options?: { endpoint?: string; properties?: P[] }) => {
  const endpoint = options?.endpoint ?? DEFAULT_ENDPOINT;
  const properties = options?.properties;

  return pipe(
    Effect.sync(() => buildURL(endpoint, properties)),
    Effect.flatMap((url) =>
      Effect.tryPromise({
        try: async () => {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();

          return json;
        },
        catch: (reason) => ({ _tag: "RequestError", reason }) as const,
      }),
    ),
  );
};

const buildURL = (endpoint: string, properties?: LocationProperties[]): string => {
  const url = new URL(endpoint);
  if (properties?.length) {
    url.searchParams.set("fields", properties.join(","));
  }
  return url.toString();
};

