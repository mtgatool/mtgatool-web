/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import sharedcss from "../../shared.css";

import keyArt from "../../assets/images/key-art-new.jpg";

import css from "../../app.css";
import homeCss from "./home.css";

import MatchFeed from "../match-feed";
import { WrapperInner, WrapperOuter } from "../wrapper";
import { ExportViewProps } from "../../web-types/shared";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/stores/webStore";
import { reduxAction } from "../../redux/webRedux";
import Section from "../Section";
import Flex from "../flex";
import ShowcaseOverlay from "./ShowcaseOverlay";
import ShowcaseStats from "./ShowcaseStats";
import Feature from "./Feature";
import FeatureRight from "./FeatureRight";
import useRequest from "../../hooks/useRequest";
import ShowcaseCollection from "./ShowcaseCollection";

const DESCRIPTION_TEXT = `MTG Arena Tool is a collection browser, a deck tracker and a statistics manager. Explore which decks you played against and what other players are brewing. MTG Arena Tool is all about improving your Magic Arena experience.`;

function getCurrentOSName(): string {
  const platform = window.navigator.platform;
  if (platform.indexOf("Mac") > -1) return "Mac";
  if (platform.indexOf("Linux") > -1) return "Linux";
  return "Windows";
}

function makeDownloadURL(versionTag: string): string {
  const platform = window.navigator.platform;
  let extension = "exe";
  if (platform.indexOf("Mac") > -1) extension = "pkg";
  if (platform.indexOf("Linux") > -1) extension = "AppImage";

  return `https://github.com/Manuel-777/MTG-Arena-Tool/releases/download/${versionTag}/MTG-Arena-Tool-${versionTag.slice(
    1
  )}.${extension}`;
}

interface PatreonUser {
  name: string;
  amount: number;
  thumb_url?: string;
  url?: string;
}

interface Contributor {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  contributions: number;
}

function Home(props: ExportViewProps): JSX.Element {
  const { setImage } = props;
  React.useEffect(() => {
    setImage(keyArt);
  }, [setImage]);
  const { versionTag } = useSelector((state: AppState) => state.web);
  const position = React.useRef(window);
  const [patreons, setPatreons] = useState<PatreonUser[]>([]);
  const [contributors, setContributors] = useState<Contributor[]>([]);

  const dispatch = useDispatch();

  const handleScroll = useCallback((): void => {
    reduxAction(dispatch, { type: "SET_SCROLL", arg: window.scrollY });
  }, [dispatch]);

  React.useLayoutEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return (): void => window.removeEventListener("scroll", handleScroll);
  }, [position, handleScroll]);

  const patreonsRequest = useRequest("https://mtgatool.com/api/supporters.php");
  const contribRequest = useRequest(
    "https://api.github.com/repos/Manuel-777/MTG-Arena-Tool/contributors?q=contributions&order=desc"
  );

  useEffect(() => {
    if (patreonsRequest.status == null) {
      patreonsRequest.start();
    }
    if (patreonsRequest.response && patreons.length == 0) {
      const json = JSON.parse(patreonsRequest.response);
      setPatreons(json);
    }
  }, [patreons.length, patreonsRequest]);

  useEffect(() => {
    if (contribRequest.status == null) {
      contribRequest.start();
    }
    if (contribRequest.response && patreons.length == 0) {
      const json = JSON.parse(contribRequest.response);
      setContributors(json);
    }
  }, [patreons.length, contribRequest]);

  return (
    <>
      <WrapperOuter style={{ marginBottom: "4em" }}>
        <WrapperInner>
          <Section style={{ display: "block", margin: "128px 0 16px 0" }}>
            <div className={css.homeDesc}>
              <div
                className={`${sharedcss.textDescription} ${sharedcss.textLight}`}
              >
                {DESCRIPTION_TEXT}
              </div>
              <a
                className={css.downloadButton}
                href={makeDownloadURL(versionTag)}
              >
                Download for {getCurrentOSName()}
              </a>
              <div className={css.homeDescSmall}>
                <i>* No account required</i>
              </div>
            </div>
          </Section>
          <MatchFeed />
        </WrapperInner>
      </WrapperOuter>

      <WrapperOuter>
        <WrapperInner>
          <Flex style={{ marginBottom: "2em", flexDirection: "column" }}>
            <Flex style={{ margin: "4em auto" }}>
              <ShowcaseOverlay />
              <Feature
                title="In-game Deck tracker"
                subtitle="The best and most cusotmizable overlay you will find. Enable up to 5 different overlays and customize them to suit your needs. You can change their color, position, size and more!"
              />
            </Flex>
            <Flex style={{ margin: "4em auto" }}>
              <FeatureRight
                title="Complete Statistics"
                subtitle="Want to know your decks winrate? how about a specific card performance? MTG Arena Tool can do that and much, much more."
              />
              <ShowcaseStats />
            </Flex>
            <Flex style={{ margin: "4em auto" }}>
              <ShowcaseCollection />
              <Feature
                title="Analyse Your Collection"
                subtitle="Take a deep look at the cards you have, how much of a set you are missing and how many drafts it would take you to complete them."
              />
            </Flex>
            <Section
              style={{
                flexDirection: "column",
                padding: "1em",
                maxWidth: "1000px",
                margin: "0 auto"
              }}
            >
              <div className={homeCss.comunitySupport}>
                Maintained thanks to our backers!
              </div>
              <div className={homeCss.communityIcons}>
                {patreons
                  .sort((a, b) => b.amount - a.amount)
                  .map((user, index: number) => {
                    let borderClass = homeCss.iconCasual;
                    if (user.amount >= 500) borderClass = homeCss.iconStandard;
                    if (user.amount >= 1000) borderClass = homeCss.iconModern;
                    if (user.amount >= 2000) borderClass = homeCss.iconLegacy;
                    return user.thumb_url && user.url ? (
                      <a
                        key={"patreon-id-" + index}
                        title={user.name}
                        className={`${homeCss.patreonIcon} ${borderClass}`}
                        href={user.url}
                        style={{ backgroundImage: `url(${user.thumb_url})` }}
                      />
                    ) : (
                      <></>
                    );
                  })}
              </div>
              <div className={homeCss.showcaseDownloadContainer}>
                <a
                  style={{ margin: "auto 0px" }}
                  className={css.patreonButton}
                  href="https://www.patreon.com/mtgatool"
                >
                  Become a Backer!
                </a>
              </div>
              <div className={homeCss.comunitySupport}>GitHub Contributors</div>
              <div className={homeCss.communityIcons}>
                {contributors.map((contrib, index: number) => {
                  return (
                    <a
                      key={"contributor-id-" + index}
                      title={contrib.login}
                      className={`${homeCss.contributor}`}
                      href={contrib.html_url}
                      style={{
                        backgroundImage: `url(${contrib.avatar_url})`
                      }}
                    />
                  );
                })}
              </div>
              <div className={homeCss.showcaseDownloadContainer}>
                <a
                  style={{ margin: "auto 0px" }}
                  className={css.downloadButton}
                  href={makeDownloadURL(versionTag)}
                >
                  Download for {getCurrentOSName()}
                </a>
              </div>
            </Section>
          </Flex>
        </WrapperInner>
      </WrapperOuter>
    </>
  );
}

export default Home;
