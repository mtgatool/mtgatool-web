/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/prop-types */
import { WrapperInner, WrapperOuter } from "../wrapper";

import Section from "../Section";
import Flex from "../flex";
import ShowcaseOverlay from "./ShowcaseOverlay";
import ShowcaseStats from "./ShowcaseStats";
import Feature from "./Feature";
import FeatureRight from "./FeatureRight";

import ShowcaseCollection from "./ShowcaseCollection";
import OpenSourceBadge from "./OpenSourceBadge";
import GithubLogo from "../svg/GithubLogo";
import usePlatform from "../../hooks/usePlatform";
import { Contributor } from "../../lib/getGithubHome";
import { GITHUB_ORG_PAGE, GITHUB_RELEASES_PAGE } from "../../lib/github";
import { trackDownloadClick, trackOpenWebApp } from "../../lib/analytics";

export const DESCRIPTION_TEXT = `MTG Arena Tool is a free and open source collection browser, deck tracker and statistics manager. Explore which decks you played against and what other players are brewing. MTG Arena Tool is all about improving your Magic Arena experience.`;

import styles from "../../styles/Home.module.scss";
import topnavstyles from "../../styles/Topnav.module.scss";
import { IPatreon } from "../../pages";

function getCurrentOSName(platform: string): string {
  if (platform.indexOf("Mac") > -1) return "Mac";
  if (platform.indexOf("Linux") > -1) return "Linux";
  return "Windows";
}

/**
 * Falls back to the releases page when the version is unknown. Building an
 * asset URL without one produces a 404 like ".../download/v/mtgatool-.dmg",
 * so an unknown version must never reach the template.
 */
function makeDownloadURL(platform: string, versionTag: string | null): string {
  if (!versionTag) return GITHUB_RELEASES_PAGE;

  let extension = "exe";
  if (platform.indexOf("Mac") > -1) {
    extension = "dmg";
  }
  if (platform.indexOf("Linux") > -1) {
    return `https://github.com/mtgatool/mtgatool-desktop/releases/download/v${versionTag}/mtgatool-desktop-linux-installer.tar.gz`;
  }

  return `https://github.com/mtgatool/mtgatool-desktop/releases/download/v${versionTag}/mtgatool-desktop-${versionTag}.${extension}`;
}

interface HomeProps {
  patreons: IPatreon[];
  contributors: Contributor[];
  version: string | null;
}

function Home(props: HomeProps): JSX.Element {
  const { patreons, contributors, version } = props;
  const platform = usePlatform();

  return (
    <>
      <WrapperOuter style={{ marginBottom: "4em" }}>
        <WrapperInner>
          <Section className="topNavMargin" style={{ display: "block", margin: "128px 0 16px 0" }}>
            <div className="homeDesc">
              <h1 className={"textDescription TextLight"}>
                {DESCRIPTION_TEXT}
              </h1>
              <Flex style={{ justifyContent: "center" }}>
                <a
                  className="downloadButton"
                  href={makeDownloadURL(platform, version)}
                  onClick={() => trackDownloadClick(getCurrentOSName(platform))}
                >
                  Download for {getCurrentOSName(platform)}
                </a>
                <a
                  className="openWebButton"
                  href="https://app.mtgatool.com/auth"
                  onClick={trackOpenWebApp}
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
              <OpenSourceBadge />
            </div>
          </Section>
        </WrapperInner>
      </WrapperOuter>

      <WrapperOuter>
        <WrapperInner>
          <Flex className={styles.descWrapper}>
            <Flex className={styles.descShowcase}>
              <ShowcaseOverlay />
              <Feature
                title="In-game Deck tracker"
                subtitle="The best and most cusotmizable deck tracker overlay you will find. Enable up to 5 different overlays and customize them to suit your needs. Customize each of them with different data, behaviour, size, and much more!"
              />
            </Flex>
            <Flex className={styles.descShowcaseReverse}>
              <ShowcaseStats />
              <FeatureRight
                title="Complete Statistics"
                subtitle="Want to know your decks winrate? how about a specific card's performance? Maybe see what cards you mulligan more often? MTG Arena Tool can do that and much, much more."
              />
            </Flex>
            <Flex className={styles.descShowcase}>
              <ShowcaseCollection />
              <Feature
                title="Analyse Your Collection"
                subtitle="Take a deep look at the cards you have, how much of a set you are missing and how many drafts it would take you to complete them. MTG Arena Tool's card database is the most comprehensive mtga cards dataset out there."
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
                Maintained thanks to our patrons!
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
              {/* Hidden entirely when GitHub is unreachable, rather than
                  leaving the heading standing over an empty row. */}
              {contributors.length > 0 && (
                <>
                  <div className={styles.comunitySupport}>
                    Built in the open by our GitHub contributors
                  </div>
                  <div className={styles.communityIcons}>
                    {contributors.map((contrib) => (
                      <a
                        key={contrib.login}
                        title={contrib.login}
                        className={styles.contributor}
                        href={contrib.htmlUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          backgroundImage: `url(${contrib.avatarUrl})`,
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
              <Flex className={styles.closingButtons}>
                <a
                  style={{ margin: "auto 0px" }}
                  className="downloadButton"
                  href={makeDownloadURL(platform, version)}
                  onClick={() => trackDownloadClick(getCurrentOSName(platform))}
                >
                  Download for {getCurrentOSName(platform)}
                </a>
                <a
                  style={{ margin: "auto 0px" }}
                  className="githubButton"
                  href={GITHUB_ORG_PAGE}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubLogo />
                  Browse the source
                </a>
              </Flex>
            </Section>
          </Flex>
        </WrapperInner>
      </WrapperOuter>
    </>
  );
}

export default Home;
