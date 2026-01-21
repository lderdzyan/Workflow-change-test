type InitializeGA = (id: string) => void;
export const initializeGA: InitializeGA = (id) => {
  if (id == null) {
    console.log("GA ID is not provided");
    return;
  }

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", id);
  };
};

