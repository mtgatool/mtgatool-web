/* eslint-disable react/prop-types */
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import db from "./shared/database";

import Video from "./components/video";
import {
  WrapperInner,
  WrapperOuter,
  WrapperOuterLight
} from "./components/wrapper";
import TopNav from "./components/topnav";
import Footer from "./components/footer";
import NotFound from "./components/notfound";
import ReleaseNotes from "./components/release-notes";
import Metagame from "./components/metagame";
import Register from "./components/register";
import CardHover from "./components/card-hover";
import {WebProvider} from "./web-provider";

// Import once so all CSS can use it thanks to webpack magic
// eslint-disable-next-line no-unused-vars
import { STATE_IDLE, STATE_DOWNLOAD, STATE_ERROR } from "./constants";
import sharedcss from "./shared.css";
import css from "./app.css";
import downloadButton from "./images/badge_download.png";
import keyArt from "./images/key-art.jpg";

const DESCRIPTION_TEXT = `MTG Arena Tool is a collection browser, a deck tracker and a statistics manager. Explore which decks you played against and what other players are brewing. MTG Arena Tool is all about improving your Magic Arena experience.`;

const FEATURE_A_TITLE = `Powerful stats`;
const FEATURE_A_TEXT = `With MTGA Tool you will be able to browse your match history and see which cards and colors your opponents played. This is extremely helpful to understand why your deck is struggling or winning against other opponents. See how much progress you have made with your collection, browse your new cards acquired and explore how many packs and wildcards you need to finish each of your deck builds.`;
const FEATURE_B_TITLE = `Explore and learn`;
const FEATURE_B_TEXT = `Browse what others are playing and how they perform, be it on constructed events, drafts and ranked. You would be able to filter decks by colors, events or results. Take your game to the next level and brag your winning deck with everyone else!`;
const FEATURE_C_TITLE = `Not only a Deck Tracker`;
const FEATURE_C_TEXT = `Even if you dislike deck trackers, you can find MTGA Tool useful to keep record of your matches, browse through your collection or even check other people's decks. Just disable the deck tracker overlay to keep it running only in background, you won’t miss a thing anyway.`;

const RELEASE_DESC = "v2.14.2, Released November 29th, 2019";

const DATABASE_URL = "https://mtgatool.com/database/";

function App() {
  const artist = "Bedevil by Seb Mckinnon";
  const [image, setImage] = React.useState(keyArt);
  const [queryState, setQueryState] = React.useState(0);

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
      setQueryState(STATE_DOWNLOAD);
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        if (xhr.status !== 200) {
          setQueryState(xhr.status);
        } else {
          try {
            console.log("Database download ok!");
            localStorage.database = xhr.responseText;
            localStorage.databaseTime = new Date();
            db.setDatabase(xhr.responseText);
            // Query state could be in redux
            setQueryState(STATE_IDLE);
          } catch (e) {
            console.log(e);
            setQueryState(STATE_ERROR);
          }
        }
      };
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && queryState !== STATE_ERROR) {
          setQueryState(STATE_IDLE);
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
    backgroundImage: `url("${image}")`
  };

  return (
    <WebProvider>
      <Router>
        <div style={wrapperStyle} className={css["wrapper-image"]} />
        <TopNav artist={artist} />
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
          <Route>
            <NotFound setImage={setImage} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </WebProvider>
  );
}

function Home(props) {
  const { setImage } = props;
  React.useEffect(() => {
    setImage(keyArt);
  }, []);

  return (
    <>
      <WrapperOuter>
        <WrapperInner>
          <div className={css["home-desc"]}>
            <div
              className={`${sharedcss["text-description"]} ${sharedcss["text-light"]}`}
            >
              {DESCRIPTION_TEXT}
            </div>
            <a
              className={css["download-button"]}
              href="https://github.com/Manuel-777/MTG-Arena-Tool/releases/latest"
            >
              <img
                className={css["download-img"]}
                alt=""
                src={downloadButton}
              />
            </a>
            <div className={css["home-desc-small"]}>{RELEASE_DESC}</div>
            <Link
              to="/release-notes"
              style={{ marginBottom: "10px" }}
              className={css["nav-logo"]}
            >
              Release Notes
            </Link>
            <div className={css["home-desc-small"]}>
              <i>* No account required</i>
            </div>
          </div>
        </WrapperInner>
      </WrapperOuter>
      <WrapperOuter style={{ paddingBottom: "64px" }}>
        <Video />
      </WrapperOuter>
      <WrapperOuterLight>
        <WrapperInner>
          <div className={sharedcss["text-title"]}>{FEATURE_A_TITLE}</div>
          <div className={sharedcss["text-description"]}>{FEATURE_A_TEXT}</div>
        </WrapperInner>
      </WrapperOuterLight>
      <WrapperOuterLight>
        <WrapperInner>
          <div className={sharedcss["text-title"]}>{FEATURE_B_TITLE}</div>
          <div className={sharedcss["text-description"]}>{FEATURE_B_TEXT}</div>
        </WrapperInner>
      </WrapperOuterLight>
      <WrapperOuterLight>
        <WrapperInner>
          <div className={sharedcss["text-title"]}>{FEATURE_C_TITLE}</div>
          <div className={sharedcss["text-description"]}>{FEATURE_C_TEXT}</div>
        </WrapperInner>
      </WrapperOuterLight>
    </>
  );
}

export default hot(App);
