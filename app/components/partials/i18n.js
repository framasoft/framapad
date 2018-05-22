export default {
  data() {
    return {
      currentComponent: '',
      switchLanguage: 'en',
    };
  },
  methods: {
    changeLanguage(lang) {
      this.switchLanguage = lang;
      this.$i18n.locale = lang;
      this.currentComponent = this.$route.path.split('/')[2]; // eslint-disable-line prefer-destructuring
    },
  },
};
