import Model from "@/models/Model";

export default class Card extends Model {
  config() {
    return {
      resource: "cards",
      storeName: "Card"
    };
  }

  async saveCard(id, card) {
    await this.request.patch(`${id}`, card);
  }

  async changeStep(id, step) {
    await this.request.patch(`${id}`, { stepId: step });
  }
}
Card.use("CRUD");
