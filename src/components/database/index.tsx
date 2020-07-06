import React from "react";
import {
  STATE_IDLE,
  STATE_DOWNLOAD,
  STATE_ERROR
} from "../../shared/constants";
import db from "../../shared/database";
import { useWebDispatch } from "../../web-provider";

const DATABASE_URL = "https://mtgatool.com/database/";
const LATEST_URL = "https://mtgatool.com/database/latest/";
const GH_LATEST =
  "https://api.github.com/repos/Manuel-777/MTG-Arena-Tool/releases/latest";

function Database(): JSX.Element {
  const webDispatch = useWebDispatch();

  const setQueryState = (state): void => {
    webDispatch({ type: "setQueryState", queryState: state });
  };

  const setDatabaseVersion = (version): void => {
    webDispatch({ type: "setDatabaseVersion", databaseVersion: version });
  };

  const fetchGHTag = (): void => {
    const xhr = new XMLHttpRequest();
    xhr.onload = (): void => {
      if (xhr.status == 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          console.log("Latest GitHub: " + response.tag_name);
          webDispatch({ type: "setVersionTag", versionTag: response.tag_name });
        } catch (e) {
          console.log(e);
        }
      }
    };

    xhr.open("GET", GH_LATEST);
    xhr.send();
  };

  const load = (): void => {
    console.log("Downloading latest..");
    setQueryState(STATE_DOWNLOAD);
    const xhr = new XMLHttpRequest();
    xhr.onload = (): void => {
      if (xhr.status !== 200) {
        setQueryState(xhr.status);
      } else {
        try {
          db.setDatabase(xhr.responseText);
          setQueryState(STATE_IDLE);
          setDatabaseVersion(db.version);
          console.log("Database download ok!");
          localStorage.database = xhr.responseText;
          localStorage.databaseTime = new Date();
        } catch (e) {
          console.log(e);
          setQueryState(STATE_ERROR);
        }
      }
    };
    xhr.onreadystatechange = (): void => {
      if (xhr.readyState === 3) {
        setQueryState(STATE_DOWNLOAD);
      }
      if (xhr.readyState === 4) {
        setQueryState(STATE_IDLE);
      }
    };
    xhr.open("GET", DATABASE_URL);
    xhr.send();
  };

  const fetchVersion = (): void => {
    setQueryState(STATE_DOWNLOAD);
    const xhr = new XMLHttpRequest();
    xhr.onload = (): void => {
      if (xhr.status !== 200) {
        setQueryState(xhr.status);
      } else {
        try {
          const response = JSON.parse(xhr.responseText);
          console.log(
            "Latest: " + response.latest + ", current: " + db.version
          );
          if (parseInt(db.version + "") < parseInt(response.latest)) {
            load();
          } else {
            setQueryState(STATE_IDLE);
          }
        } catch (e) {
          console.log(e);
          setQueryState(STATE_ERROR);
        }
      }
    };
    xhr.onreadystatechange = (): void => {
      if (xhr.readyState === 3) {
        setQueryState(STATE_DOWNLOAD);
      }
      if (xhr.readyState === 4) {
        setQueryState(STATE_IDLE);
      }
    };
    xhr.open("GET", LATEST_URL);
    xhr.send();
  };

  React.useEffect(() => {
    // Load from cache
    if (localStorage.databaseTime) {
      const dbJson = JSON.parse(localStorage.database);
      console.log("database from cache: v" + dbJson.version);
      db.setDatabase(localStorage.database);
      setDatabaseVersion(dbJson.version);
    }
    setTimeout(() => {
      fetchGHTag();
      fetchVersion();
    }, 500);
  }, []);

  return <></>;
}

export default Database;
