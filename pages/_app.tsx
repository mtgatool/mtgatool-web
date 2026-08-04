import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import { GoogleAnalytics } from "nextjs-google-analytics";

import TopNav from "../components/topnav";
import Footer from "../components/footer";

const ARTIST = "Thoughtseize by Aleksi Briclot";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics trackPageViews gaMeasurementId="UA-121056395-1" />
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
    </>
  );
}

export default MyApp;
