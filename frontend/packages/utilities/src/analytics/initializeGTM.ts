type InitializeGTM = (id?: string) => void;
export const initializeGTM: InitializeGTM = (id) => {
  if (id == null) {
    console.log("GTM ID is not provided");
    return;
  }

  if (!window.dataLayer) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });
    const gtmScript = document.createElement("script");
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
    gtmScript.async = true;
    document.head.appendChild(gtmScript);
  }
};

