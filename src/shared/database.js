import _ from "lodash";

// Some other things should go here later, like updating from MTGA Servers themselves.
class Database {
  constructor() {
    this.setDatabase = this.setDatabase.bind(this);
    this.card = this.card.bind(this);
    this.ability = this.ability.bind(this);
    this.eventName = this.eventName.bind(this);
    //const defaultDb = fs.readFileSync(dbUri, "utf8");
    //this.setDatabase(defaultDb);
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  setDatabase(arg) {
    try {
      this.metadata = JSON.parse(arg);
    } catch (e) {
      console.log("Error parsing metadata", e);
    }
  }
  /*
  updateCache(data) {
    try {
    } catch (e) {
      console.log("Error updating cache", e);
    }
  }
  */
  card(grpId) {
    return this.metadata && this.metadata.cards
      ? this.metadata.cards[grpId]
      : undefined;
  }

  ability(abId) {
    return this.metadata && this.metadata.abilities
      ? this.metadata.abilities[abId]
      : undefined;
  }

  get sets() {
    if (!this.metadata) {
      return {};
    }

    return _.pickBy(
      this.metadata.sets,
      (set, setName) => set && setName && set.code
    );
  }

  get version() {
    return this.metadata ? this.metadata.version : 0;
  }

  eventName(evid) {
    return this.metadata.events[evid] ? this.metadata.events[evid] : evid;
  }
}

export default Database.getInstance();
