import "../../shared.css";

export function getWinrateClass(wr: number, bright = true): string {
  if (wr > 0.65) return bright ? "blueBright" : "blue";
  if (wr > 0.55) return bright ? "greenBright" : "green";
  if (wr < 0.45) return bright ? "orangeBright" : "orange";
  if (wr < 0.35) return bright ? "redBright" : "red";
  return bright ? "whiteBright" : "white";
}
