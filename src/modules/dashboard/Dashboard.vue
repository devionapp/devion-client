<template>
  <div class="Dashbaord">
    <v-row>
      <v-col>
        <h2>Olá, XXXX!</h2>
      </v-col>
    </v-row>

    <v-row class="mt-5 pt-5">
      <v-col
        v-for="({ actionIcon, actionText, ...attrs }, i) in stats"
        :key="i"
        cols="12"
        md="6"
        lg="3"
      >
        <MaterialStatsCard v-bind="attrs">
          <template #actions>
            <v-icon class="mr-2" small v-text="actionIcon" />
            <div class="text-truncate">
              {{ actionText }}
            </div>
          </template>
        </MaterialStatsCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MaterialStatsCard from "@/components/MaterialStatsCard";
export default {
  name: "Dashbaord",
  components: { MaterialStatsCard },
  data() {
    return {
      stats: [
        {
          actionIcon: "mdi-calendar-range",
          actionText: "Ultimos 7 dias",
          color: "success",
          icon: "mdi-check",
          title: "Tarefas Concluidas",
          value: "18"
        },
        {
          actionIcon: "mdi-calendar-range",
          actionText: "Ultimos 7 dias",
          color: "primary",
          icon: "mdi-clock-alert",
          title: "Tarefas em atraso",
          value: "3"
        },
        {
          actionIcon: "mdi-calendar-range",
          actionText: "Ultimas 24 horas",
          color: "warning",
          icon: "mdi-calendar-check",
          title: "Tarefas em aberto",
          value: "8"
        },
        {
          actionIcon: "mdi-history",
          actionText: "Ultima atualização há: 5 minutos",
          color: "info",
          icon: "mdi-alert-decagram",
          title: "Novas tarefas",
          value: "+4"
        }
      ]
    };
  },
  created() {},
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped></style>
