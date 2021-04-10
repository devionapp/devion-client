<template>
  <MaterialCard
    class="v-card--material-stats"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #subtitle>
      <div
        class="text-right text-h3 v-card__subtitle--material-stats"
        v-text="value"
      />
    </template>

    <template #actions>
      <slot name="actions" />
    </template>

    <slot />
  </MaterialCard>
</template>

<script>
import MaterialCard from "@/components/MaterialCard";
export default {
  name: "MaterialStatsCard",
  components: { MaterialCard },
  props: { value: String }
};
</script>

<style lang="scss">
.v-card--material-stats.v-card--material .v-card--material__title {
  color: #999999;
  font-size: 0.875rem !important;
  margin-left: auto;
  text-align: right;
}

.v-card__subtitle--material-stats {
  color: #3c4858;
}
</style>
