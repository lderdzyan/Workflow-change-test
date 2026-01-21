export const isSafariBrowser = () => {
  let chromeAgent = navigator.userAgent.includes("Chrome") || navigator.userAgent.includes("CriOS");
  let safariAgent = navigator.userAgent.includes("Safari");
  if (chromeAgent && safariAgent) safariAgent = false;
  return safariAgent;
};

export const isIOS = () => {
  const userAgent = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(userAgent);
};
