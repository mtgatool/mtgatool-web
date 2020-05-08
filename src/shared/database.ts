import _ from "lodash";
import { Metadata, DbCardData, CardSet } from "../types/Metadata";

// Some other things should go here later, like updating from MTGA Servers themselves.
class Database {
  private static instance: Database;
  public metadata: Metadata | undefined;

  constructor() {
    this.setDatabase = this.setDatabase.bind(this);
    this.card = this.card.bind(this);
    this.ability = this.ability.bind(this);
    this.eventName = this.eventName.bind(this);
    //const defaultDb = fs.readFileSync(dbUri, "utf8");
    //this.setDatabase(defaultDb);
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  setDatabase(arg: string): void {
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
  card(grpId: number): DbCardData | undefined {
    return this.metadata && this.metadata.cards
      ? this.metadata.cards[grpId]
      : undefined;
  }

  ability(abId: number): string | undefined {
    return this.metadata && this.metadata.abilities
      ? this.metadata.abilities[abId]
      : undefined;
  }

  get sets(): { [id: string]: CardSet } {
    if (!this.metadata) {
      return {};
    }

    return _.pickBy(
      this.metadata.sets,
      (set, setName) => set && setName && set.code
    );
  }

  get version(): number {
    return this.metadata ? this.metadata.version : 0;
  }

  eventName(evid: string): string {
    return this.metadata?.events[evid] ? this.metadata.events[evid] : evid;
  }
}

export default Database.getInstance();
