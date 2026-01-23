import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);
   
  
  return render ? (
    <>
      <Component {...pageProps} />
    </>
  ) : null;
}

