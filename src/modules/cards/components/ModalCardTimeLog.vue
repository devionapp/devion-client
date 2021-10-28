<template>
  <section class="ModalCardTimeLog">
    <v-row class="mt-5">
      <v-col cols="1">
        <TextField
          label="Horas"
          v-model="newLog.hours"
          dense
          type="number"
          min="0"
          max="999"
        />
      </v-col>
      <p class="mt-5">
        :
      </p>
      <v-col cols="1">
        <TextField
          label="Minutos"
          v-model="newLog.minutes"
          dense
          type="number"
          min="0"
          max="59"
        />
      </v-col>
      <v-col cols="2">
        <DatePicker
          id="date"
          prependInnerIcon="mdi-calendar"
          label="Data"
          type="date"
          v-model="newLog.date"
          dense
        />
      </v-col>
      <v-col cols="2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              small
              v-bind="attrs"
              v-on="on"
              color="success"
              @click.stop="addTimeLog"
              class="mr-5"
            >
              <v-icon color="white">
                mdi-plus
              </v-icon>
            </v-btn>
          </template>
          <span>Incluir</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <table class="ModalCardTimeLog__table">
          <thead>
            <th>
              Qtd. horas
            </th>
            <th>
              Data
            </th>
            <th>
              Usuario
            </th>
            <th>
              Tipo
            </th>
            <th class="text-right">
              Ações
            </th>
          </thead>
          <tbody>
            <tr v-for="(log, index) in logs" :key="index">
              <td>{{ log.hours }}h{{ log.minutes }}m</td>
              <td>
                {{ moment(log.date).format("L") }}
              </td>
              <td>{{ log.user.firstName }} {{ log.user.lastName }}</td>
              <td>
                {{ log.type }}
              </td>
              <td class="text-right">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      text
                      icon
                      color="error"
                      @click="deleteItem(index)"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Excluir Registro</span>
                </v-tooltip>
              </td>
            </tr>
            <tr v-if="!logs.length">
              <td colspan="5" class="text-center">
                Nenhum registro
              </td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import CardTimeLog from "../models/CardTimeLog";
import moment from "moment";
export default {
  name: "ModalCardTimeLog",
  components: {},
  props: {
    card: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      model: new CardTimeLog(this.card.id),
      moment: moment,
      newLog: {
        hours: null,
        minutes: null,
        date: null
      },
      logs: []
    };
  },
  async mounted() {
    this.logs = await this.model.loadCollection();
  },
  methods: {
    async deleteItem(index) {
      await this.model.deleteRecord(this.logs[index].id);

      this.logs.splice(index, 1);

      this.$emit("update");
    },
    async addTimeLog() {
      const newLogData = { ...this.newLog };

      newLogData.date = moment(this.newLog.date);
      newLogData.hours = parseInt(this.newLog.hours);
      newLogData.minutes = parseInt(this.newLog.minutes);

      const response = await this.model.insertRecord(newLogData);

      this.logs.push(response);

      this.newLog = {
        hours: null,
        minutes: null,
        date: new Date().toISOString().substr(0, 10)
      };

      this.$emit("update");
    }
  }
};
</script>
<style lang="scss" scoped>
.ModalCardTimeLog {
  &__table {
    width: 100%;
    table-layout: fixed;
    vertical-align: middle;
    font-size: 12px;
    max-width: 100%;
    background-color: transparent;

    th {
      padding-left: 16px;
      padding: 0px 8px;
      height: 37px;
      font-weight: 600;
      text-align: left;
    }

    td {
      padding: 8px 8px;
      border-top: 1px solid #e7eff6;
    }
  }
}
</style>
