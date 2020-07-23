import sharedCss from "../../shared.css";

export function getWinrateClass(wr: number, bright = true): string {
  if (wr > 0.65) return bright ? sharedCss.blueBright : sharedCss.blue;
  if (wr > 0.55) return bright ? sharedCss.greenBright : sharedCss.green;
  if (wr < 0.45) return bright ? sharedCss.orangeBright : sharedCss.orange;
  if (wr < 0.35) return bright ? sharedCss.redBright : sharedCss.red;
  return bright ? sharedCss.whiteBright : sharedCss.white;
}
