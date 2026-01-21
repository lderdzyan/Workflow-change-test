export const calcLoaderSize = (buttonSize: string) => {
  switch (buttonSize) {
    case "large":
      return "18px";
    case "medium":
      return "16px";
    case "small":
      return "12px";
    default:
      return "10px";
  }
};

