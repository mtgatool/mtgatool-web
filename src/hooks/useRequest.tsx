/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";

import { useDispatch } from "react-redux";
import { reduxAction } from "../redux/webRedux";
import { STATE_IDLE, STATE_ERROR, STATE_DOWNLOAD } from "../shared/constants";

export default function useRequest(
  defaultUrl: string
): {
  response: string | undefined;
  status: number | null;
  start: () => void;
  reset: (url?: string) => void;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
} {
  const dispatch = useDispatch();
  const [URL, setUrl] = useState<string>(defaultUrl);
  const [status, setStatus] = useState<number | null>(null);
  const [response, setResponse] = useState<string | undefined>(undefined);

  const setQueryState = useCallback(
    (queryState: number) => {
      reduxAction(dispatch, { type: "SET_LOADING", arg: queryState });
    },
    [dispatch]
  );

  const reset = useCallback((newUrl?: string) => {
    if (newUrl) {
      setUrl(newUrl);
    }
    setStatus(null);
  }, []);

  const start = useCallback(() => {
    setStatus(201);
    setQueryState(STATE_DOWNLOAD);
    const xhr = new XMLHttpRequest();
    xhr.onload = (): void => {
      if (xhr.status !== status) setStatus(xhr.status);
      if (xhr.status == 200) {
        try {
          setQueryState(STATE_IDLE);
          setResponse(xhr.responseText);
        } catch (e) {
          setQueryState(STATE_ERROR);
          console.log(e);
        }
      }
    };
    xhr.open("GET", URL);
    xhr.send();
  }, [URL, status, setQueryState]);

  return { response, status, start, setUrl, reset };
}
