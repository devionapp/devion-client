<template>
  <section class="SkillsList">
    <Subheader createPermission="CREATE_SKILLS" title="Skills" />

    <Table v-model="skills" :model="model" :headers="headers" :items="skills" />
  </section>
</template>

<script>
import Skill from "../models/Skill";
export default {
  name: "SkillsList",
  data() {
    return {
      model: new Skill(),
      skills: [],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "id"
        },
        { text: "Nome", value: "description" }
      ]
    };
  },
  created() {},
  methods: {},
  computed: {}
};
</script>

<style lang="scoped"></style>
