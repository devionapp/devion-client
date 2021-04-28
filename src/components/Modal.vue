<template>
  <v-dialog class="Modal" v-model="dialog.show" />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Modal",
  methods: {
    ...mapActions("Modal", {
      setModal: "setModal"
    })
  },
  computed: {
    ...mapGetters("Modal", {
      snackbar: "getModal"
    })
  }
};
</script>

<style lang="scss" scoped></style>
