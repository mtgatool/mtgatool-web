/* eslint-disable react/prop-types */
import React from "react";
import sharedcss from "../../shared.css";

import keyArt from "../../images/key-art.jpg";
import css from "../../app.css";

import Video from "../video";
import { WrapperInner, WrapperOuter, WrapperOuterLight } from "../wrapper";

const DESCRIPTION_TEXT = `MTG Arena Tool is a collection browser, a deck tracker and a statistics manager. Explore which decks you played against and what other players are brewing. MTG Arena Tool is all about improving your Magic Arena experience.`;

const FEATURE_A_TITLE = `Powerful stats`;
const FEATURE_A_TEXT = `With MTGA Tool you will be able to browse your match history and see which cards and colors your opponents played. This is extremely helpful to understand why your deck is struggling or winning against other opponents. See how much progress you have made with your collection, browse your new cards acquired and explore how many packs and wildcards you need to finish each of your deck builds.`;
const FEATURE_B_TITLE = `Explore and learn`;
const FEATURE_B_TEXT = `Browse what others are playing and how they perform, be it on constructed events, drafts and ranked. You would be able to filter decks by colors, events or results. Take your game to the next level and brag your winning deck with everyone else!`;
const FEATURE_C_TITLE = `Not only a Deck Tracker`;
const FEATURE_C_TEXT = `Even if you dislike deck trackers, you can find MTGA Tool useful to keep record of your matches, browse through your collection or even check other people's decks. Just disable the deck tracker overlay to keep it running only in background, you won’t miss a thing anyway.`;

// https://api.github.com/repos/Manuel-777/MTG-Arena-Tool/releases/latest
function getCurrentOSName() {
  const platform = window.navigator.platform;
  if (platform.indexOf("Mac") > 0) return "Mac";
  if (platform.indexOf("Linux") > 0) return "Linux";
  return "Windows";
}

function makeDownloadURL() {
  const platform = window.navigator.platform;
  const versionTag = "2.14.2";
  let extension = "exe";
  if (platform.indexOf("Mac") > 0) extension = "pkg";
  if (platform.indexOf("Linux") > 0) extension = "AppImage";

  return `https://github.com/Manuel-777/MTG-Arena-Tool/releases/download/v${versionTag}/MTG-Arena-Tool-${versionTag}.${extension}`;
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
            <a className={css["download-button"]} href={makeDownloadURL()}>
              Download for {getCurrentOSName()}
            </a>
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

export default Home;
