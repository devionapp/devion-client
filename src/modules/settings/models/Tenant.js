import Model from "@/models/Model";
import store from "@/store";
export default class Tenant extends Model {
  config() {
    return {
      resource: "tenants",
      storeName: "Tenant",
      silent: true
    };
  }

  afterSave() {
    store.dispatch(
      "Snackbar/setSnackbar",
      {
        show: true,
        text: "Dados da empresa atualizados com sucesso!",
        color: "success"
      },
      { root: true }
    );
  }
}

Tenant.use("CRUD");
