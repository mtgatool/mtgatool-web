/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { WrapperInner, WrapperOuter } from "../wrapper";
import "./releasenotes.css";
import Title from "../title";
import Section from "../Section";
import { reduxAction } from "../../redux/webRedux";

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

interface VersionProps {
  version: string;
  date: string;
}

function Version(props: VersionProps): JSX.Element {
  const { version, date } = props;

  return (
    <div className="version-div">
      <div className="version-number">{version}</div>
      <div className="version-release">{date}</div>
    </div>
  );
}

function Commit(props: any): JSX.Element {
  const { event, desc, commit } = props;

  return (
    <div className="commit-div">
      <div className={`commit-type type-${event}`}>{event.toUpperCase()}</div>
      <div className="commit-desc">{desc}</div>
      <a href={`https://github.com/Manuel-777/MTG-Arena-Tool/commit/${commit}`}>
        {commit.substr(0, 6)}
      </a>
    </div>
  );
}

function ReleaseNotes(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    reduxAction(dispatch, { type: "SET_BACK_IMAGE", arg: "" });
  }, [dispatch]);
  const [notes, setNotes] = useState<string[]>([]);
  const [parsedNotes, setParsedNotes] = useState<Note[]>([]);

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

  useEffect(() => {
    getReleaseNotes();
  }, []);

  useEffect(() => {
    const newNotes: Note[] = [];
    const lines = /(fixed|improved|removed|added)/g;
    notes.forEach((line, index) => {
      if (line.startsWith("version")) {
        newNotes.push({
          type: TYPE_RELEASE,
          version: notes[index + 1],
          date: notes[index + 2],
        });
      }
      if (lines.test(line)) {
        newNotes.push({
          type: TYPE_EVENT,
          event: line,
          desc: notes[index + 1],
          commit: notes[index + 2],
        });
      }
      // console.log(newNotes);
      setParsedNotes(newNotes);
    });
  }, [notes]);

  return (
    <WrapperOuter>
      <WrapperInner style={{ maxWidth: "900px" }}>
        <Section
          style={{
            flexDirection: "column",
            marginTop: "6em",
            marginBottom: "1em",
          }}
        >
          <Title title="Release Notes" />
          <div className="releases-container">
            <div className="releases-container-line" />
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
        </Section>
      </WrapperInner>
    </WrapperOuter>
  );
}

export default ReleaseNotes;
