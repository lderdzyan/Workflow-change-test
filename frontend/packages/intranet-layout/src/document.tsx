import { Head, Main, NextScript } from "next/document";

export const Document = () => {
  return (
    <>
      <Head>
        <script type="text/javascript" src="bootstrap.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </>
  );
};

