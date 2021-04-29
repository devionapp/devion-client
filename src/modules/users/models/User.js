import Model from "@/models/Model";
import store from "@/store";
export default class User extends Model {
  config() {
    return {
      resource: "users",
      storeName: "User"
    };
  }

  beforeUpdate(record) {
    delete record.skill;
    delete record.skillLevel;
    delete record.tenant;
    delete record.tenantId;
    delete record.role;
    delete record.name;
    return record;
  }

  async prepareCollectionOnLoad(collection) {
    collection.forEach(record => {
      record.name = `${record.firstName}  ${record.lastName}`;
    });

    return collection;
  }

  async insertRecord(record) {
    delete record.skill;
    delete record.skillLevel;
    record.tenantId = store.getters["User/getUser"].tenantId;
    const { data } = await this.request("/signup");
    return Promise.resolve(data);
  }
}

User.use("CRUD");
