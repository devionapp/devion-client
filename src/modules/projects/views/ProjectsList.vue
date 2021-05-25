<template>
  <section class="List">
    <Subheader createPermission="CREATE_PROJECTS" title="Projetos" />

    <Table
      v-model="projects"
      :model="model"
      :headers="headers"
      :items="projects"
    />
  </section>
</template>

<script>
import Project from "@/modules/projects/models/Project";
export default {
  name: "Projects",
  data() {
    return {
      model: new Project(),
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
      projects: []
    };
  },
  created() {},
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped></style>
