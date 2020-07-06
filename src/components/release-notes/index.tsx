/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from "react";
import { WrapperInner, WrapperOuter } from "../wrapper";
import css from "./releasenotes.css";
import keyArt from "../../images/key-art.jpg";
import Title from "../title";
import { ExportViewProps } from "../../web-types/shared";

const CHANGELOG =
  "https://raw.githubusercontent.com/mtgatool/mtgatool-web/master/src/components/release-notes/releasenotes.txt";

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

function ReleaseNotes(props: ExportViewProps): JSX.Element {
  const { setImage } = props;
  const [notes, setNotes] = React.useState<string[]>([]);
  const [parsedNotes, setParsedNotes] = React.useState<Note[]>([]);

  const getReleaseNotes = (): void => {
    // const lines = textFile.split("\n");
    // console.log(lines, textFile);
    // setNotes(lines);
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      const lines = xhr.responseText.split("\n");
      setNotes(lines);
    });
    xhr.open("GET", CHANGELOG);
    xhr.send();
  };

  React.useEffect(() => {
    getReleaseNotes();
    setImage(keyArt);
  }, [setImage]);

  React.useEffect(() => {
    const newNotes: Note[] = [];
    const lines = /(fixed|improved|removed|added)/g;
    notes.forEach((line, index) => {
      if (line.startsWith("version")) {
        newNotes.push({
          type: TYPE_RELEASE,
          version: notes[index + 1],
          date: notes[index + 2]
        });
      }
      if (lines.test(line)) {
        newNotes.push({
          type: TYPE_EVENT,
          event: line,
          desc: notes[index + 1],
          commit: notes[index + 2]
        });
      }
      //console.log(newNotes);
      setParsedNotes(newNotes);
    });
  }, [notes]);

  return (
    <WrapperOuter>
      <WrapperInner>
        <Title title="Release Notes" />
        <div className={css["releases-container"]}>
          <div className={css["releases-container-line"]} />
          {parsedNotes.map((line, index) => {
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
      </WrapperInner>
    </WrapperOuter>
  );
}

interface VersionProps {
  version: string;
  date: string;
}

function Version(props: VersionProps): JSX.Element {
  const { version, date } = props;

  return (
    <div className={css.versionDiv}>
      <div className={css.versionNumber}>{version}</div>
      <div className={css.versionRelease}>{date}</div>
    </div>
  );
}

function Commit(props): JSX.Element {
  const { event, desc, commit } = props;

  return (
    <div className={css.commitDiv}>
      <div className={css.commitType + " type-" + event}>
        {event.toUpperCase()}
      </div>
      <div className={css.commitDesc}>{desc}</div>
      <a href={"https://github.com/Manuel-777/MTG-Arena-Tool/commit/" + commit}>
        {commit.substr(0, 6)}
      </a>
    </div>
  );
}

export default ReleaseNotes;
