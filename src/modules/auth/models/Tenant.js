import Model from "@/models/Model";

export default class Tenant extends Model {
  config() {
    return {
      resource: "tenants",
      storeName: "Tenant",
      silent: true
    };
  }
}

Tenant.use("CRUD");
