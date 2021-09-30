import React, { useCallback } from "react";
import { database as db } from "mtgatool-shared";
import { STATE_IDLE, STATE_DOWNLOAD, STATE_ERROR } from "../../constants";
import { reduxAction } from "../../redux/webRedux";
import { useDispatch } from "react-redux";

const DATABASE_URL = "https://mtgatool.com/database/";
const LATEST_URL = "https://mtgatool.com/database/latest/";
const GH_LATEST =
  "https://api.github.com/repos/mtgatool/mtgatool-desktop/releases/latest";

export default function Database(): JSX.Element {
  const dispatch = useDispatch();

  const setQueryState = useCallback(
    (queryState: number) => {
      reduxAction(dispatch, { type: "SET_LOADING", arg: queryState });
    },
    [dispatch]
  );

  const setDatabaseVersion = useCallback(
    (queryState: number) => {
      reduxAction(dispatch, { type: "SET_DB_VERSION", arg: queryState });
    },
    [dispatch]
  );

  const fetchGHTag = useCallback((): void => {
    const xhr = new XMLHttpRequest();
    xhr.onload = (): void => {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          console.log("Latest GitHub: " + response.tag_name);
          reduxAction(dispatch, {
            type: "SET_VERSION_TAG",
            arg: response.tag_name
          });
        } catch (e) {
          console.log(e);
        }
      }
    };

    xhr.open("GET", GH_LATEST);
    xhr.send();
  }, [dispatch]);

  const load = useCallback((): void => {
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
  }, [setDatabaseVersion, setQueryState]);

  const fetchVersion = useCallback((): void => {
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
  }, [load, setQueryState]);

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
  }, [fetchGHTag, fetchVersion, setDatabaseVersion]);

  return <></>;
}
