<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
    :disabled="disabled"
  >
    <template v-slot:activator="{ on, attrs }">
      <div v-on="on">
        <TextField
          :id="id"
          v-model="dateFormatted"
          :label="label"
          append-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          :disabled="disabled"
          @blur="date = parseDate(dateFormatted)"
        />
      </div>
    </template>
    <v-date-picker
      ref="picker"
      v-model="date"
      :max="new Date().toISOString().substr(0, 10)"
      min="1950-01-01"
      @change="save"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import BaseInputMixin from "@/mixins/BaseInputMixin";
// import moment from "moment";

export default {
  name: "DatePicker",
  mixins: [BaseInputMixin],
  props: {
    value: {
      type: [Date, String],
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu: false
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        if (v) {
          this.date = new Date(v).toISOString().substr(0, 10);
        }
      }
    },
    date: {
      immediate: true,
      handler(v) {
        this.dateFormatted = this.formatDate(this.date);
        this.$emit("input", v);
      }
    },

    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }
};
</script>
