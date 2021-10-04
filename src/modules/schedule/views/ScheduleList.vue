<template>
  <section class="ScheduleList">
    <Subheader createPermission="CREATE_SCHEDULE" title="Schedule" />
    <GSTC />
  </section>
</template>

<script>
import GSTC from "../components/GSTC.vue";
import Schedule from "../models/Schedule";
export default {
  name: "ScheduleList",
  data() {
    return {
      model: new Schedule()
    };
  },
  components: {
    GSTC
  },
  created() {},
  methods: {},
  computed: {}
};
</script>
