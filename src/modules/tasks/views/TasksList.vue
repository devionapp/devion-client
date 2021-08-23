<template>
  <section class="task-list">
    <Subheader title="Atividades" />

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
              v-for="column in columns"
              :key="column.title"
              class="column bg-gray-100 rounded-lg px-3 py-3 column-width rounded mr-4"
            >
              <p
                class="text-gray-700 font-semibold font-sans tracking-wide text-sm"
              >
                {{ column.title }}
              </p>

              <draggable
                class="column-container"
                :list="column.tasks"
                :animation="200"
                ghost-class="ghost-card"
                group="tasks"
              >
                <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
                <task-card
                  v-for="task in column.tasks"
                  :key="task.id"
                  :task="task"
                  class="mt-3 cursor-move"
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
import Flow from "../models/Flow";

export default {
  name: "App",
  components: {
    TaskCard,
    draggable
  },
  async created() {
    await this.getFlows();
  },
  methods: {
    async getFlows() {
      this.flows = await this.flowModel.loadCollection();
      // this.columns = this.flow.steps;
    }
  },
  data() {
    return {
      flowModel: new Flow(),
      flows: [],
      openedPanels: [],
      columns: [
        {
          title: "Analise",
          tasks: [
            {
              id: 1,
              title: "Criação de Conta",
              date: "14 de Setembro",
              type: "Requisito"
            }
          ]
        },
        {
          title: "Dev. Front-End",
          tasks: []
        },
        {
          title: "Dev. Back-End",
          tasks: []
        },
        {
          title: "QA",
          tasks: []
        }
      ]
    };
  }
};
</script>

<style>
.column-width {
  min-width: 320px;
  width: 320px;
}

.ghost-card {
  opacity: 0.5;
  background: #f7fafc;
  border: 1px solid #4299e1;
}

.column {
  background-color: rgb(236, 236, 236);
  height: 700px;
}

.column-container {
  width: 100%;
  height: 100%;
}
</style>
