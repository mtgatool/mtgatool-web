/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/prop-types */
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "../../shared.css";
import "../../App.css";
import "./home.css";

import { useSelector, useDispatch } from "react-redux";
// import MatchFeed from "../match-feed";
import { WrapperInner, WrapperOuter } from "../wrapper";
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

export const DESCRIPTION_TEXT = `MTG Arena Tool is a collection browser, a deck tracker and a statistics manager. Explore which decks you played against and what other players are brewing. MTG Arena Tool is all about improving your Magic Arena experience.`;

function getCurrentOSName(): string {
  const { platform } = window.navigator;
  if (platform.indexOf("Mac") > -1) return "Mac";
  if (platform.indexOf("Linux") > -1) return "Linux";
  return "Windows";
}

function makeDownloadURL(versionTag: string): string {
  const { platform } = window.navigator;
  let extension = "exe";
  if (platform.indexOf("Mac") > -1) {
    extension = "dmg";
  }
  if (platform.indexOf("Linux") > -1) {
    // eslint-disable-next-line no-param-reassign
    versionTag = "linux-installer";
    extension = "tar.gz";
  }

  return `https://github.com/mtgatool/mtgatool-desktop/releases/download/v${versionTag}/mtgatool-desktop-${versionTag}.${extension}`;
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

function Home(): JSX.Element {
  const { versionTag } = useSelector((state: AppState) => state.web);
  const position = useRef(window);
  const [patreons, setPatreons] = useState<PatreonUser[]>([]);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  // const [notice, setNotice] = useState("");

  const dispatch = useDispatch();

  const handleScroll = useCallback((): void => {
    reduxAction(dispatch, { type: "SET_SCROLL", arg: window.scrollY });
  }, [dispatch]);

  useLayoutEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return (): void => window.removeEventListener("scroll", handleScroll);
  }, [position, handleScroll]);

  const patreonsRequest = useRequest("https://mtgatool.com/patreons/get");
  const contribRequest = useRequest(
    "https://api.github.com/repos/Manwe-777/MTG-Arena-Tool/contributors?q=contributions&order=desc"
  );
  const releasesRequest = useRequest(
    "https://api.github.com/repos/mtgatool/mtgatool-desktop/releases/latest"
  );

  // const noticeRequest = useRequest(
  //   "https://raw.githubusercontent.com/mtgatool/mtgatool-desktop/dev/.gitignore"
  // );

  useEffect(() => {
    if (patreonsRequest.status == null) {
      patreonsRequest.start();
    }
    if (patreonsRequest.response && patreons.length === 0) {
      const json = JSON.parse(patreonsRequest.response);
      setPatreons(json);
    }
  }, [patreons.length, patreonsRequest]);

  useEffect(() => {
    if (contribRequest.status == null) {
      contribRequest.start();
    }
    if (contribRequest.response && contributors.length === 0) {
      const json = JSON.parse(contribRequest.response);
      setContributors(json);
    }
  }, [contribRequest, contributors.length]);

  useEffect(() => {
    if (releasesRequest.status == null) {
      releasesRequest.start();
    }
    if (releasesRequest.response && contributors.length === 0) {
      const json = JSON.parse(releasesRequest.response);
      reduxAction(dispatch, { type: "SET_VERSION_TAG", arg: json.name });
    }
  }, [releasesRequest]);

  // useEffect(() => {
  //   if (noticeRequest.status == null) {
  //     noticeRequest.start();
  //   }
  //   if (noticeRequest.response) {
  //     setNotice(noticeRequest.response);
  //   }
  // }, [noticeRequest]);

  return (
    <>
      <WrapperOuter style={{ marginBottom: "4em" }}>
        <WrapperInner>
          <Section style={{ display: "block", margin: "128px 0 16px 0" }}>
            <div className="home-desc">
              <div className={`${"text-description"} ${"text-light"}`}>
                {DESCRIPTION_TEXT}
              </div>
              <Flex style={{ justifyContent: "center" }}>
                <a
                  className="download-button"
                  href={makeDownloadURL(versionTag)}
                >
                  Download for {getCurrentOSName()}
                </a>
                <a
                  className="open-web-button"
                  href="https://app.mtgatool.com/auth"
                >
                  Open in your browser
                </a>
              </Flex>
            </div>
          </Section>
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
                margin: "0 auto",
              }}
            >
              <div className="comunity-support">
                Maintained thanks to our backers!
              </div>
              <div className="community-icons">
                {patreons
                  .sort((a, b) => b.amount - a.amount)
                  .map((user, index: number) => {
                    let borderClass = "icon-casual";
                    if (user.amount >= 500) borderClass = "icon-standard";
                    if (user.amount >= 1000) borderClass = "icon-modern";
                    if (user.amount >= 2000) borderClass = "icon-legacy";
                    return user.thumb_url && user.url ? (
                      <a
                        key={`patreon-id-${index}`}
                        title={user.name}
                        className={`${"patreon-icon"} ${borderClass}`}
                        href={user.url}
                        style={{ backgroundImage: `url(${user.thumb_url})` }}
                      />
                    ) : (
                      <></>
                    );
                  })}
              </div>
              <div className="showcase-download-container">
                <a
                  style={{ margin: "auto 0px" }}
                  className="patreon-button"
                  href="https://www.patreon.com/mtgatool"
                >
                  Become a Backer!
                </a>
              </div>
              <div className="comunity-support">GitHub Contributors</div>
              <div className="community-icons">
                {contributors.map((contrib, index: number) => {
                  return (
                    <a
                      key={`contributor-id-${index}`}
                      title={contrib.login}
                      className={`${"contributor"}`}
                      href={contrib.html_url}
                      style={{
                        backgroundImage: `url(${contrib.avatar_url})`,
                      }}
                    />
                  );
                })}
              </div>
              <div className="showcase-download-container">
                <a
                  style={{ margin: "auto 0px" }}
                  className="download-button"
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
