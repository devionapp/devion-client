import Model from "@/models/Model";
import store from "@/store";

export default class User extends Model {
  config() {
    return {
      resource: "users",
      storeName: "User",
      silent: true
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

  afterSave() {
    store.dispatch(
      "Snackbar/setSnackbar",
      {
        show: true,
        text: "Dados do usuário atualizados com sucesso!",
        color: "success"
      },
      { root: true }
    );
  }
}

User.use("CRUD");
