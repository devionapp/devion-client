<template>
  <div
    class="task-card bg-white shadow rounded px-3 pt-3 pb-5 border border-white"
    @click.prevent="openModalCard"
  >
    <div class="flex justify-between">
      <h4 class="text-gray-900 font-semibold font-sans tracking-wide text-sm">
        {{ task.name }}
      </h4>
      <p>{{ task.project.name }}</p>
    </div>
    <v-chip :color="getChipColor(task.type)" small>
      {{ getTaskType(task.type) }}
    </v-chip>
  </div>
</template>
<script>
export default {
  props: {
    task: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    openModalCard() {
      this.$emit("openModalCard", this.task);
    },
    getTaskType(type) {
      if (type === "task") {
        return "Requisito";
      }
      if (type === "bug") {
        return "BUG";
      }
    },
    getChipColor(type) {
      if (type === "task") {
        return "secondary";
      }
      if (type === "bug") {
        return "error";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.task-card {
  background-color: #fff;
  cursor: pointer;

  &:hover {
    transition: all 0.3s;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
      0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
  }
}
</style>
