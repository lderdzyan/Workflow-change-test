import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import { Layout, LayoutTypes } from "@repo/layout/product";
import { appBaseColors, isPrimaryApp, makeBaseFromAppPath, MicroAppsBases } from "@repo/utilities";
import { routes } from "@/routes";

const GlobalLayout = () => {
  const isParentPrimaryApp = isPrimaryApp(makeBaseFromAppPath(window.parent.MS_APP_PATH));
  const sourceAppBase = makeBaseFromAppPath(isParentPrimaryApp ? window.parent.MS_APP_PATH : window.parent.parent.MS_APP_PATH);
  const sourceAppColor = appBaseColors[sourceAppBase as MicroAppsBases];

  return (
    <Layout layoutType={LayoutTypes.iframe} baseColors={sourceAppColor || appBaseColors[MicroAppsBases.PAYMENT_TAXAMO]}>
      <main style={{ backgroundColor: "transparent" }}>
        <Outlet />
      </main>
    </Layout>
  );
};

export default function Main() {
  const router = createHashRouter([{ element: <GlobalLayout />, children: routes }]);
  return <RouterProvider router={router} />;
}

