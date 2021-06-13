<template>
  <section class="FlowsList">
    <Subheader createPermission="CREATE_FLOWS" title="Flows" />

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
