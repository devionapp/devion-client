<template>
  <section class="RequirementBusinessRules">
    <v-row class="mt-5">
      <v-col cols="11">
        <TextArea
          label="Descrição da regra de negócio"
          rows="2"
          v-model="newRule.description"
        />
      </v-col>
      <v-col cols="1">
        <Button @click="addRule" color="primary" fab small class="mt-3">
          <v-icon>mdi-plus</v-icon>
        </Button>
      </v-col>
    </v-row>
    <v-row v-for="(rule, index) in rules" :key="index">
      <v-col cols="12">
        <v-card shaped>
          <v-card-title> R.N {{ index + 1 }} </v-card-title>
          <v-card-text> {{ rule.description }} </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <!-- <Button @click="removeRule(index)" color="secondary" icon x-small>
              <v-icon>mdi-pencil</v-icon>
            </Button> -->
            <Button @click="removeRule(index)" color="error" icon x-small>
              <v-icon>mdi-delete</v-icon>
            </Button>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import RequirementBusinessRules from "../models/RequirementBusinessRules";
export default {
  name: "RequirementBusinessRules",
  props: {
    requirementId: {
      type: Number,
      required: true,
      default: null
    },
    value: {
      type: Array,
      required: true,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      rules: this.value,
      newRule: {
        description: null
      }
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        this.rules.forEach((r, index) => {
          r.index = index + 1;
        });
        this.input = v;
      }
    },
    rules: {
      immediate: true,
      handler(v) {
        this.$emit("input", v);
      }
    }
  },
  methods: {
    async addRule() {
      this.newRule.index = this.rules.length + 1;
      this.rules.push(this.newRule);

      await new RequirementBusinessRules(this.requirementId).insertRecord({
        ...this.newRule
      });

      this.newRule = {
        description: null
      };
    },
    async removeRule(index) {
      await new RequirementBusinessRules(this.requirementId).deleteRecord(
        this.rules[index].id
      );
      this.rules.splice(index, 1);
    }
  }
};
</script>
