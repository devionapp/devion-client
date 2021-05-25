<template>
  <section class="SkillForm">
    <Subheader title="Skills" />

    <DVForm ref="form" v-model="skill" :model="model" :validations="$v" card>
      <v-row>
        <v-col cols="12">
          <Textheader text="Dados básicos" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="8">
          <TextField
            label="Descrição"
            v-model="skill.description"
            :v="$v.skill.description"
          />
        </v-col>
      </v-row>
    </DVForm>
  </section>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import DVForm from "@/components/Form/DVForm";
import Skill from "../models/Skill";
export default {
  name: "SkillForm",
  components: {
    DVForm
  },

  data() {
    return {
      model: new Skill(),
      skill: {
        description: null
      }
    };
  },
  created() {},
  methods: {},
  computed: {},
  validations: {
    skill: {
      description: { required }
    }
  }
};
</script>

<style lang="scoped"></style>
