import { Fragment } from "react";

import Section from "../components/Section";
import TopTitle from "../components/title";
import { WrapperInner, WrapperOuter } from "../components/wrapper";
import {
  getGithubReleases,
  ReleaseCommit,
  ReleaseSection,
} from "../lib/getGithubReleases";
import { getArchiveReleases } from "../lib/getReleaseNotes";

import styles from "../styles/ReleaseNotes.module.scss";

/** Refetch from GitHub hourly; the site itself only rebuilds when it changes. */
const REVALIDATE_SECONDS = 3600;

interface VersionProps {
  version: string;
  date: string;
}

function Version(props: VersionProps): JSX.Element {
  const { version, date } = props;

  return (
    <div className={styles.versionDiv}>
      <div className={styles.versionNumber}>{version}</div>
      <div className={styles.versionRelease}>{date}</div>
    </div>
  );
}

function Commit(props: ReleaseCommit): JSX.Element {
  const { type, desc, commit } = props;

  const cssTypes: Record<string, string> = {
    added: styles.typeAdded,
    fixed: styles.typeFixed,
    removed: styles.typeRemoved,
    breaking: styles.typeBreaking,
    improved: styles.typeImproved,
    error: styles.typeError,
  };

  return (
    <div className={styles.commitDiv}>
      <div className={`${styles.commitType} ${cssTypes[type]} ${type}`}>
        {type.toUpperCase()}
      </div>
      <div className={styles.commitDesc}>{desc}</div>
      {commit && (
        <a
          href={`https://github.com/mtgatool/mtgatool-desktop/commit/${commit}`}
          target="_blank"
          rel="noreferrer"
        >
          {commit.slice(0, 6)}
        </a>
      )}
    </div>
  );
}

interface MajorGroup {
  major: string;
  releases: ReleaseSection[];
}

/**
 * Consecutive releases sharing a major version form one tree. The connectors
 * are drawn per group, so a jump like 7.0.0 -> 6.7.5 breaks the trunk instead
 * of implying the two lineages are continuous.
 */
function groupByMajor(releases: ReleaseSection[]): MajorGroup[] {
  return releases.reduce<MajorGroup[]>((groups, release) => {
    const major = release.version.split(".")[0];
    const current = groups[groups.length - 1];

    if (current && current.major === major) {
      current.releases.push(release);
    } else {
      groups.push({ major, releases: [release] });
    }

    return groups;
  }, []);
}

type ReleaseNotesProps = {
  releases: ReleaseSection[];
  liveFailed: boolean;
};

export default function ReleaseNotes(props: ReleaseNotesProps): JSX.Element {
  const { releases, liveFailed } = props;

  return (
    <WrapperOuter style={{ minHeight: "calc(100vh - 5px)" }}>
      <WrapperInner style={{ maxWidth: "900px" }}>
        <Section
          className="topNavMargin"
          style={{
            flexDirection: "column",
            paddingBottom: "2em",
            marginBottom: "1em",
          }}
        >
          <TopTitle title="Release Notes" />
          <div className={styles.releasesContainer}>
            {liveFailed && (
              <Commit
                type="error"
                desc="Could not reach GitHub for the latest releases — showing the archived notes below."
                commit=""
              />
            )}
            {groupByMajor(releases).map((group, groupIndex) => (
              <div key={group.major}>
                {groupIndex > 0 && (
                  <div className={styles.majorSeparator}>
                    <span className={styles.majorSeparatorLabel}>
                      {group.major}.x
                    </span>
                  </div>
                )}
                <div>
                  {group.releases.map((release) => (
                    <Fragment key={release.version}>
                      <div className={`${styles.row} ${styles.rowVersion}`}>
                        <Version
                          version={release.version}
                          date={release.date}
                        />
                      </div>
                      {release.commits.map((commit, index) => (
                        <div
                          key={commit.commit || `${release.version}-${index}`}
                          className={`${styles.row} ${styles.rowCommit}`}
                        >
                          <Commit
                            type={commit.type}
                            desc={commit.desc}
                            commit={commit.commit}
                          />
                        </div>
                      ))}
                    </Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </WrapperInner>
    </WrapperOuter>
  );
}

export async function getStaticProps(): Promise<{
  props: ReleaseNotesProps;
  revalidate: number;
}> {
  const live = await getGithubReleases();
  const archive = getArchiveReleases();

  return {
    props: {
      releases: [...(live || []), ...archive],
      liveFailed: live === null,
    },
    revalidate: REVALIDATE_SECONDS,
  };
}
