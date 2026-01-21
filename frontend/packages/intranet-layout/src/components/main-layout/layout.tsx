import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getImageSrc } from "@repo/utilities";
import ErrorBoundary from "../errorBoundary";
import theme from "../../styles/theme";

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
      <Layout>{children}</Layout>
    </>
  );
}

