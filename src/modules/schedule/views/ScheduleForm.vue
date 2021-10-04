<template>
  <section class="ScheduleForm">
    <Subheader title="Schedule" />

    <DVForm ref="form" v-model="schedule" :model="model" :validations="$v" card>
      <v-row>
        <v-col cols="12">
          <Textheader text="Dados básicos" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="8">
          <TextField
            label="Descrição"
            v-model="schedule.description"
            :v="$v.schedule.description"
          />
        </v-col>
      </v-row>
    </DVForm>
  </section>
</template>

<script>
//import { required } from "vuelidate/lib/validators";
import DVForm from "@/components/Form/DVForm";
import Schedule from "../models/Schedule";
export default {
  name: "ScheduleForm",
  components: {
    DVForm
  },

  data() {
    return {
      model: new Schedule()
    };
  },
  created() {},
  methods: {},
  computed: {},
  validations: {}
};
</script>

<style lang="scoped"></style>
