import CardsList from "./cardsList";
import Colors from "./colors";
import {
  compareCards,
  getSetCode,
  objectClone
} from "./util";

import db from './database';
import getSets from './getSets';
const DEFAULT_TILE = 67003;

class Deck {
  constructor(mtgaDeck = {}, main = [], side = []) {
    if (!mtgaDeck.mainDeck) mtgaDeck.mainDeck = [];
    if (!mtgaDeck.sideboard) mtgaDeck.sideboard = [];
    if (main.length > 0) mtgaDeck.mainDeck = main;
    if (side.length > 0) mtgaDeck.sideboard = side;

    this.mainboard = new CardsList(mtgaDeck.mainDeck);
    this.sideboard = new CardsList(mtgaDeck.sideboard);
    this.commandZoneGRPIds = mtgaDeck.commandZoneGRPIds || [];
    this.name = mtgaDeck.name || "";
    this.id = mtgaDeck.id || "";
    this.lastUpdated = mtgaDeck.lastUpdated || "";
    this.tile = mtgaDeck.deckTileId ? mtgaDeck.deckTileId : DEFAULT_TILE;
    this._colors = this.getColors();
    this.tags = mtgaDeck.tags || [mtgaDeck.format];
    this.custom = mtgaDeck.custom || false;
    this.archetype = mtgaDeck.archetype || "";

    //this.sortMainboard(compare_cards);
    //this.sortSideboard(compare_cards);

    return this;
  }

  /**
   * returns the colors of this deck, or creates a new colors object
   * if not defined yet.
   **/
  get colors() {
    return this._colors;
  }
  
  /**
   * Sort the mainboard of this deck.
   * @param func sort function.
   */
  sortMainboard(func) {
    this.mainboard.get().sort(func);
  }

  /**
   * Sort the sideboard of this deck.
   * @param func sort function.
   */
  sortSideboard(func) {
    this.sideboard.get().sort(func);
  }

  getMainboard() {
    return this.mainboard;
  }

  getSideboard() {
    return this.sideboard;
  }

  getName() {
    return this.name;
  }
  
  /**
   * Returns if this deck has a commander (0) or the number of commanders it has.
   */
  hasCommander() {
    return this.commandZoneGRPIds.length / 2;
  }

  /**
   * Get the commander GrpId
   * @param pos position (default is first)
   */
  getCommanderId(pos = 0) {
    return this.commandZoneGRPIds[pos * 2];
  }

  /**
   * Return the raw commandZoneGRPIds array for later use.
   */
  getCommanders() {
    return this.commandZoneGRPIds;
  }

  /**
   * returns a clone of this deck, not referenced to this instance.
   **/
  clone() {
    let main = objectClone(this.mainboard.get());
    let side = objectClone(this.sideboard.get());

    let obj = {
      name: this.name,
      id: this.id,
      lastUpdated: this.lastUpdated,
      deckTileId: this.tile,
      tags: this.tags,
      custom: this.custom,
      commandZoneGRPIds: this.commandZoneGRPIds
    };

    let ret = new Deck(objectClone(obj), main, side);

    return ret;
  }

  /**
   * Returns a Color class based on the colors of the cards within
   * the mainboard or, if specified, the sideboard.
   * By default it only counts the mainboard.
   * @param countMainboard weter or not to count the mainboard cards.
   * @param countSideboard weter or not to count the sideboard cards.
   */
  getColors(countMainboard = true, countSideboard = false) {
    this._colors = new Colors();

    if (countMainboard) {
      let mainboardColors = this.mainboard.getColors();
      this._colors.addFromColor(mainboardColors);
    }

    if (countSideboard) {
      let sideboardColors = this.sideboard.getColors();
      this._colors.addFromColor(sideboardColors);
    }

    return this._colors;
  }

  /**
   * Returns a txt format string of this deck.
   **/
  getExportTxt() {
    let str = "";
    let mainList = this.mainboard.removeDuplicates(false);
    mainList.forEach(function(card) {
      let grpid = card.id;
      let card_name = (db.card(grpid)).name;

      str += (card.measurable ? card.quantity : 1) + " " + card_name + "\r\n";
    });

    str += "\r\n";

    let sideList = this.sideboard.removeDuplicates(false);
    sideList.forEach(function(card) {
      let grpid = card.id;
      let card_name = (db.card(grpid)).name;

      str += (card.measurable ? card.quantity : 1) + " " + card_name + "\r\n";
    });

    return str;
  }

  /**
   * Returns a string to import in MTG Arena
   */
  getExportArena() {
    let str = "";
    let listMain = this.mainboard.removeDuplicates(false);
    listMain.forEach(function(card) {
      let grpid = card.id;
      let cardObj = db.card(grpid);

      if (cardObj.set == "Mythic Edition") {
        grpid = (cardObj.reprints)[0];
        cardObj = db.card(grpid);
      }

      let card_name = cardObj.name;
      let card_set = cardObj.set;
      let card_cn = cardObj.cid;
      let card_q = card.measurable ? card.quantity : 1;

      let sets = getSets();
      let set_code = sets ? sets[card_set].arenacode : false || getSetCode(card_set);
      str += `${card_q} ${card_name} (${set_code}) ${card_cn} \r\n`;
    });

    str += "\r\n";

    let listSide = this.sideboard.removeDuplicates(false);
    listSide.forEach(function(card) {
      let grpid = card.id;
      let cardObj = db.card(grpid);

      if (cardObj.set == "Mythic Edition") {
        grpid = (cardObj.reprints)[0];
        cardObj = db.card(grpid);
      }

      let card_name = cardObj.name;
      let card_set = cardObj.set;
      let card_cn = cardObj.cid;
      let card_q = card.measurable ? card.quantity : 1;

      let sets = getSets();
      let set_code = sets ? sets[card_set].arenacode : false || getSetCode(card_set);
      str += `${card_q} ${card_name} (${set_code}) ${card_cn} \r\n`;
    });

    return str;
  }
  
  /**
   * Returns a copy of this deck as an object.
   */
  getSave() {
    return objectClone(this.getSaveRaw());
  }
  
  /**
   * Returns a copy of this deck as an object, but maintains variables references.
   */
  getSaveRaw() {
    return {
      mainDeck: this.mainboard.get(),
      sideboard: this.sideboard.get(),
      name: this.name,
      id: this.id,
      lastUpdated: this.lastUpdated,
      deckTileId: this.tile,
      colors: this.colors.get(),
      tags: this.tags || [],
      custom: this.custom,
      commandZoneGRPIds: this.commandZoneGRPIds
    };
  }
  
  /**
   * Returns a unique string for this deck. (not hashed)
   * @param checkSide weter or not to use the sideboard (default: true)
   */
  getUniqueString(checkSide = true) {
    this.sortMainboard(compareCards);
    this.sortSideboard(compareCards);

    let str = "";
    this.mainboard.get().forEach(card => {
      str += card.id + "," + card.quantity + ",";
    });

    if (checkSide) {
      this.sideboard.get().forEach(card => {
        str += card.id + "," + card.quantity + ",";
      });
    }

    return str;
  }
}

export default Deck;
