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
            <div className={styles.releasesContainerLine} />
            {liveFailed && (
              <Commit
                type="error"
                desc="Could not reach GitHub for the latest releases — showing the archived notes below."
                commit=""
              />
            )}
            {releases.map((release) => (
              <div key={release.version}>
                <Version version={release.version} date={release.date} />
                {release.commits.map((commit, index) => (
                  <Commit
                    key={commit.commit || `${release.version}-${index}`}
                    type={commit.type}
                    desc={commit.desc}
                    commit={commit.commit}
                  />
                ))}
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
