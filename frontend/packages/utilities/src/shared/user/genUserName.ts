type GenUserName = (firstName: string | undefined, lastName: string | undefined) => string;
export const genUserName: GenUserName = (firstName, lastName) =>
  !firstName && !lastName ? "" : firstName && lastName ? `${firstName + " " + lastName}` : ((firstName || "") + " " + (lastName || "")).trim();

