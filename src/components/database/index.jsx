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

function Database() {
  const webDispatch = useWebDispatch();

  const setQueryState = state => {
    webDispatch({ type: "setQueryState", queryState: state });
  };

  const setDatabaseVersion = version => {
    webDispatch({ type: "setDatabaseVersion", databaseVersion: version });
  };

  React.useState(() => {
    // Load from cache
    if (localStorage.databaseTime) {
      const dbJson = JSON.parse(localStorage.database);
      console.log("database from cache: v" + dbJson.version);
      db.setDatabase(localStorage.database);
    }
    setTimeout(() => {
      fetchVersion();
    }, 500);
  }, []);

  const fetchVersion = () => {
    setQueryState(STATE_DOWNLOAD);
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        setQueryState(xhr.status);
      } else {
        try {
          const response = JSON.parse(xhr.responseText);
          console.log(
            "Latest: " + response.latest + ", current: " + db.version
          );
          if (parseInt(db.version) < parseInt(response.latest)) {
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
    xhr.onreadystatechange = () => {
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

  const load = () => {
    console.log("Downloading latest..");
    setQueryState(STATE_DOWNLOAD);
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        setQueryState(xhr.status);
      } else {
        try {
          console.log("Database download ok!");
          localStorage.database = xhr.responseText;
          localStorage.databaseTime = new Date();
          db.setDatabase(xhr.responseText);
          setQueryState(STATE_IDLE);
          setDatabaseVersion(db.version);
        } catch (e) {
          console.log(e);
          setQueryState(STATE_ERROR);
        }
      }
    };
    xhr.onreadystatechange = () => {
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

  return <></>;
}

export default Database;
