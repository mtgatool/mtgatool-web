import sharedCss from "../../shared.css";

export function getRankColorClass(rank: string): string {
  switch (rank) {
    case "A+":
    case "A":
      return sharedCss.blue;
    case "A-":
    case "B+":
    case "B":
      return sharedCss.green;
    case "B-":
    case "C+":
    case "C":
    default:
      return sharedCss.white;
    case "C-":
    case "D+":
    case "D":
      return sharedCss.orange;
    case "D-":
    case "F":
      return sharedCss.red;
  }
}
