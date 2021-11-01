<template>
  <section class="ScheduleList">
    <Subheader createPermission="CREATE_SCHEDULE" title="Schedule" />
    <Gstc />
  </section>
</template>

<script>
import Gstc from "../components/Gstc.vue";
import Schedule from "../models/Schedule";
import Task from "../models/Task";
export default {
  name: "ScheduleList",
  data() {
    return {
      model: new Schedule(),
      modelTask: new Task(),
      tasks: []
    };
  },
  components: {
    Gstc
  },
  created() {},
  methods: {
    // async filter(index) {
    // const tasks = await this.flowModel.getTasks(
    //   this.flows[index],
    //   this.filters
    // );}
  },
  computed: {}
};
</script>
