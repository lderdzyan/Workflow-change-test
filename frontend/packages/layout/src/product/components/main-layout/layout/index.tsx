import { useEffect, useState } from "react";
import Head from "next/head";
import { init, getCurrentPerson, resetPerson, setSignOutAction } from "@repo/gui-sdk";
import { getImageSrc, redirectToExternalLink, MicroAppsBases, BaseColors, PATHS, buildDefaultSignOutAction } from "@repo/utilities";
import LayoutBody from "./LayoutBody";

import "../../../styles/globals.css";

export enum LayoutTypes {
  iframe = "iframe",
  main = "main",
}

export function LayoutWrapper({ children, layoutType = LayoutTypes.main, baseColors }: { children: any; layoutType?: LayoutTypes; baseColors?: BaseColors }) {
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    init();
    setSignOutAction(buildDefaultSignOutAction());
    const person = getCurrentPerson();
    if (!person.credentials) {
      resetPerson();
      redirectToExternalLink(`#${PATHS.AUTH.SIGN_IN}`, MicroAppsBases.AUTH);
    }
    setRender(true);
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href={getImageSrc("favicon.ico")} />
      </Head>
      {render && (
        <LayoutBody layoutType={layoutType} baseColors={baseColors}>
          {children}
        </LayoutBody>
      )}
    </>
  );
}

