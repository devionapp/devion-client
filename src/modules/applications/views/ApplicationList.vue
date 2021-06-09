<template>
  <section class="List">
    <Subheader createPermission="CREATE_APPLICATIONS" title="Aplicações" />

    <Table
      v-model="applications"
      :model="model"
      :headers="headers"
      :items="applications"
      hideDelete
    />
  </section>
</template>

<script>
import Application from "@/modules/applications/models/Application";
export default {
  name: "Applications",
  data() {
    return {
      model: new Application(),
      headers: [{ text: "Nome", value: "name" }],
      applications: []
    };
  },
  created() {},
  methods: {},
  computed: {}
};
</script>
