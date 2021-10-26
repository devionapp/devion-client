import Model from "@/models/Model";

export default class Card extends Model {
  _cardId = null;

  constructor(id) {
    super();
    this._cardId = id;
    this.setConfig();
  }

  config() {
    return {
      resource: `cards/${this._cardId}/card-checklists`,
      storeName: "Card"
    };
  }

  async getChecklist(id) {
    const where = {
      cardId: id
    };
    return (await this.request.get(`/?where=${JSON.stringify(where)}`)).data;
  }
  async deleteChecklistItem(id) {
    const where = {
      id: id
    };
    await this.request.delete(`/?where=${JSON.stringify(where)}`);
  }
}
Card.use("CRUD");
