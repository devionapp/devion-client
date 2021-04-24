<template>
  <section class="Dashboard">
    <v-card width="300" class="mt-5" hover link to="projetos">
      <v-container>
        <div class="Dashboard__Card">
          <h2>Seus Projetos</h2>
          <span>0</span>
        </div>
      </v-container>
    </v-card>
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

    span {
      position: absolute;
      color: var(--v-text-base);
      opacity: 0.8;
      bottom: 0;
      right: 0;
      font-size: 110px;
      vertical-align: bottom;
    }

    &:hover {
      span {
        opacity: 1;
      }
    }
  }
}
</style>
