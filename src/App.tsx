/* eslint-disable react/prop-types */
/* eslint-disable import/no-webpack-loader-syntax */
import { useEffect, useState } from "react";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AppState } from "./redux/stores/webStore";

import TopNav from "./components/topnav";
import Footer from "./components/footer";
import Home, { DESCRIPTION_TEXT } from "./components/home";
import NotFound from "./components/notfound";
import ReleaseNotes from "./components/release-notes";

import Docs from "./components/docs";

import Loading from "./components/loading";
import CookiesSign from "./components/cookies";

import icon from "./assets/cssimages/icon-256.png";
import favicon from "./assets/images/favicon.ico";
import keyArt from "./assets/images/key-art-new.jpg";
import notFoundArt from "./assets/images/404.jpg";
import "./App.css";

export default function App(): JSX.Element {
  const [artData, setArtData] = useState("");
  const { backImage } = useSelector((state: AppState) => state.web);
  const [imageUrl, setImageUrl] = useState(backImage);

  useEffect(() => {
    ReactGA.initialize("UA-121056395-1");
    ReactGA.pageview(window.location.pathname);
  }, []);

  useEffect(() => {
    if (backImage === keyArt || backImage === "") {
      setImageUrl(keyArt);
      setArtData("Sublime Epiphany by Lindsey Look");
    } else if (backImage === notFoundArt) {
      setImageUrl(notFoundArt);
      setArtData("Totally Lost by David Palumbo");
    }
  }, [backImage]);

  const wrapperStyle = {
    backgroundImage: `url("${imageUrl}")`,
  };

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
      <Loading />
      <CookiesSign />
      <Router>
        <div style={wrapperStyle} className="wrapper-image" />
        <TopNav artist={artData} />

        <Switch>
          <Route exact path="/">
            <Home />
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

        <Footer />
      </Router>
    </>
  );
}
