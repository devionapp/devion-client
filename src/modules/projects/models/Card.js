import Model from "@/models/Model";
export default class Card extends Model {
  config() {
    return {
      resource: "cards",
      storeName: "Card"
    };
  }
}

Card.use("CRUD");
