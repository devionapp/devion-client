<template>
  <Modal
    :show="show"
    :title="`Gerar Atividades - ${requirement.name}`"
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
          v-model="flow"
        />
      </v-col>
    </v-row>

    <v-row v-for="(step, index) in steps" :key="index">
      <v-col cols="3" class="d-flex justify-start align-center pb-5">
        <h3 class="text-center mb-5">{{ step.index }}. {{ step.name }}</h3>
      </v-col>
      <v-col cols="9">
        <Select
          :label="`Responsável pela etapa: ${step.name}`"
          v-model="step.user"
          :items="getUsers(step.skillId)"
          itemText="name"
          itemValue="id"
        />
      </v-col>
    </v-row>
  </Modal>
</template>

<script>
import Flow from "../models/Flow";
import User from "../models/User";

export default {
  name: "ModalCreateTask",
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
      userModel: new User(),
      flows: [],
      steps: [],
      users: [],
      flow: null
    };
  },
  watch: {
    async flow(v) {
      this.steps = (await this.flowModel.loadRecord(v)).steps;
    }
  },
  async created() {
    this.users = await this.userModel.loadCollection();
    this.flows = await this.flowModel.loadCollection();
  },
  methods: {
    createTasks() {
      this.$emit("close");
    },
    getUsers(skill) {
      return this.users.filter(user => {
        return user.skills?.some(s => s.id === skill);
      });
    }
  },
  computed: {}
};
</script>
