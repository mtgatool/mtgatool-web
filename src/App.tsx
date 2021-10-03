/* eslint-disable react/prop-types */
/* eslint-disable import/no-webpack-loader-syntax */
import { useEffect, useState } from "react";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToolDbClient } from "tool-db";

import { AppState } from "./redux/stores/webStore";

import TopNav from "./components/topnav";
import Footer from "./components/footer";
import Home, { DESCRIPTION_TEXT } from "./components/home";
import NotFound from "./components/notfound";
import ReleaseNotes from "./components/release-notes";
import Register from "./components/register";
import Docs from "./components/docs";
import Database from "./components/database";
import Loading from "./components/loading";
import CookiesSign from "./components/cookies";
import { WrapperOuter } from "./components/wrapper";

import { DB_SERVER } from "./constants";

import icon from "./assets/cssimages/icon-256.png";
import favicon from "./assets/images/favicon.ico";
import keyArt from "./assets/images/key-art-new.jpg";
import notFoundArt from "./assets/images/404.jpg";
import "./App.css";

declare global {
  interface Window {
    toolDb: ToolDbClient;
    toolDbInitialized: boolean;
  }
}

export default function App(): JSX.Element {
  const [artData, setArtData] = useState("");
  const { databaseVersion, backImage } = useSelector(
    (state: AppState) => state.web
  );
  const [imageUrl, setImageUrl] = useState(backImage);

  useEffect(() => {
    if (!window.toolDbInitialized) {
      ReactGA.initialize("UA-121056395-1");
      window.toolDb = new ToolDbClient(DB_SERVER);
      window.toolDbInitialized = true;
    }
  }, []);

  useEffect(() => {
    if (backImage === keyArt || backImage === "") {
      setImageUrl(keyArt);
      setArtData("Sublime Epiphany by Lindsey Look");
    } else if (backImage === notFoundArt) {
      setImageUrl(notFoundArt);
      setArtData("Totally Lost by David Palumbo");
    } else if (backImage && typeof backImage !== "string") {
      setImageUrl(backImage.images.art_crop);
      setArtData(`${backImage.name} by ${backImage.artist}`);
    }
  }, [backImage]);

  const wrapperStyle = {
    backgroundImage: `url("${imageUrl}")`,
  };

  <link rel="canonical" href="http://www.example.com/" />;

  return (
    <>
      <Helmet>
        <title>MTG Arena Tool</title>
        <meta name="title" content="MTG Arena Tool" />
        <meta name="description" content={DESCRIPTION_TEXT} />
        <meta name="og:title" content="MTG Arena Tool" />
        <meta name="og:description" content={DESCRIPTION_TEXT} />
        <meta name="og:site:name" content="MTG Arena Tool" />
        <meta name="og:image" content={icon} />
        <meta name="og:image:width" content="256" />
        <meta name="og:image:height" content="256" />
        <meta name="og:image:alt" content="MTG Arena Tool Logo" />
        <meta name="twitter:site" content="@MEtchegaray7" />
        <link rel="canonical" href="https://mtgatool.com/" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <Database />
      <Loading />
      <CookiesSign />
      <Router>
        <div style={wrapperStyle} className="wrapper-image" />
        <TopNav artist={artData} />

        {databaseVersion !== 0 ? (
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/release-notes">
              <ReleaseNotes />
            </Route>
            <Route path="/docs">
              <Docs />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        ) : (
          <WrapperOuter style={{ minHeight: "calc(100vh - 5px)" }}>
            <div className="loading">Loading..</div>
          </WrapperOuter>
        )}
        <Footer />
      </Router>
    </>
  );
}
