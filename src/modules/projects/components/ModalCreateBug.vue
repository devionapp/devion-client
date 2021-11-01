<template>
  <Modal
    :show="show"
    :title="`Criar BUG para: ${requirement.name}`"
    @close="$emit('close')"
    width="600"
    @confirm="createBug"
  >
    <v-row class="mt-2">
      <v-col>
        <TextField label="Descrição" v-model="bug.name" />
      </v-col>
    </v-row>
    <v-row class="mt-2">
      <v-col cols="12">
        <Select
          :items="flows"
          label="Fluxo"
          itemText="name"
          itemValue="id"
          v-model="bug.flowId"
        />
      </v-col>
      <!-- <v-col cols="12" lg="6">
        <v-select
          outlined
          label="Nivel de skill necessária"
          item-text="description"
          item-value="id"
          :items="niveis"
          v-model="bug.skillLevel"
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
      </v-col> -->
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
    },
    projectId: {
      type: Number,
      required: true,
      default: null
    }
  },
  data() {
    return {
      flowModel: new Flow(),
      cardModel: new Card(),
      flows: [],
      steps: [],
      bug: {
        flowId: null,
        skillLevel: null,
        type: "bug",
        requirementId: null,
        name: null
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
    async createBug() {
      this.bug.requirementId = this.requirement.id;
      this.bug.projectId = this.projectId;
      this.bug.skillLevel = 1;
      await this.cardModel.insertRecord(this.bug);
      this.$emit("close");
    }
  }
};
</script>
