<template>
  <section class="List">
    <Subheader createPermission="CREATE_PROJECTS" title="Projetos" />

    <Table
      v-model="projects"
      :model="model"
      :headers="headers"
      :items="projects"
      hideDelete
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
        { text: "Nome", value: "name" },
        { text: "Tipo", value: "type" }
      ],
      projects: []
    };
  },
  created() {},
  methods: {},
  computed: {}
};
</script>
