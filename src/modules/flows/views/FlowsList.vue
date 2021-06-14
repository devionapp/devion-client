<template>
  <section class="FlowsList">
    <Subheader createPermission="CREATE_FLOWS" title="Fluxos" />

    <Table v-model="flows" :model="model" :headers="headers" :items="flows" />
  </section>
</template>

<script>
import Flow from "../models/Flow";
export default {
  name: "FlowsList",
  data() {
    return {
      model: new Flow(),
      flows: [],
      headers: [{ text: "Nome", value: "name" }]
    };
  },
  created() {},
  methods: {},
  computed: {}
};
</script>
