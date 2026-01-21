export const genFormError = (errors: { [key: string]: string }): string[] => {
  return [...new Set(Object.values(errors).filter(Boolean))];
};

