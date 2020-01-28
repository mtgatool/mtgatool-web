/* eslint-disable react/prop-types */
import React from "react";
import sharedcss from "../../shared.css";

import keyArt from "../../images/key-art.jpg";

import show00 from "../../images/showcase/00.png";
import show01 from "../../images/showcase/01.png";
import show02 from "../../images/showcase/02.png";
import show03 from "../../images/showcase/03.png";
import show04 from "../../images/showcase/04.png";

const showCase = [show00, show01, show02, show03, show04];

import showHistory from "../../images/showcase/history.png";
import showCollection from "../../images/showcase/collection.png";

import css from "../../app.css";
import homeCss from "./home.css";

import MatchFeed from "../match-feed";
import { WrapperInner, WrapperOuter, WrapperOuterLight } from "../wrapper";
import { useWebContext } from "../../web-provider";

const DESCRIPTION_TEXT = `MTG Arena Tool is a collection browser, a deck tracker and a statistics manager. Explore which decks you played against and what other players are brewing. MTG Arena Tool is all about improving your Magic Arena experience.`;

const FEATURE_A_TITLE = `Track your deck, beautifully.`;
const FEATURE_A_TEXT_A = `Enable up to five completely customizable overlay windows, with options like background color, position, size, and what elements to display.`;
const FEATURE_A_TEXT_B = `The combinations are endless.`;

const FEATURE_B_TITLE = `Collection viewer`;
const FEATURE_B_TEXT = `Excellent for rare-drafting, or to review your collection at a glance. Browse every detail of your collection easily.`;

const FEATURE_C_TITLE = `Matches History`;
const FEATURE_C_TEXT = `Get every detail from your play sessions. review old drafts, see the cards your opponent played and much more!`;

function getCurrentOSName() {
  const platform = window.navigator.platform;
  if (platform.indexOf("Mac") > 0) return "Mac";
  if (platform.indexOf("Linux") > 0) return "Linux";
  return "Windows";
}

function makeDownloadURL(versionTag) {
  const platform = window.navigator.platform;
  let extension = "exe";
  if (platform.indexOf("Mac") > 0) extension = "pkg";
  if (platform.indexOf("Linux") > 0) extension = "AppImage";

  return `https://github.com/Manuel-777/MTG-Arena-Tool/releases/download/${versionTag}/MTG-Arena-Tool-${versionTag.slice(
    1
  )}.${extension}`;
}

function Home(props) {
  const { setImage } = props;
  React.useEffect(() => {
    setImage(keyArt);
  }, []);
  const webContext = useWebContext();

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
              href={makeDownloadURL(webContext.versionTag)}
            >
              Download for {getCurrentOSName()}
            </a>
            <div className={css["home-desc-small"]}>
              <i>* No account required</i>
            </div>
          </div>
        </WrapperInner>
      </WrapperOuter>
      <WrapperOuter style={{ paddingBottom: "64px" }}>
        <MatchFeed />
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
                <ShowcaseOverlay webContext={webContext} />
              </div>
            </div>
          </div>
        </WrapperInner>
      </WrapperOuterLight>

      <WrapperOuter>
        <div className={homeCss["cont-margin"]}>
          <div className={homeCss["showcase-container"]}>
            <div className={homeCss["showcase-desc"]}>
              <ShowcaseImage align="right" image={showCollection} />
            </div>
            <div className={homeCss["showcase-desc"]}>
              <div className={homeCss["showcase-title-left"]}>
                {FEATURE_B_TITLE}
              </div>
              <div className={homeCss["showcase-description-left"]}>
                {FEATURE_B_TEXT}
              </div>
            </div>
          </div>
        </div>
      </WrapperOuter>

      <WrapperOuterLight>
        <div className={homeCss["cont-margin"]}>
          <div className={homeCss["showcase-container"]}>
            <div className={homeCss["showcase-desc"]}>
              <div className={homeCss["showcase-title-right"]}>
                {FEATURE_C_TITLE}
              </div>
              <div className={homeCss["showcase-description-right"]}>
                {FEATURE_C_TEXT}
              </div>
            </div>
            <div className={homeCss["showcase-desc"]}>
              <ShowcaseImage align="left" image={showHistory} />
            </div>
          </div>
        </div>
      </WrapperOuterLight>

      <WrapperOuter>
        <div className={homeCss["cont-margin"]}>
          <div className={homeCss["showcase-download-container"]}>
            <a
              style={{ margin: "auto 0px" }}
              className={css["download-button"]}
              href={makeDownloadURL(webContext.versionTag)}
            >
              Download for {getCurrentOSName()}
            </a>
          </div>
        </div>
      </WrapperOuter>
    </>
  );
}

function ShowcaseImage(props) {
  const { image, align } = props;
  const imageRef = React.useRef(null);
  const webContext = useWebContext();

  const getStyle = ctx => {
    let offset = imageRef.current
      ? imageRef.current.offsetTop - ctx.scroll
      : -999;
    return {
      backgroundImage: `url(${image})`,
      alignSelf: align == "left" ? "flex-start" : "flex-end",
      transform: `translateY(${offset / 2}px)`
    };
  };

  return (
    <>
      <div
        ref={imageRef}
        style={getStyle(webContext)}
        className={homeCss["showcase-image"]}
      />
    </>
  );
}

function ShowcaseOverlay(webContext) {
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
