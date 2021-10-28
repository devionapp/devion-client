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
      <v-col cols="12">
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
          <v-col cols="3">
            <TextField
              label="Estimativa"
              type="number"
              v-model="card.estimate"
            />
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
