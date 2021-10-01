/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToolDbClient } from "tool-db";

import { AppState } from "./redux/stores/webStore";

import TopNav from "./components/topnav";
import Footer from "./components/footer";
import Home from "./components/home";
import NotFound from "./components/notfound";
import ReleaseNotes from "./components/release-notes";
import Register from "./components/register";
import Docs from "./components/docs";
import Database from "./components/database";
import Loading from "./components/loading";
import CookiesSign from "./components/cookies";
import { WrapperOuter } from "./components/wrapper";

import { DB_SERVER } from "./constants";

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

  return (
    <>
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
          <WrapperOuter>
            <div className="loading">Loading..</div>
          </WrapperOuter>
        )}
        <Footer />
      </Router>
    </>
  );
}
