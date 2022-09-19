/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/prop-types */
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

import { WrapperInner, WrapperOuter } from "../wrapper";

import Section from "../Section";
import Flex from "../flex";
import ShowcaseOverlay from "./ShowcaseOverlay";
import ShowcaseStats from "./ShowcaseStats";
import Feature from "./Feature";
import FeatureRight from "./FeatureRight";

import ShowcaseCollection from "./ShowcaseCollection";
import useRequest from "../../hooks/useRequest";
import usePlatform from "../../hooks/usePlatform";

export const DESCRIPTION_TEXT = `MTG Arena Tool is a collection browser, a deck tracker and a statistics manager. Explore which decks you played against and what other players are brewing. MTG Arena Tool is all about improving your Magic Arena experience.`;

import styles from "../../styles/Home.module.scss";
import topnavstyles from "../../styles/Topnav.module.scss";

function getCurrentOSName(platform: string): string {
  if (platform.indexOf("Mac") > -1) return "Mac";
  if (platform.indexOf("Linux") > -1) return "Linux";
  return "Windows";
}

function makeDownloadURL(platform: string, versionTag: string): string {
  let extension = "exe";
  if (platform.indexOf("Mac") > -1) {
    extension = "dmg";
  }
  if (platform.indexOf("Linux") > -1) {
    return `https://github.com/mtgatool/mtgatool-desktop/releases/download/v${versionTag}/mtgatool-desktop-linux-installer.tar.gz`;
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
  const platform = usePlatform();

  const [patreons, setPatreons] = useState<PatreonUser[]>([]);
  const [version, setVersion] = useState("");
  const [contributors, setContributors] = useState<Contributor[]>([]);
  // const [notice, setNotice] = useState("");

  const [scroll, setScroll] = useState(0);

  const handleScroll = useCallback((): void => {
    setScroll(window.scrollY);
  }, []);

  useLayoutEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return (): void => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const patreonsRequest = useRequest("https://mtgatool.com/api/patreons/get");
  const contribRequest = useRequest(
    "https://api.github.com/repos/mtgatool/mtgatool-desktop/contributors?q=contributions&order=desc"
  );
  const releasesRequest = useRequest(
    "https://api.github.com/repos/mtgatool/mtgatool-desktop/releases/latest"
  );

  useEffect(() => {
    if (patreonsRequest.status == null) {
      patreonsRequest.start();
    }
    if (patreonsRequest.response && patreons.length === 0) {
      const json = JSON.parse(patreonsRequest.response);
      setPatreons(json.data);
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
      setVersion(json.name);
    }
  }, [releasesRequest, contributors.length]);

  return (
    <>
      <WrapperOuter style={{ marginBottom: "4em" }}>
        <WrapperInner>
          <Section style={{ display: "block", margin: "128px 0 16px 0" }}>
            <div className="homeDesc">
              <div className={"textDescription TextLight"}>
                {DESCRIPTION_TEXT}
              </div>
              <Flex style={{ justifyContent: "center" }}>
                <a
                  className="downloadButton"
                  href={makeDownloadURL(platform, version)}
                >
                  Download for {getCurrentOSName(platform)}
                </a>
                <a
                  className="openWebButton"
                  href="https://app.mtgatool.com/auth"
                >
                  Open in your browser
                </a>
              </Flex>
              {platform.indexOf("Linux") !== -1 && (
                <Flex
                  style={{ justifyContent: "center" }}
                  className="textLight"
                >
                  <a
                    className={topnavstyles.navLinkA}
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/mtgatool/mtgatool-desktop/blob/dev/README.md#install-on-linux"
                  >
                    How to install on Linux
                  </a>
                </Flex>
              )}
            </div>
          </Section>
        </WrapperInner>
      </WrapperOuter>

      <WrapperOuter>
        <WrapperInner>
          <Flex style={{ marginBottom: "2em", flexDirection: "column" }}>
            <Flex style={{ margin: "4em auto" }}>
              <ShowcaseOverlay scroll={scroll} />
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
              <ShowcaseStats scroll={scroll} />
            </Flex>
            <Flex style={{ margin: "4em auto" }}>
              <ShowcaseCollection scroll={scroll} />
              <Feature
                title="Analyse Your Collection"
                subtitle="Take a deep look at the cards you have, how much of a set you are missing and how many drafts it would take you to complete them."
              />
            </Flex>
            <Section
              style={{
                flexDirection: "column",
                padding: "1em",
                // maxWidth: "1000px",
                margin: "0 auto",
              }}
            >
              <div className={styles.comunitySupport}>
                Maintained thanks to our backers!
              </div>
              <div className={styles.communityIcons}>
                {patreons
                  .sort((a, b) => b.amount - a.amount)
                  .map((user, index: number) => {
                    let borderClass = styles.iconCasual;
                    if (user.amount >= 500) borderClass = styles.iconStandard;
                    if (user.amount >= 1000) borderClass = styles.iconModern;
                    if (user.amount >= 2000) borderClass = styles.iconLegacy;
                    return user.thumb_url && user.url ? (
                      <a
                        key={`patreon-id-${index}`}
                        title={user.name}
                        className={`${styles.patreonIcon} ${borderClass}`}
                        href={user.url}
                        style={{ backgroundImage: `url(${user.thumb_url})` }}
                      />
                    ) : (
                      <></>
                    );
                  })}
              </div>
              <div className={styles.showcaseDownloadContainer}>
                <a
                  style={{ margin: "auto 0px" }}
                  className="patreonButton"
                  href="https://www.patreon.com/mtgatool"
                >
                  Become a Backer!
                </a>
              </div>
              <div className={styles.comunitySupport}>GitHub Contributors</div>
              <div className={styles.communityIcons}>
                {contributors.map((contrib, index: number) => {
                  return (
                    <a
                      key={`contributor-id-${index}`}
                      title={contrib.login}
                      className={styles.contributor}
                      href={contrib.html_url}
                      style={{
                        backgroundImage: `url(${contrib.avatar_url})`,
                      }}
                    />
                  );
                })}
              </div>
              <div className={styles.showcaseDownloadContainer}>
                <a
                  style={{ margin: "auto 0px" }}
                  className="downloadButton"
                  href={makeDownloadURL(platform, version)}
                >
                  Download for {getCurrentOSName(platform)}
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
