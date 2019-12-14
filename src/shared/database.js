import _ from "lodash";

// Some other things should go here later, like updating from MTGA Servers themselves.
class Database {
  constructor() {
    this.setDatabase = this.setDatabase.bind(this);
    this.card = this.card.bind(this);
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

  updateCache(data) {
    try {
    } catch (e) {
      console.log("Error updating cache", e);
    }
  }

  card(grpId) {
    return this.metadata && this.metadata.cards ? this.metadata.cards[grpId] : undefined;
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
}

export default Database.getInstance();