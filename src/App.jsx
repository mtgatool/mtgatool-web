/* eslint-disable react/prop-types */
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import db from "./shared/database";

import TopNav from "./components/topnav";
import Footer from "./components/footer";
import NotFound from "./components/notfound";
import ReleaseNotes from "./components/release-notes";
import Home from "./components/home";
import Metagame from "./components/metagame";
import Register from "./components/register";
import DeckView from "./components/deck-view";
import ActionLog from "./components/action-log";
import CardHover from "./components/card-hover";
import Loading from "./components/loading";
import { WebProvider } from "./web-provider";

// Import once so all CSS can use it thanks to webpack magic
// eslint-disable-next-line no-unused-vars
import { STATE_IDLE, STATE_DOWNLOAD, STATE_ERROR } from "./shared/constants";
import css from "./app.css";
import keyArt from "./images/key-art.jpg";
import notFoundArt from "./images/404.jpg";

const DATABASE_URL = "https://mtgatool.com/database/";

function App() {
  const [artData, setArtData] = React.useState("Bedevil by Seb Mckinnon");
  const [imageUrl, setImageUrl] = React.useState(keyArt);
  /*
  const webDispatch = useWebDispatch();
  const setQueryState = state => {
    webDispatch({ type: "setQueryState", queryState: state });
  };
  */

  const setImage = cardObj => {
    if (cardObj == keyArt) {
      setImageUrl(keyArt);
      setArtData("Bedevil by Seb Mckinnon");
    } else if (cardObj == notFoundArt) {
      setImageUrl(notFoundArt);
      setArtData("Totally Lost by David Palumbo");
    } else {
      setImageUrl("https://img.scryfall.com/cards" + cardObj.images.art_crop);
      setArtData(cardObj.name + " by " + cardObj.artist);
    }
  };

  const getDatabase = () => {
    if (localStorage.databaseTime) {
      const dbJson = JSON.parse(localStorage.database);
      console.log("database from cache: v" + dbJson.version);
      db.setDatabase(localStorage.database);
    }
    if (
      !localStorage.database ||
      new Date(Date.now() - 864e5) < new Date(localStorage.databaseTime)
    ) {
      //setQueryState(STATE_DOWNLOAD);
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        if (xhr.status !== 200) {
          //setQueryState(xhr.status);
        } else {
          try {
            console.log("Database download ok!");
            localStorage.database = xhr.responseText;
            localStorage.databaseTime = new Date();
            db.setDatabase(xhr.responseText);
            //setQueryState(STATE_IDLE);
          } catch (e) {
            console.log(e);
            //setQueryState(STATE_ERROR);
          }
        }
      };
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          //setQueryState(STATE_IDLE);
        }
      };
      xhr.open("GET", DATABASE_URL);
      xhr.send();
    }
  };

  React.useEffect(() => {
    getDatabase();
  }, []);

  const wrapperStyle = {
    backgroundImage: `url("${imageUrl}")`
  };

  return (
    <WebProvider>
      <Loading />
      <Router>
        <div style={wrapperStyle} className={css["wrapper-image"]} />
        <TopNav artist={artData} />
        <CardHover />
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
          <Route exact path="/release-notes">
            <ReleaseNotes setImage={setImage} />
          </Route>
          <Route path="/deck">
            <DeckView setImage={setImage} />
          </Route>
          <Route path="/action-log">
            <ActionLog setImage={setImage} />
          </Route>
          <Route>
            <NotFound setImage={setImage} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </WebProvider>
  );
}

export default hot(App);
