<template>
  <section class="UsersList">
    <Subheader createPermission="CREATE_USERS" title="Usuários" />

    <Table
      v-model="users"
      :getFunction="getAllUsers"
      :deleteFunction="deleteUser"
      :headers="headers"
      :items="users"
    />
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "UsersList",
  data() {
    return {
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
  methods: {
    ...mapActions("User", {
      getAllUsers: "getAllUsers",
      deleteUser: "deleteUser"
    })
  }
};
</script>
