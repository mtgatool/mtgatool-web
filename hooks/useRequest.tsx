import { useCallback, useState } from "react";

export default function useRequest(defaultUrl: string): {
  response: string | undefined;
  status: number | null;
  start: (url?: string) => void;
  reset: (url?: string) => void;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
} {
  const [URL, setUrl] = useState<string>(defaultUrl);
  const [status, setStatus] = useState<number | null>(null);
  const [response, setResponse] = useState<string | undefined>(undefined);

  const reset = useCallback((newUrl?: string) => {
    if (newUrl) {
      setUrl(newUrl);
    }
    setResponse(undefined);
    setStatus(null);
  }, []);

  const start = useCallback(
    (url?: string) => {
      setStatus(201);
      const xhr = new XMLHttpRequest();
      xhr.onload = (): void => {
        if (xhr.status !== status) setStatus(xhr.status);
        if (xhr.status === 200) {
          try {
            // console.log(xhr.responseText);
            setResponse(xhr.responseText);
          } catch (e) {
            console.log(e);
          }
        }
      };
      xhr.open("GET", url || URL);
      xhr.send();
      if (url) {
        setUrl(url);
      }
    },
    [URL, status]
  );

  return { response, status, start, setUrl, reset };
}
