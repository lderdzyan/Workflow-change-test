import { MicroAppsBases } from "./microAppsBases";

export const genReturnLocationString = (path?: string, base?: MicroAppsBases): string => {
  const defaultReturnLocation = window.location.pathname + window.location.hash;
  const generatedReturnLocation = `${base ?? ""}${path ?? ""}`;
  return generatedReturnLocation || defaultReturnLocation;
};

