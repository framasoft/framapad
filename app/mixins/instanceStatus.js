export default {
  methods: {
    keyForEndpoint(endpoint) {
      const instances = Object.entries(this.$t('instances'));
      return instances.find(([, instance]) => instance.endpoint === endpoint)[0];
    },
    instanceHasError(key) {
      return key in this.status.failed;
    },
  },
};
