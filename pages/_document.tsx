import { Html, Head, Main, NextScript } from "next/document";

/**
 * Exists to set `lang` on <html>, which Next does not do by default and which
 * both screen readers and search engines rely on.
 */
export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
