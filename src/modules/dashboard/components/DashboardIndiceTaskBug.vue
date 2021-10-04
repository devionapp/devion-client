<template>
  <section class="DashboardProjetosHorasRegistradas">
    <v-card style="height:400px; position:relative;">
      <v-card-text>
        <p>
          Task x Bug (anual)
        </p>

        <LineChart
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
import LineChart from "@/components/Charts/LineChart";

export default {
  name: "DashboardProjetosHorasRegistradas",
  components: { LineChart },
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
        labels: ["JAN", "FEV", "MAR", "ABR", "JUN", "JUL", "AGO", "SET", "OUT"],
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
      return Math.floor(Math.random() * (160 - 5 + 1)) + 5;
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped></style>
