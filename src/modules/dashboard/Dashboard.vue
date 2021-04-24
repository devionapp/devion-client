<template>
  <section class="Dashboard">
    <v-row>
      <v-col cols="2">
        <v-card class="mt-5" hover link to="projetos">
          <v-container>
            <div class="Dashboard__Card">
              <h2>Seus Projetos</h2>
              <span>0</span>
            </div>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card class="mt-5" hover link to="projetos">
          <v-container>
            <div class="Dashboard__Card">
              <h2>Suas Tarefas</h2>
              <span>0</span>
            </div>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.Dashboard {
  &__Card {
    position: relative;
    height: 200px;

    h2 {
      font-size: 30px;
    }

    span {
      position: absolute;
      color: var(--v-text-base);
      opacity: 0.8;
      bottom: 0;
      right: 0;
      font-size: 160px;
      align-items: baseline;
      vertical-align: text-bottom;
      line-height: 120px;
    }

    &:hover {
      span {
        opacity: 1;
      }
    }
  }
}
</style>
