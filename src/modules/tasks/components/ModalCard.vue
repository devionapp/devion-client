<template>
  <Modal :show="show" :title="card.name" @close="$emit('close')" :width="1700">
    <v-row>
      <v-col cols="6">
        <h3>Informações sobre a atividade</h3>
      </v-col>
    </v-row>
    <v-row class="mt-2">
      <v-col cols="6">
        <TextArea label="Descricão" />
      </v-col>
      <v-col cols="3">
        <v-select label="Responsável" outlined :items="users">
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
      <v-col cols="3">
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              outlined
              v-model="dateFormatted"
              label="Data de entrega"
              hint="Em dia/Atrasado"
              persistent-hint
              append-icon="mdi-calendar"
              v-bind="attrs"
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </Modal>
</template>

<script>
import User from "../models/User";

export default {
  name: "ModalCreateTask",
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
  data: vm => {
    return {
      userModel: new User(),
      users: [],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateFormatted: vm.formatDate(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      ),
      menu1: false
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
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
