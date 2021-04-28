<template>
  <v-data-table
    v-bind="$attrs"
    :loading="loading"
    :headers="computedHeaders"
    :items="items"
    :items-per-page="itemsPerPage"
    class="Table elevation-1"
  >
    <template #item.actions="{ item }">
      <v-icon class="mr-2" @click="editItem(item.id)" v-if="!hideEdit">
        mdi-pencil
      </v-icon>
      <v-icon @click="deleteItem(item.id)" v-if="!hideDelete">
        mdi-delete
      </v-icon>
    </template>
    <template #no-data> </template>
  </v-data-table>
</template>

<script>
export default {
  name: "Table",
  props: {
    value: {
      type: Array,
      required: false,
      default: null
    },
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
    },
    deleteFunction: {
      type: Function,
      required: false,
      default: null
    },
    getFunction: {
      type: Function,
      required: false,
      default: null
    },
    hideEdit: {
      type: Boolean,
      required: false,
      default: null
    },
    hideDelete: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      loading: false
    };
  },
  async created() {
    await this.handleGetFunction();
  },
  methods: {
    async handleGetFunction() {
      this.loading = true;
      const response = await this.getFunction();
      this.$emit("input", response);
      this.loading = false;
    },
    editItem(id) {
      this.$router.push({
        name: `${this.$route.name}.edit`,
        params: { id: id }
      });
    },
    async deleteItem(id) {
      await this.deleteFunction(id);
      await this.handleGetFunction();
    }
  },
  computed: {
    computedHeaders() {
      return [
        ...this.headers,
        { text: "Ações", value: "actions", sortable: false, align: "end" }
      ];
    }
  }
};
</script>
