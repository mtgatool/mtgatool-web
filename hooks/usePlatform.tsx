import { useEffect, useState } from "react";

export default function usePlatform(): string {
  const [platform, setPlatform] = useState("Win32");

  useEffect(() => {
    setPlatform(window.navigator.platform);
  }, []);

  return platform;
}
