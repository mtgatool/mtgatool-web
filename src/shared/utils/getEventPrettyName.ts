import database from "../database";

const premierMatch = new RegExp(/(PremierDraft)_(.+)_([0-9.]+)/);
const quickMatch = new RegExp(/(QuickDraft)_(.+)_([0-9.]+)/);
const compMatch = new RegExp(/(CompDraft)_(.+)_([0-9.]+)/);
const tradMatch = new RegExp(/(TradDraft)_(.+)_([0-9.]+)/);
const sealedMatch = new RegExp(/(Sealed)_(.+)_([0-9.]+)/);
const miscDraftMatch = new RegExp(/(.+)_(Draft)_([0-9.]+)/);
// use only as last match if others fail
const doubleDateMatch = new RegExp(/(.+)_(.+)_([0-9.]+)/);
const simpleDateMatch = new RegExp(/(.+)_([0-9.]+)/);
const simpleMatch = new RegExp(/(.+)_(.+)/);

const months = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default function getEventPrettyName(event: string): string {
  const dbEvent = database.event(event);
  if (dbEvent) return dbEvent;

  const premier = premierMatch.exec(event);
  if (premier) {
    return `Premier Draft ${premier[2]}`;
  }

  const quick = quickMatch.exec(event);
  if (quick) return `Quick Draft ${quick[2]}`;

  const comp = compMatch.exec(event);
  if (comp) return `Competitive Draft ${comp[2]}`;

  const trad = tradMatch.exec(event);
  if (trad) return `Traditional Draft ${trad[2]}`;

  const sealed = sealedMatch.exec(event);
  if (sealed) return `${sealed[2]} Sealed`;

  const misc = miscDraftMatch.exec(event);
  if (misc) return `${misc[1]} Draft`;

  const double = doubleDateMatch.exec(event);
  if (double) {
    const yy = double[3].slice(0, 4);
    const mm = parseInt(double[3].slice(4, 6));
    if (months[mm]) {
      return `${double[1]} ${double[2]} (${months[mm]} ${yy})`;
    } else {
      return `${double[1]} ${double[2]} ${double[3]}`;
    }
  }

  const simpleDate = simpleDateMatch.exec(event);
  if (simpleDate) {
    const yy = simpleDate[2].slice(0, 4);
    const mm = parseInt(simpleDate[2].slice(4, 6));
    return `${simpleDate[1]} (${months[mm]} ${yy})`;
  }

  const simple = simpleMatch.exec(event);
  if (simple) {
    return `${simple[1]} ${simple[2]}`;
  }

  return event.replace(" ", "");
}
