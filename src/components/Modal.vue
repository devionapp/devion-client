<template>
  <v-dialog
    class="Modal"
    v-model="show"
    @click:outside="$emit('close')"
    :width="width"
  >
    <v-card>
      <v-toolbar color="primary" dark>{{ title }}</v-toolbar>

      <v-card-text>
        <v-container>
          <slot />
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <Button color="primary" text @click="$emit('close')">
          Cancelar
        </Button>
        <Button color="primary" @click="$emit('confirm')">
          Salvar
        </Button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    title: {
      type: String,
      default: "Titulo"
    },
    width: {
      type: Number,
      default: 950
    }
  }
};
</script>
