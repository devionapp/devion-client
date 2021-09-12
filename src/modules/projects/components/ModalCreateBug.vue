<template>
  <Modal
    :show="show"
    :title="`Criar BUG para: ${requirement.name}`"
    @close="$emit('close')"
    @confirm="createTasks"
  >
    <v-row class="mt-2">
      <v-col cols="12" lg="5">
        <Select
          :items="flows"
          label="Fluxo"
          itemText="name"
          itemValue="id"
          v-model="task.flowId"
        />
      </v-col>
      <v-col cols="12" lg="5">
        <v-select
          outlined
          label="Nivel de skill necessária"
          item-text="description"
          item-value="id"
          :items="niveis"
          v-model="task.skillLevel"
        >
          <template v-slot:item="data" @click="data.select">
            <v-list dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>{{ data.item.id }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-subtitle
                    v-html="data.item.description"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </template>
        </v-select>
      </v-col>
    </v-row>
  </Modal>
</template>

<script>
import Flow from "../models/Flow";
import Card from "../models/Card";

export default {
  name: "ModalCreateBug",
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    requirement: {
      type: Object,
      required: true,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      flowModel: new Flow(),
      cardModel: new Card(),
      flows: [],
      steps: [],
      task: {
        flowId: null,
        skillLevel: null,
        type: "bug",
        requirementId: null,
        name: this.requirement.name
      },
      niveis: [
        {
          id: 1,
          description: "Nivel Iniciante"
        },
        {
          id: 2,
          description: "Nivel Básico/Júnior"
        },
        {
          id: 3,
          description: "Nivel Intermediário/Pleno"
        },
        {
          id: 4,
          description: "Nivel Avançado/Sênior"
        }
      ]
    };
  },
  async created() {
    this.flows = await this.flowModel.loadCollection();
  },
  methods: {
    async createTasks() {
      this.task.name = this.requirement.name;
      this.task.requirementId = this.requirement.id;
      await this.cardModel.insertRecord(this.task);
      this.$emit("close");
    }
  }
};
</script>
