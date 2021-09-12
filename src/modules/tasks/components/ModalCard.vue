<template>
  <Modal
    :show="show"
    :title="card.name"
    @close="$emit('close')"
    @confirm="save"
    :width="1700"
  >
    <v-row>
      <v-col cols="6">
        <h3>Informações sobre a atividade</h3>
      </v-col>
    </v-row>
    <v-row class="mt-2">
      <v-col cols="6">
        <TextArea label="Descricão" v-model="task.description" readonly />
      </v-col>
      <v-col cols="2">
        <v-select
          label="Responsável"
          outlined
          :items="users"
          item-value="id"
          v-model="task.userId"
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
      <v-col cols="2">
        <TextField
          label="Estimativa (em horas)"
          v-model="task.estimate"
          type="number"
        />
      </v-col>
      <v-col cols="2">
        <TextField
          label="Realizado (em horas)"
          v-model="task.performed"
          type="number"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <h3>Tarefas</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <TodoList />
      </v-col>
    </v-row>
  </Modal>
</template>

<script>
import User from "../models/User";
import Requirement from "../models/Requirement";
import Task from "../models/Task";
import TodoList from "./TodoList";

export default {
  name: "ModalCard",
  components: { TodoList },
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
      model: new Task(),
      userModel: new User(),
      requirementModel: new Requirement(),
      users: [],
      task: {
        description: null,
        userId: null,
        estimate: null,
        performed: null
      }
    };
  },
  watch: {
    async show(v) {
      if (v) {
        const requirement = await this.requirementModel.loadRecord(
          this.card.requirementId
        );

        this.task = {
          ...this.task,
          ...this.card,
          ...requirement
        };
      }
    }
  },
  async created() {
    await this.getUsers();
  },
  methods: {
    async save() {
      await this.model.saveCard(this.card.id, {
        userId: this.task.userId,
        estimate: parseInt(this.task.estimate),
        performed: parseInt(this.task.performed)
      });
    },
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
