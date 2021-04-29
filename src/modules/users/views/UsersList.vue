<template>
  <section class="UsersList">
    <Subheader createPermission="CREATE_USERS" title="Usuários" />

    <Table v-model="users" :model="model" :headers="headers" :items="users" />
  </section>
</template>

<script>
import User from "../models/User";
export default {
  name: "UsersList",
  data() {
    return {
      model: new User(),
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "id"
        },
        { text: "Nome", value: "name" },
        { text: "E-mail", value: "email" },
        { text: "Perfil", value: "role" }
      ],
      users: []
    };
  },
  methods: {}
};
</script>
