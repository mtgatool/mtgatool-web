import Section from "../components/Section";
import TopTitle from "../components/title";
import { WrapperInner, WrapperOuter } from "../components/wrapper";
import { getReleaseNotes } from "../lib/getReleaseNotes";

import styles from "../styles/ReleaseNotes.module.scss";

const TYPE_RELEASE = 0;
const TYPE_EVENT = 1;

interface Note {
  type: number;
  event?: string;
  desc?: string;
  commit?: string;
  version?: string;
  date?: string;
}

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

function Commit(props: any): JSX.Element {
  const { event, desc, commit } = props;

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
      <div className={`${styles.commitType} ${cssTypes[event]} ${event}`}>
        {event.toUpperCase()}
      </div>
      <div className={styles.commitDesc}>{desc}</div>
      <a href={`https://github.com/mtgatool/mtgatool-desktop/commit/${commit}`}>
        {commit.substr(0, 6)}
      </a>
    </div>
  );
}

type ReleaseNotesProps = {
  releaseNotes: Note[];
};

export default function ReleaseNotes(props: ReleaseNotesProps) {
  const { releaseNotes } = props;
  console.log(releaseNotes)

  return (
    <WrapperOuter style={{ minHeight: "calc(100vh - 5px)" }}>
      <WrapperInner style={{ maxWidth: "900px" }}>
        <Section
          style={{
            flexDirection: "column",
            marginTop: "6em",
            paddingBottom: "2em",
            marginBottom: "1em",
          }}
        >
          <TopTitle title="Release Notes" />
          <div className={styles.releasesContainer}>
            <div className={styles.releasesContainerLine} />
            {releaseNotes.map((line, index) => {
              let ret;
              if (line.type === TYPE_RELEASE) {
                ret = (
                  <Version
                    key={index}
                    version={line.version || ""}
                    date={line.date || ""}
                  />
                );
              } else {
                ret = (
                  <Commit
                    key={index}
                    event={line.event}
                    desc={line.desc}
                    commit={line.commit}
                  />
                );
              }
              return ret;
            })}
          </div>
        </Section>
      </WrapperInner>
    </WrapperOuter>
  );
}

export async function getStaticProps() {
  const rawReleaseNotes = getReleaseNotes();

  const releaseNotesLines = rawReleaseNotes.split("\r\n");

  const newNotes: Note[] = [];
  const lines = /(fixed|improved|removed|added)$/;
  releaseNotesLines.forEach((line, index) => {
    if (line.startsWith("version")) {
      newNotes.push({
        type: TYPE_RELEASE,
        version: releaseNotesLines[index + 1],
        date: releaseNotesLines[index + 2],
      });
    }
    if (lines.test(line)) {
      newNotes.push({
        type: TYPE_EVENT,
        event: line,
        desc: releaseNotesLines[index + 1],
        commit: releaseNotesLines[index + 2],
      });
    }
  });

  return {
    props: {
      releaseNotes: newNotes,
    } as ReleaseNotesProps,
  };
}
