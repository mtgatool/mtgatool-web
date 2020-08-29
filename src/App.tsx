/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import TopNav from "./components/topnav";
import Footer from "./components/footer";

// Pages
import Home from "./components/home";
import NotFound from "./components/notfound";
import ReleaseNotes from "./components/release-notes";
import Metagame from "./components/metagame";
import Register from "./components/register";
import ResetPassword from "./components/resetpassword";
import Docs from "./components/docs";
import DeckView from "./components/deck-view";
import ActionLog from "./components/action-log";
import DraftView from "./components/draft-view";
import Database from "./components/database";

import CardHover from "./components/card-hover";
import Loading from "./components/loading";
import CookiesSign from "./components/cookies";

import { WrapperOuter } from "./components/wrapper";

// Import once so all CSS can use it thanks to webpack magic
import css from "./app.css";
import keyArt from "./assets/images/key-art-new.jpg";
import notFoundArt from "./assets/images/404.jpg";
import { useSelector } from "react-redux";
import { AppState } from "./redux/stores/webStore";

function App(): JSX.Element {
  const [artData, setArtData] = React.useState("");
  const { databaseVersion, backImage } = useSelector(
    (state: AppState) => state.web
  );
  const [imageUrl, setImageUrl] = React.useState(backImage);

  useEffect(() => {
    if (backImage == keyArt || backImage == "") {
      setImageUrl(keyArt);
      setArtData("Sublime Epiphany by Lindsey Look");
    } else if (backImage == notFoundArt) {
      setImageUrl(notFoundArt);
      setArtData("Totally Lost by David Palumbo");
    } else if (backImage && typeof backImage !== "string") {
      setImageUrl(backImage.images.art_crop);
      setArtData(backImage.name + " by " + backImage.artist);
    }
  }, [backImage]);

  const wrapperStyle = {
    backgroundImage: `url("${imageUrl}")`
  };

  return (
    <>
      <Database />
      <Loading />
      <CookiesSign />
      <Router>
        <div style={wrapperStyle} className={css.wrapperImage} />
        <TopNav artist={artData} />
        <CardHover />
        {databaseVersion !== 0 ? (
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/metagame">
              <Metagame />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route path="/resetpassword">
              <ResetPassword />
            </Route>
            <Route exact path="/release-notes">
              <ReleaseNotes />
            </Route>
            <Route path="/deck">
              <DeckView />
            </Route>
            <Route path="/action-log">
              <ActionLog />
            </Route>
            <Route path="/draft">
              <DraftView />
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
            <div className={css.loading}>Loading..</div>
          </WrapperOuter>
        )}
        <Footer />
      </Router>
    </>
  );
}

export default hot(App);
