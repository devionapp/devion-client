<template>
  <section class="task-list" ref="panelContent">
    <Subheader title="Atividades" />

    <ModalCard
      :show="modalCard"
      @close="modalCard = false"
      :card="selectedCard"
    />

    <v-card class="w-100">
      <v-toolbar color="secondary" dark flat prominent height="80">
        <v-row
          class="d-flex align-center justify-end"
          style="width:100%;height:100%;margin:0;"
        >
          <v-col cols="2">
            <v-select
              class="mx-4"
              flat
              :items="typeOptions"
              hide-details
              label="Tipo"
              item-text="label"
              item-value="id"
              v-model="filters.where.type"
              prepend-inner-icon="mdi-magnify"
              solo-inverted
              clearable
              dense
            />
          </v-col>

          <v-col cols="1">
            <Button dense @click="filter" color="primary">
              Filtrar
            </Button>
          </v-col>
        </v-row>
      </v-toolbar>
      <v-tabs vertical v-model="tabs" background-color="secondary" dark>
        <template v-for="(flow, index) in flows">
          <v-tab :key="index">
            <v-icon left>
              mdi-sitemap
            </v-icon>
            {{ flow.name }}
          </v-tab>
          <v-tab-item :key="index">
            <div class="expansion-panel-content" :ref="`panelContent-${index}`">
              <div
                v-for="step in flow.steps"
                :key="step.title"
                :class="[
                  `step bg-gray-100 rounded-lg px-3 py-3 step-width rounded mr-4`,
                  { isFinish: step.isFinish }
                ]"
              >
                <p class="step__title">
                  {{ step.title }}
                </p>

                <draggable
                  class="step-container"
                  :list="step.tasks"
                  :animation="200"
                  ghost-class="ghost-card"
                  group="tasks"
                  @change="change($event, step)"
                >
                  <task-card
                    v-for="task in step.tasks"
                    :key="task.id"
                    :task="task"
                    class="mt-3 cursor-move"
                    @openModalCard="openModalCard"
                  />
                </draggable>
              </div>
            </div>
          </v-tab-item>
        </template>
      </v-tabs>
    </v-card>
  </section>
</template>

<script>
import draggable from "vuedraggable";
import TaskCard from "../components/TaskCard.vue";
import ModalCard from "../components/ModalCard.vue";
import Flow from "../models/Flow";
import Task from "../models/Task";

export default {
  name: "TasksList",
  data() {
    return {
      model: new Task(),
      flowModel: new Flow(),
      tabs: [],
      flows: [],
      openedPanels: [],
      selectedCard: {},
      modalCard: false,
      typeOptions: [
        {
          id: "task",
          label: "Requisito"
        },
        {
          id: "bug",
          label: "BUG"
        }
      ],
      filters: {
        where: {
          type: null
        }
      }
    };
  },
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
      this.flows = await this.flowModel.loadCollection({});
    },
    async filter() {
      const tasks = await this.flowModel.getTasks(
        this.flows[this.tabs],
        this.filters
      );

      this.flows[this.tabs].steps.map(step => {
        step.title = step.name;
        step.tasks = tasks.filter(t => t.stepId === step.id);
      });
    },
    async change(element, step) {
      await this.$forceUpdate();
      if (element?.added) {
        await this.model.changeStep(element.added.element.id, step.id);
      }
    },
    openModalCard(task) {
      this.selectedCard = task;
      this.modalCard = true;
    }
  }
};
</script>

<style lang="scss">
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
  height: 560px;

  &__title {
    font-weight: bold;
  }

  &.isFinish {
    background-color: rgb(231, 248, 218);
  }
}

.step-container {
  width: 100%;
  height: 100%;
}

.expansion-panel-content {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 30px;
}
</style>
