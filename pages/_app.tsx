import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import { GoogleAnalytics } from "nextjs-google-analytics";

import TopNav from "../components/topnav";
import Footer from "../components/footer";
import CookieConsent from "../components/cookieConsent";
import useCookieConsent from "../hooks/useCookieConsent";

const ARTIST = "Thoughtseize by Aleksi Briclot";

function MyApp({ Component, pageProps }: AppProps) {
  const { consent, accept, decline } = useCookieConsent();

  return (
    <>
      {/* Mounted only once the visitor has agreed, so gtag.js is never fetched
          and no cookie is set until then. */}
      {consent === "granted" && (
        <GoogleAnalytics trackPageViews gaMeasurementId="G-0T0RMGGWLK" />
      )}
      {/* Page metadata lives in <Seo>, rendered by each page. */}
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="wrapperImage" />
        <TopNav artist={ARTIST} />
        <Component {...pageProps} />
        <Footer />
      </main>
      {consent === "unset" && (
        <CookieConsent onAccept={accept} onDecline={decline} />
      )}
    </>
  );
}

export default MyApp;
