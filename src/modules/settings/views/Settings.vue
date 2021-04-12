<template>
  <section class="Settings">
    <h2 class="mb-4">Configurações</h2>

    <h3 class="mb-2">Dados da empresa</h3>
    <v-row>
      <v-col cols="12" lg="4">
        <TextField label="Razão Social" />
      </v-col>
      <v-col cols="12" lg="4">
        <TextField label="Nome Fantasia" />
      </v-col>
      <v-col cols="12" lg="3">
        <TextField label="CNPJ" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4">
        <TextField label="Nome responsável" />
      </v-col>
      <v-col cols="12" lg="4">
        <TextField label="E-mail" />
      </v-col>
    </v-row>

    <InviteNewUser />
  </section>
</template>

<script>
import InviteNewUser from "../components/InviteNewUser";
export default {
  name: "Settings",
  components: { InviteNewUser },
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {}
};
</script>
