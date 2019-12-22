import db from "./database";

export function getCardTypeSort(a) {
  if (a == undefined) return 0;
  if (a.includes("Creature", 0)) return 1;
  if (a.includes("Planeswalker", 0)) return 2;
  if (a.includes("Instant", 0)) return 3;
  if (a.includes("Sorcery", 0)) return 4;
  if (a.includes("Artifact", 0)) return 5;
  if (a.includes("Enchantment", 0)) return 6;
  if (a.includes("Land", 0)) return 7;
  if (a.includes("Special", 0)) return 8;
  return 0;
}

export function compareCards(a, b) {
  // Yeah this is lazy.. I know
  a = db.card(a.id);
  b = db.card(b.id);

  if (!a) return 1;
  if (!b) return -1;

  var _as = getCardTypeSort(a.type);
  var _bs = getCardTypeSort(b.type);

  // Order by type?
  if (_as < _bs) {
    return -1;
  }
  if (_as > _bs) {
    return 1;
  }

  // by cmc
  if (a.cmc < b.cmc) {
    return -1;
  }
  if (a.cmc > b.cmc) {
    return 1;
  }

  // then by name
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }

  return 0;
}

export function getSetCode(set) {
  if (set == undefined) return "";
  let s = db.sets[set].code;
  if (s == undefined) s = set;
  return s;
}

export function objectClone(originalObject) {
  return JSON.parse(JSON.stringify(originalObject));
}

export function getRankIndex(_rank, _tier) {
  var ii = 0;
  if (_rank == "Unranked") ii = 0;
  if (_rank == "Bronze") ii = 1 + (_tier - 1); //1 2 3 4
  if (_rank == "Silver") ii = 5 + (_tier - 1); //5 6 7 8
  if (_rank == "Gold") ii = 9 + (_tier - 1); //9 0 1 2
  if (_rank == "Platinum") ii = 13 + (_tier - 1); //3 4 5 6
  if (_rank == "Diamond") ii = 17 + (_tier - 1); //7 8 9 0
  if (_rank == "Mythic") ii = 21 + (_tier - 1); //1 2 3 4
  return ii;
}
