/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from "react";
import { WrapperInner, WrapperOuter } from "../wrapper";
import css from "./releasenotes.css";
import keyArt from "../../images/key-art.jpg";
import Title from "../title";

const CHANGELOG =
  "https://raw.githubusercontent.com/mtgatool/mtgatool-web/master/src/components/release-notes/releasenotes.txt";

const TYPE_RELEASE = 0;
const TYPE_EVENT = 1;

function ReleaseNotes(props) {
  const { setImage } = props;
  const [notes, setNotes] = React.useState([]);
  const [parsedNotes, setParsedNotes] = React.useState([]);

  const getReleaseNotes = () => {
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
  }, []);

  React.useEffect(() => {
    const newNotes = [];
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
      console.log(newNotes);
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
                <Version key={index} version={line.version} date={line.date} />
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

function Version(props) {
  const { version, date } = props;

  return (
    <div className={css["version-div"]}>
      <div className={css["version-number"]}>{version}</div>
      <div className={css["version-release"]}>{date}</div>
    </div>
  );
}

function Commit(props) {
  const { event, desc, commit } = props;

  return (
    <div className={css["commit-div"]}>
      <div className={css["commit-type"] + " type-" + event}>
        {event.toUpperCase()}
      </div>
      <div className={css["commit-desc"]}>{desc}</div>
      <a
        className={css["commit-link"]}
        href={"https://github.com/Manuel-777/MTG-Arena-Tool/commit/" + commit}
      >
        {commit.substr(0, 6)}
      </a>
    </div>
  );
}

export default ReleaseNotes;
