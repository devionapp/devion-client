<template>
  <section class="TaskForm">
    <Subheader title="Tasks" />

    <DVForm ref="form" v-model="task" :model="model" :validations="$v" card>
      <v-row>
        <v-col cols="12">
          <Textheader text="Dados básicos" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="8">
          <TextField
            label="Descrição"
            v-model="task.description"
            :v="$v.task.description"
          />
        </v-col>
      </v-row>
    </DVForm>
  </section>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import DVForm from "@/components/Form/DVForm";
import Task from "../models/Task";
export default {
  name: "TaskForm",
  components: {
    DVForm
  },

  data() {
    return {
      model: new Task(),
      task: {
        description: null
      }
    };
  },
  created() {},
  methods: {},
  computed: {},
  validations: {
    task: {
      description: { required }
    }
  }
};
</script>

<style lang="scoped"></style>
