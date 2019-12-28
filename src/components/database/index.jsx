import React from "react";
import {
  STATE_IDLE,
  STATE_DOWNLOAD,
  STATE_ERROR
} from "../../shared/constants";
import db from "../../shared/database";
import { useWebDispatch } from "../../web-provider";

const DATABASE_URL = "https://mtgatool.com/database/";

function Database() {
  const webDispatch = useWebDispatch();

  const setQueryState = state => {
    webDispatch({ type: "setQueryState", queryState: state });
  };

  React.useState(() => {
    setTimeout(() => {
      load();
    }, 500);
  }, []);

  const load = () => {
    if (localStorage.databaseTime) {
      const dbJson = JSON.parse(localStorage.database);
      console.log("database from cache: v" + dbJson.version);
      db.setDatabase(localStorage.database);
    }
    if (
      !localStorage.database ||
      new Date(Date.now() - 86400000) > new Date(localStorage.databaseTime)
    ) {
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
            window.location.reload();
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
    }
  };

  return <></>;
}

export default Database;
