<template>
  <v-snackbar v-model="snackbar.show" :color="snackbar.color" right top>
    {{ snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        text
        v-bind="attrs"
        @click="setSnackbar({ show: false })"
      >
        OK
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Snackbar",
  methods: {
    ...mapActions("Snackbar", {
      setSnackbar: "setSnackbar"
    })
  },
  computed: {
    ...mapGetters("Snackbar", {
      snackbar: "getSnackbar"
    })
  }
};
</script>

<style lang="scss" scoped></style>
