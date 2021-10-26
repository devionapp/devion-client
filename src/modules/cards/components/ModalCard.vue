<template>
  <Modal
    :show="cardData !== null"
    :title="cardData ? cardData.name : '-'"
    @close="$emit('close')"
    @confirm="save"
    :width="1800"
  >
    <v-tabs v-model="tabs">
      <template v-for="(step, index) in steps">
        <v-tab :key="index">
          <v-icon left>
            {{ step.icon }}
          </v-icon>
          {{ step.name }}
        </v-tab>
        <v-tab-item :key="index">
          <component :is="step.component" :card="cardData" />
        </v-tab-item>
      </template>
    </v-tabs>
  </Modal>
</template>

<script>
import ModalCardDadosBasicos from "./ModalCardDadosBasicos";
import ModalCardComentarios from "./ModalCardComentarios";
import ModalCardTimeLog from "./ModalCardTimeLog";
import Card from "../models/Card";

export default {
  name: "ModalCard",
  components: { ModalCardDadosBasicos, ModalCardComentarios, ModalCardTimeLog },
  props: {
    cardId: {
      type: Number,
      default: null
    }
  },
  data: () => {
    return {
      model: new Card(),
      cardData: null,
      tabs: [],
      steps: [
        {
          name: "Dados Basicos",
          component: ModalCardDadosBasicos,
          icon: "mdi-text-box"
        },
        {
          name: "Comentarios",
          component: ModalCardComentarios,
          icon: "mdi-chat"
        },
        { name: "Time Log", component: ModalCardTimeLog, icon: "mdi-clock" }
      ]
    };
  },
  async mounted() {
    this.loading = true;
    await Promise.all([this.getCard()]);
    this.loading = false;
  },
  methods: {
    async save() {
      await this.model.updateRecord(this.cardId, this.cardData);
    },
    async getCard() {
      try {
        this.cardData = await this.model.loadRecord(this.cardId);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
