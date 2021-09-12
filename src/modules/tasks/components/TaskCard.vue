<template>
  <div
    class="task-card bg-white shadow rounded px-3 pt-3 pb-5 border border-white"
    @dblclick="openModalCard"
  >
    <div class="flex justify-between">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
        {{ task.name }}
      </p>
    </div>
    <div class="flex mt-4 justify-between items-center">
      <span class="text-sm text-gray-600">{{ task.date }}</span>

      <v-chip :color="getChipColor(task.type)" small>
        {{ getTaskType(task.type) }}
      </v-chip>
    </div>
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
}
</style>
