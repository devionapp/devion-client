import Model from "@/models/Model";

export default class CardTimeLog extends Model {
  _cardId = null;

  constructor(id) {
    super();
    this._cardId = id;
    this.setConfig();
  }

  config() {
    return {
      resource: `cards/${this._cardId}/card-time-logs`,
      storeName: "CardTimeLog"
    };
  }
}

CardTimeLog.use("CRUD");
