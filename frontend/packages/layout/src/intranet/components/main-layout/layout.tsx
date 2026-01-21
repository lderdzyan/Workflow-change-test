import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../../styles/theme";
import { getImageSrc } from "@repo/utilities";
import ErrorBoundary from "../../../../../intranet-layout/src/components/errorBoundary";
import { HashRouter } from "react-router-dom";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export function LayoutWrapper({ children }: { children: any }) {
  return (
    <>
      <Head>
        <link rel="icon" href={getImageSrc("favicon.ico")} />
      </Head>
      <HashRouter>
        <Layout>{children}</Layout>
      </HashRouter>
    </>
  );
}
