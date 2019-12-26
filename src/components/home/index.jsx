/* eslint-disable react/prop-types */
import React from "react";
import sharedcss from "../../shared.css";

import keyArt from "../../images/key-art.jpg";

import show00 from "../../images/showcase/00.png";
import show01 from "../../images/showcase/01.png";
import show02 from "../../images/showcase/02.png";
import show03 from "../../images/showcase/03.png";
import show04 from "../../images/showcase/04.png";
import show05 from "../../images/showcase/05.png";
import show06 from "../../images/showcase/06.png";

const showCase = [show00, show01, show02, show03, show04, show05, show06];

import css from "../../app.css";
import homeCss from "./home.css";

import Video from "../video";
import { WrapperInner, WrapperOuter, WrapperOuterLight } from "../wrapper";
import { useWebContext } from "../../web-provider";

const DESCRIPTION_TEXT = `MTG Arena Tool is a collection browser, a deck tracker and a statistics manager. Explore which decks you played against and what other players are brewing. MTG Arena Tool is all about improving your Magic Arena experience.`;

const FEATURE_A_TITLE = `Track your deck, beautifully.`;
const FEATURE_A_TEXT_A = `Enable up to five completely customizable overlay windows, with options like background color, position, size, and what elements to display.`;
const FEATURE_A_TEXT_B = `The combinations are endless.`;
/*
const FEATURE_B_TITLE = `Explore and learn`;
const FEATURE_B_TEXT = `Browse what others are playing and how they perform, be it on constructed events, drafts and ranked. You would be able to filter decks by colors, events or results. Take your game to the next level and brag your winning deck with everyone else!`;
const FEATURE_C_TITLE = `Not only a Deck Tracker`;
const FEATURE_C_TEXT = `Even if you dislike deck trackers, you can find MTGA Tool useful to keep record of your matches, browse through your collection or even check other people's decks. Just disable the deck tracker overlay to keep it running only in background, you won’t miss a thing anyway.`;
*/
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
          <div className={homeCss["cont-margin"]}>
            <div className={homeCss["showcase-container"]}>
              <div className={homeCss["showcase-desc"]}>
                <div className={homeCss["showcase-title-right"]}>
                  {FEATURE_A_TITLE}
                </div>
                <div className={homeCss["showcase-description-right"]}>
                  {FEATURE_A_TEXT_A}
                </div>
                <div className={homeCss["showcase-description-right"]}>
                  {FEATURE_A_TEXT_B}
                </div>
              </div>
              <div className={homeCss["showcase-desc"]}>
                <ShowcaseOverlay />
              </div>
            </div>
          </div>
        </WrapperInner>
      </WrapperOuterLight>
    </>
  );
}

function ShowcaseOverlay() {
  const webContext = useWebContext();

  const getStyle = ctx => {
    const back = Math.round(ctx.scroll / 30) % showCase.length;
    return {
      backgroundImage: `url(${showCase[back]})`
    };
  };

  return (
    <>
      <div
        style={getStyle(webContext)}
        className={homeCss["showcase-overlay-cont"]}
      />
    </>
  );
}

export default Home;
