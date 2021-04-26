<template>
  <section class="UsersList">
    <div class="d-flex align-center justify-between w-100">
      <h1 class="mr-2">Usuários</h1>

      <Button
        @click="$router.push({ name: 'usuarios.create' })"
        v-if="checkHasPermission('CREATE_USERS')"
      >
        <v-icon class="mr-2">mdi-plus</v-icon>
        Novo
      </Button>
    </div>

    <Table :headers="headers" :items="users" />
  </section>
</template>

<script>
import { mapActions } from "vuex";
import hasPermission from "@/helpers/hasPermission";

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
        { text: "Perfil", value: "role" }
      ],
      users: []
    };
  },
  async created() {
    await this.handleGetAllUsers();
  },
  methods: {
    ...mapActions("User", {
      getAllUsers: "getAllUsers"
    }),
    async handleGetAllUsers() {
      this.users = await this.getAllUsers();
    },
    checkHasPermission(permission) {
      return hasPermission(permission);
    }
  }
};
</script>
