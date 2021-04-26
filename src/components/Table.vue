<template>
  <v-data-table
    v-bind="$attrs"
    :headers="headers"
    :items="items"
    :items-per-page="itemsPerPage"
    class="Table elevation-1"
  />
</template>

<script>
export default {
  name: "Table",
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {}
};
</script>
