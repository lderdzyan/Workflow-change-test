type FindLocationBase = () => string;
export const findLocationBase: FindLocationBase = (): string => {
  if (window.location.origin.includes("app")) {
    return "https://www.meaningsphere.com";
  }
  return window.location.origin;
};

