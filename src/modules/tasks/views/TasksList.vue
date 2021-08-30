<template>
  <section class="task-list">
    <Subheader title="Atividades" />

    <ModalCard
      :show="modalCard"
      @close="modalCard = false"
      :card="selectedCard"
    />

    <v-expansion-panels multiple v-model="openedPanels">
      <v-expansion-panel
        v-for="(flow, index) in flows"
        :key="index"
        class="panel"
      >
        <v-expansion-panel-header>
          {{ flow.name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="d-flex mt-5">
            <div
              v-for="step in flow.steps"
              :key="step.title"
              class="step bg-gray-100 rounded-lg px-3 py-3 step-width rounded mr-4"
            >
              <p
                class="text-gray-700 font-semibold font-sans tracking-wide text-sm"
              >
                {{ step.title }}
              </p>

              <draggable
                class="step-container"
                :list="step.tasks"
                :animation="200"
                ghost-class="ghost-card"
                group="tasks"
                @change="change"
              >
                <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
                <task-card
                  v-for="task in step.tasks"
                  :key="task.id"
                  :task="task"
                  class="mt-3 cursor-move"
                  @openModalCard="openModalCard"
                />
                <!-- </transition-group> -->
              </draggable>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </section>
</template>

<script>
import draggable from "vuedraggable";
import TaskCard from "../components/TaskCard.vue";
import ModalCard from "../components/ModalCard.vue";
import Flow from "../models/Flow";

export default {
  name: "TasksList",
  components: {
    TaskCard,
    ModalCard,
    draggable
  },
  async created() {
    await this.getFlows();
  },
  methods: {
    async getFlows() {
      this.flows = await this.flowModel.loadCollection();
    },
    async change(log) {
      await this.$forceUpdate();
      console.log(log);
    },
    openModalCard(task) {
      this.selectedCard = task;
      this.modalCard = true;
    }
  },
  data() {
    return {
      flowModel: new Flow(),
      flows: [],
      openedPanels: [],
      selectedCard: {},
      modalCard: false
    };
  }
};
</script>

<style>
.step-width {
  min-width: 320px;
  width: 320px;
}

.ghost-card {
  opacity: 0.5;
  background: #f7fafc;
  border: 1px solid #4299e1;
}

.step {
  background-color: rgb(236, 236, 236);
  height: 700px;
}

.step-container {
  width: 100%;
  height: 100%;
}
</style>
