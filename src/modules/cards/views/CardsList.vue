<template>
  <section class="CardsList" ref="panelContent">
    <Subheader title="Atividades" />

    <ModalCard
      v-if="selectedCard !== null"
      @close="selectedCard = null"
      :cardId="selectedCard"
    />
    <ModalFlow
      v-if="showAddFlowModal !== false"
      @close="showAddFlowModal = false"
      :show="showAddFlowModal"
    />

    <v-card class="CardsList__card">
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
                  <Card
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
        <!-- <template>
          <Button
            color="success"
            class="mt-5 mx-2"
            rounded
            small
            @click="addFlow"
          >
            <v-icon>
              mdi-plus
            </v-icon>
            Novo Fluxo
          </Button>
        </template> -->
      </v-tabs>
    </v-card>
  </section>
</template>

<script>
import draggable from "vuedraggable";
import Card from "../components/Card.vue";
import ModalCard from "../components/ModalCard.vue";
import ModalFlow from "../components/ModalFlow.vue";
import Flow from "../models/Flow";
import CardModel from "../models/Card";

export default {
  name: "CardsList",
  data() {
    return {
      model: new CardModel(),
      flowModel: new Flow(),
      tabs: [],
      flows: [],
      openedPanels: [],
      selectedCard: null,
      showAddFlowModal: false,
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
    Card,
    ModalCard,
    draggable,
    ModalFlow
  },
  async created() {
    await this.getFlows();
  },
  methods: {
    async getFlows() {
      this.flows = await this.flowModel.loadCollection({});
    },
    async filter() {
      const cards = await this.flowModel.getTasks(
        this.flows[this.tabs],
        this.filters
      );

      this.flows[this.tabs].steps.map(step => {
        step.title = step.name;
        step.tasks = cards.filter(t => t.stepId === step.id);
      });
    },
    async change(element, step) {
      await this.$forceUpdate();
      if (element?.added) {
        await this.model.changeStep(element.added.element.id, step.id);
      }
    },
    openModalCard(task) {
      this.selectedCard = task.id;
    },
    addFlow() {
      this.showAddFlowModal = true;
    }
  }
};
</script>

<style lang="scss">
.CardsList {
  &__card {
    min-height: 400px;

    .v-tabs {
      min-height: 400px;
    }
  }
}

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

.step {
  overflow: auto;
  display: flex;
  flex-direction: column;

  .step-container {
    width: 100%;
    height: 100%;
  }
}

.expansion-panel-content {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 30px;
}
</style>
