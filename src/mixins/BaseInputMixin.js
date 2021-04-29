const BaseInputMixin = {
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      default: ""
    },
    hint: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    uppercase: {
      type: Boolean,
      default: false
    },
    noPadding: {
      type: Boolean,
      default: false
    },
    noArrows: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    v: {
      type: Object,
      default() {
        return {
          $error: false
        };
      }
    },
    vParams: {
      type: Array,
      default() {
        return [];
      }
    },
    customError: {
      type: String,
      default: null
    }
  },
  watch: {
    readonly(value) {
      this.readOnlyControl = value;
    }
  },

  data() {
    return {
      loadingComponent: false,
      readOnlyControl: this.readonly,
      focus: false
    };
  },

  computedLoading() {
    return this.loading || this.loadingComponent;
  },
  mounted() {
    if (!this.input) {
      this.input = this.$refs.input;
    }

    if (this.$route && !this.readonly) {
      if (this.$route.meta.state) {
        this.readOnlyControl = this.$route.meta.state === "VIEW";
      } else {
        this.readOnlyControl = this.$route.name
          ? this.$route.name.includes(".view")
          : false;
      }
    }
  }
};

export default BaseInputMixin;
