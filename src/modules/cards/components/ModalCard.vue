<template>
  <Modal
    :show="cardData !== null"
    :title="cardData ? cardData.name : '-'"
    @close="$emit('close')"
    @confirm="save"
    :width="1800"
  >
    <v-row v-if="loading">
      <v-col cols="12" class="d-flex justify-center my-3">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
    </v-row>
    <v-row class="ModalCard" v-else>
      <v-col cols="9">
        <v-tabs v-model="tabs">
          <template v-for="(step, index) in steps">
            <v-tab :key="index">
              <v-icon left>
                {{ step.icon }}
              </v-icon>
              {{ step.name }}
            </v-tab>
            <v-tab-item :key="index">
              <component
                :is="step.component"
                :card="cardData"
                @update="getCard"
              />
            </v-tab-item>
          </template>
        </v-tabs>
      </v-col>
      <v-col cols="3">
        <div class="ModalCard__info">
          <v-row>
            <v-col>
              <h4>Projeto</h4>
              <p>{{ cardData ? cardData.project.name : `-` }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h4>Estimativa</h4>
              <p>{{ cardData ? cardData.estimate : `0` }}h</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h4>Total Trabalhado</h4>
              <p>{{ cardData ? cardData.performed : `0` }}h</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h4>Fluxo</h4>
              <p>{{ cardData ? cardData.flow.name : `-` }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h4>Etapa Atual</h4>
              <p>{{ cardData ? cardData.step.name : `-` }}</p>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
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
      loading: true,
      tabs: [],
      steps: [
        {
          name: "Dados Basicos",
          component: ModalCardDadosBasicos,
          icon: "mdi-text-box"
        },
        // {
        //   name: "Comentarios",
        //   component: ModalCardComentarios,
        //   icon: "mdi-chat"
        // },
        { name: "Time Log", component: ModalCardTimeLog, icon: "mdi-clock" }
      ]
    };
  },
  async mounted() {
    this.loading = true;
    await this.getCard();
    this.loading = false;
  },
  methods: {
    async save() {
      try {
        this.cardData.estimate = parseInt(this.cardData.estimate);
        await this.model.updateRecord(this.cardId, this.cardData);
        this.$emit("close");
      } catch (error) {
        console.error(error);
      }
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

<style lang="scss" scoped>
.ModalCard {
  &__info {
    background-color: rgb(239, 241, 245);
    border-radius: 8px;
    height: 100%;
    padding: 15px;
  }
}
</style>
