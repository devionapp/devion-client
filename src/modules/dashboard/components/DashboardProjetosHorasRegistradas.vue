<template>
  <section class="DashboardProjetosHorasRegistradas">
    <v-card style="height:400px; position:relative;">
      <v-card-text>
        <p>
          Horas registradas em projetos (últimos 7 dias)
        </p>

        <BarChart
          v-if="loaded"
          :chartdata="datacollection"
          :options="chartOptions"
          :styles="styles"
        />
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
// import Dashboard from "../models/Dashboard";
import BarChart from "@/components/Charts/BarChart";

export default {
  name: "DashboardProjetosHorasRegistradas",
  components: { BarChart },
  data() {
    return {
      datacollection: null,
      styles: {
        height: "320px"
      },
      loaded: false,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  async mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [
          "27/09",
          "28/09",
          "29/09",
          "30/09",
          "01/10",
          "02/10",
          "03/10",
          "04/10"
        ],
        datasets: [
          {
            label: "Requisito",
            backgroundColor: "#183059",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          },
          {
            label: "Bug",
            backgroundColor: "#8C183E",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          }
        ]
      };

      this.loaded = true;
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped></style>
