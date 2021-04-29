import Model from "@/models/Model";
import store from "@/store";
import HttpRequest from "../../../services/http/HttpRequest";
export default class User extends Model {
  config() {
    return {
      resource: "users",
      storeName: "User"
    };
  }

  async beforeSave(record) {
    delete record?.skill;
    delete record?.skillLevel;
    delete record?.tenant;
    delete record?.role;
    delete record?.name;

    if (record.birthday) {
      record.birthday = new Date(record.birthday);
    }

    return record;
  }

  async prepareCollectionOnLoad(collection) {
    collection.forEach(record => {
      record.name = `${record.firstName}  ${record.lastName}`;

      switch (record.roleId) {
        case 1:
          record.role = "Administrador";
          break;
        case 2:
          record.role = "Gestor";
          break;
        case 3:
          record.role = "Colaborador";
          break;
        case 4:
          record.role = "Consultor";
          break;
      }
    });

    return collection;
  }

  async insertRecord(record) {
    record = await this.beforeSave(record);
    record.tenantId = store.getters["User/getUser"].tenantId;
    const { data } = await HttpRequest("signup", this.baseURL).post("", record);
    return Promise.resolve(data);
  }
}

User.use("CRUD");
