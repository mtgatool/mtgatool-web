/* eslint-disable react/prop-types */
import React from "react";
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
import { DbCardData } from "mtgatool-shared/dist/types/metadata";

function App(): JSX.Element {
  const [artData, setArtData] = React.useState(
    "Sublime Epiphany by Lindsey Look"
  );
  const [imageUrl, setImageUrl] = React.useState(keyArt);
  const { databaseVersion } = useSelector((state: AppState) => state.web);

  const setImage = (cardObj: DbCardData | string): void => {
    if (cardObj == keyArt) {
      setImageUrl(keyArt);
      setArtData("Sublime Epiphany by Lindsey Look");
    } else if (cardObj == notFoundArt) {
      setImageUrl(notFoundArt);
      setArtData("Totally Lost by David Palumbo");
    } else if (cardObj && typeof cardObj !== "string") {
      setImageUrl("https://img.scryfall.com/cards" + cardObj.images.art_crop);
      setArtData(cardObj.name + " by " + cardObj.artist);
    }
  };

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
              <Home setImage={setImage} />
            </Route>
            <Route path="/metagame">
              <Metagame setImage={setImage} />
            </Route>
            <Route exact path="/register">
              <Register setImage={setImage} />
            </Route>
            <Route path="/resetpassword">
              <ResetPassword setImage={setImage} />
            </Route>
            <Route exact path="/release-notes">
              <ReleaseNotes setImage={setImage} />
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
              <NotFound setImage={setImage} />
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
