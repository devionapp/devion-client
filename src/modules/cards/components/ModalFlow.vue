<template>
  <Modal
    :show="show"
    title="Novo fluxo"
    @close="$emit('close')"
    @confirm="save"
    :width="1800"
  >
    <FlowsForm />
  </Modal>
</template>

<script>
import FlowsForm from "@/modules/flows/views/FlowsForm";
export default {
  name: "ModalFlow",
  components: { FlowsForm },
  props: {
    show: {
      type: Boolean,
      default: null
    }
  },
  data: () => {
    return {};
  },
  async mounted() {},
  methods: {
    async save() {}
  }
};
</script>
