<template>
  <section class="RequirementFields">
    <v-row class="mt-2">
      <v-col cols="3">
        <TextField label="Nome" dense v-model="newField.name" />
      </v-col>
      <v-col cols="2">
        <TextField label="Tipo" dense v-model="newField.type" />
      </v-col>
      <v-col cols="2">
        <TextField label="Min." dense v-model="newField.min" type="number" />
      </v-col>
      <v-col cols="2">
        <TextField label="Max." dense v-model="newField.max" type="number" />
      </v-col>
      <v-col cols="2">
        <Select label="RN" dense v-model="newField.rule" />
      </v-col>
      <v-col cols="1">
        <Button @click="addField" color="primary" fab x-small>
          <v-icon>mdi-plus</v-icon>
        </Button>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <table class="RequirementFields__Table">
          <thead>
            <th v-for="(header, index) in tableHeaders" :key="index">
              {{ header.label }}
            </th>
          </thead>
          <tbody>
            <tr v-for="(field, index) in fields" :key="index">
              <td>{{ field.name }}</td>
              <td>{{ field.type }}</td>
              <td>{{ field.min }}</td>
              <td>{{ field.max }}</td>
              <td>{{ field.rn }}</td>
              <td>
                <v-btn text icon @click="removeField(index)">
                  <v-icon color="error">
                    mdi-delete
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: "RequirementFields",
  props: {
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
      fields: this.value,
      newField: {
        name: null,
        type: null,
        min: null,
        max: null,
        rule: null
      },
      tableHeaders: [
        {
          label: "Nome",
          field: "name"
        },
        {
          label: "Tipo",
          field: "type"
        },
        {
          label: "Min.",
          field: "min"
        },
        {
          label: "Max.",
          field: "max"
        },
        {
          label: "RN",
          field: "rule"
        },
        {
          label: "Ação",
          field: "actions"
        }
      ]
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        this.input = v;
      }
    },
    fields: {
      immediate: true,
      handler(v) {
        this.$emit("input", v);
      }
    }
  },
  created() {},
  methods: {
    async addField() {
      this.fields.push(this.newField);
      this.newField = {
        name: null,
        type: null,
        min: null,
        max: null,
        rule: null
      };
    },
    async removeField(index) {
      this.fields.splice(index, 1);
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.RequirementFields {
  &__Table {
    width: 100%;
    text-align: center;
  }

  table,
  td,
  th {
    border: 1px solid #c4c4c4;
    background: #fff;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    padding: 5px;
  }
}
</style>
