import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';

import './assets/js/home';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/fork-awesome/css/fork-awesome.css';

// i18n
import App from './App.vue';
import Home from './components/pages/Home.vue';

import './assets/scss/main.scss';

Vue.use(VueRouter);
Vue.use(VueI18n);

// Ready translated locale messages
const locales = ['en', 'fr'];
const lang = window.location.href.split('/')[3].substr(0, 2).toLowerCase() || 'fr';
document.getElementsByTagName('html')[0].setAttribute('lang', lang);

const messages = {};

const routes = [
  { path: '/', component: Home },
];

for (let i = 0; i < locales.length; i += 1) {
  messages[locales[i]] = { message: {} };
  // Locales import
  /* eslint-disable */
  import(/* webpackChunkName: "lang-[request]" */`./locales/${locales[i]}.yml`).then((data) => {
    messages[locales[i]].message = data;
  }).catch((err) => {
    console.error(err);
  });
  /* eslint-enable */

  // Localized routes
  routes.push({ path: `/${locales[i]}`, component: Home });
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: lang, // set locale
  messages, // set locale messages
});

const router = new VueRouter({
  routes,
  mode: 'history',
  base: __dirname + ((process.env.NODE_ENV === 'preview') ? 'framapad' : ''), // eslint-disable-line
});

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  i18n,
  mounted() {
    // You'll need this for renderAfterDocumentEvent.
    document.dispatchEvent(new Event('render-event'));
  },
  render: h => h(App),
});
