<template>
  <Modal :show="show" :title="card.name" @close="$emit('close')" :width="1700">
    <v-row>
      <v-col cols="6">
        <h3>Informações sobre a atividade</h3>
      </v-col>
    </v-row>
    <v-row class="mt-2">
      <v-col cols="6">
        <TextArea label="Descricão" v-model="task.description" readonly />
      </v-col>
      <v-col cols="3">
        <v-select
          label="Responsável"
          outlined
          :items="users"
          v-model="task.user"
        >
          <template #selection="{item}">
            <v-list-item-avatar color="#E0E0E0">
              {{ item.firstName.substr(0, 1) }}{{ item.lastName.substr(0, 1) }}
            </v-list-item-avatar>
            {{ item.firstName }} {{ item.lastName }}
          </template>
          <template #item="{item}">
            <v-list-item-avatar color="#E0E0E0">
              {{ item.firstName.substr(0, 1) }}{{ item.lastName.substr(0, 1) }}
            </v-list-item-avatar>
            {{ item.firstName }} {{ item.lastName }}
          </template>
        </v-select>
      </v-col>
    </v-row>
  </Modal>
</template>

<script>
import User from "../models/User";
import Requirement from "../models/Requirement";

export default {
  name: "ModalCard",
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    card: {
      type: Object,
      required: true,
      default() {
        return {};
      }
    }
  },
  data: () => {
    return {
      userModel: new User(),
      requirementModel: new Requirement(),
      users: [],
      task: {
        description: null,
        user: null
      }
    };
  },
  computed: {},
  watch: {
    async show(v) {
      if (v) {
        const requirement = await this.requirementModel.loadRecord(
          this.card.requirementId
        );

        this.task = {
          ...this.task,
          ...requirement
        };
      }
    }
  },
  async created() {
    await this.getUsers();
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
