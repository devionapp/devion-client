<template>
  <section>
    <v-row v-if="loading">
      <v-col cols="12" class="d-flex justify-center my-3">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
    </v-row>
    <v-row class="mt-3">
      <v-col cols="12">
        <h4>Informações sobre a atividade</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="9">
        <v-row>
          <v-col cols="9">
            <TextArea label="Descricão" v-model="card.description" />
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="card.userId"
              label="Responsável"
              outlined
              :items="users"
              item-value="id"
            >
              <template #selection="{item}">
                <v-list-item-avatar color="#E0E0E0">
                  {{ item.firstName.substr(0, 1)
                  }}{{ item.lastName.substr(0, 1) }}
                </v-list-item-avatar>
                {{ item.firstName }} {{ item.lastName }}
              </template>
              <template #item="{item}">
                <v-list-item-avatar color="#E0E0E0">
                  {{ item.firstName.substr(0, 1)
                  }}{{ item.lastName.substr(0, 1) }}
                </v-list-item-avatar>
                {{ item.firstName }} {{ item.lastName }}
              </template>
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <h4>Checklist</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="9">
            <ModalCardChecklist :cardId="card.id" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="3">
        <div class="ModalCardDadosBasicos__info">
          <v-row>
            <v-col>
              <h4>Projeto</h4>
              <p>{{ card.project.name }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h4>Estimativa Total</h4>
              <p>{{ card.estimate }}h00</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h4>Total Trabalhado</h4>
              <p>{{ card.performed }}h00</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h4>Fluxo</h4>
              <p>{{ card.flow.name }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h4>Etapa Atual</h4>
              <p>{{ card.step.name }}</p>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import ModalCardChecklist from "./ModalCardChecklist";
import User from "../models/User";

export default {
  name: "ModalCardDadosBasicos",
  components: { ModalCardChecklist },
  props: {
    card: {
      type: Object,
      default: null
    }
  },
  data: () => {
    return {
      loading: true,
      users: [],
      userModel: new User()
    };
  },

  async created() {
    this.loading = true;
    await Promise.all([this.getUsers()]);
    this.loading = false;
  },
  methods: {
    async getUsers() {
      try {
        this.users = await this.userModel.loadCollection();
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.ModalCardDadosBasicos {
  &__info {
    background-color: rgb(239, 241, 245);
    border-radius: 8px;
    height: 100%;
    padding: 15px;
  }
}
</style>
