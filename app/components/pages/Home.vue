<template>
  <main id="classic">

    <div class="row">
      <div class="col-md-8">
        <div class="">
          <h2 class="sr-only" v-html="$t('what.title')"></h2>
          <p class="text-center">
            <img :src="`${$root['/']}img/${$route.meta.lang}/screenshot.png`" alt="" class="ombre">
          </p>
          <div class="caption">
            <p v-html="$t('what.desc')"></p>
          </div>
        </div>
      </div>
      <div
        id="howitworks"
        class="col-md-4">
        <h2 class="h3" v-html="$t('how.title')"></h2>
        <ul>
          <li v-html="$t('how.create')"></li>
          <li v-html="$t('how.write')"></li>
          <li v-html="$t('how.invite')"></li>
          <li
            id="howColor"
            v-html="$t('how.color')"></li>
          <li v-html="$t('how.chat')"></li>
          <li v-html="$t('how.timeline')"></li>
          <li v-html="$t('how.export')"></li>
        </ul>
        <p v-html="$t('how.demo')"></p>
      </div>
    </div>

    <div class="row">

      <div class="col-md-6 col-md-offset-1 pad-options">
        <div class="well">
          <form
            id="create-pad"
            class="form-horizontal">
            <fieldset>
              <legend>
                <i class="fa fa-fw fa-lg fa-globe" aria-hidden="true"></i>
                <span v-html="$t('public.title')"></span>
              </legend>
              <div class="form-group">
                <label
                  for="classic-pad-name"
                  class="col-sm-4 control-label"
                  v-html="$t('public.name')"
                ></label>
                <div class="col-sm-8">
                  <input
                    id="classic-pad-name"
                    v-model="name"
                    type="text"
                    class="form-control pad-name"
                    maxlength="50"
                    aria-describedby="#name-help"
                    @focusout="sanitizeName"
                  />
                  <span
                    id="name-help"
                    class="help-block small">
                    <strong>
                      <i class="fa fa-lg fa-warning" aria-hidden="true"></i>
                      <span v-html="$t('public.warning')"></span>
                    </strong><br>
                    <span v-html="$t('public.samename')"></span>
                  </span>
                </div>
              </div>
              <div class="form-group">
                <label
                  for="expiration"
                  class="col-sm-4 control-label"></label>
                <div class="col-sm-8">
                  <select
                    id="expiration"
                    v-model="selectedInstance"
                    aria-describedby="#expiration-help"
                    class="form-control"
                  >
                    <option
                      v-for="instance in instances"
                      :key="instance.title"
                      :value="instance.title"
                      v-html="$t(instance.name)"></option>
                  </select>
                  <span
                    id="expiration-help"
                    class="help-block small"
                    v-html="$t('public.help')"></span>
                  <span
                    :class="`${currentInstance.title} jauge help-block small`">
                    <i
                      :class="`fa fa-lg ${displayJauge(currentInstance)} ${displayColor(currentInstance)}`"
                      aria-hidden="true"></i>
                    <span v-html="$t('public.currently')"></span>
                    <b :class="`${displayColor(currentInstance)}`">{{ currentInstance.count }}</b>
                    pads
                    <b v-html="$t(currentInstance.adjective)"></b> <span v-html="$t('public.running')"></span><br>
                  </span>
                </div>
              </div>
              <div class="text-center col-sm-12">
                <button
                  class="btn btn-lg btn-primary pad-create"
                  type="submit"
                  @click="createPad"
                >
                  <i class="fa fa-fw fa-lg fa-align-left" aria-hidden="true"></i>
                  <span v-html="$t('public.create')"></span> »
                </button>
                <a
                  id="pad-url"
                  href=".framapad.org/p/"
                  class="hidden"
                  rel="nofollow"></a>
              </div>
            </fieldset>
          </form>
        </div>
      </div>

      <div class="col-md-4 col-md-offset-1 mypads">
        <div class="well">
          <fieldset>
            <legend>
              <i class="fa fa-fw fa-lg fa-key" aria-hidden="true"></i>
              <span v-html="$t('private.title')"></span>
            </legend>
            <p v-html="$t('private.desc')"></p>
            <p class="text-center">
              <a
                href="https://mypads.framapad.org/mypads/?/login"
                class="btn btn-block btn-lg btn-primary">
                <i class="fa fa-lg fa-fw fa-lock" aria-hidden="true"></i> 
                <span v-html="$t('private.signin')"></span></a>
              <a
                href="https://mypads.framapad.org/mypads/?/subscribe"
                class="btn btn-block btn-lg btn-success">
                <i class="fa fa-lg fa-fw fa-user" aria-hidden="true"></i> 
                <span v-html="$t('private.signup')"></span></a>
            </p>
          </fieldset>
        </div>
      </div>

    </div>

    <hr role="presentation" />

    <div class="row">

      <div class="col-md-4" id="tuto-video">
        <h2 v-html="$t('help.title')"></h2>
        <p class="text-center" role="presentation">
          <i class="fa fa-fw fa-film" aria-hidden="true"></i>
        </p>
        <p v-html="$t('help.desc')"></p>
        <p class="text-center">
          <a
            href="#TutoVideo"
            class="btn btn-primary"
            @click="modal.open = true"
            v-html="$t('help.play')"
          ></a>
        </p>
      </div>

      <!-- modale vidéo -->
      <modal
        id="TutoVideo"
        v-model="modal.open"
        :title="$t('help.title')"
        :ok-text="$t('help.close')"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="TutoVideoLabel"
        aria-hidden="true"
      >
        <iframe
          width="560"
          height="315"
          src="https://framatube.org/videos/embed/4ebf637e-83d1-4fd7-b255-2716cfd7447b"
          frameborder="0"
          allowfullscreen></iframe>
        <div slot="footer">
          <button
            class="btn btn-default"
            @click="modal.open = false"
            v-html="$t('help.close')"
          ></button>
        </div>
      </modal>
      <!-- /modale vidéo -->

      <div class="col-md-4" id="le-logiciel">
        <h2 v-html="$t('software.title')"></h2>
        <p class="text-center" role="presentation">
          <i class="fa fa-fw fa-cloud" aria-hidden="true"></i>
        </p>
        <p><span v-html="$t('software.basedon')"></span> <a href="http://etherpad.org">Etherpad</a>.</p>
        <p>
          <span v-html="$t('software.itis')">
          </span><a href="https://github.com/ether/etherpad-lite/wiki/Sites-that-run-Etherpad-Lite"
            v-html="$t('software.instances')"
          ></a>.
        </p>
        <p v-html="$t('software.license')"></p>
      </div>

      <div class="col-md-4" id="jardin">
        <h2 v-html="$t('garden.title')"></h2>
        <p class="text-center" role="presentation">
          <i class="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></i>
        </p>
        <p>
          <span v-html="$t('garden.contrib')"></span>
          <a href="https://github.com/ether/etherpad-lite"
            v-html="$t('garden.devsite')"
          ></a>.
        </p>
        <br>
        <p v-html="$t('garden.install')"></p>
        <p class="text-center"><a
          :href="$t('garden.framacloud')"
          style="color:white"
          class="btn btn-success"><i class="glyphicon glyphicon-tree-deciduous"></i> framacloud.org</a></p>
      </div>
    </div>
  </main>
</template>

<script>
import { Modal } from 'uiv';
import { rmDiacritics, randomName, sanitize } from '../../tools';

export default {
  name: 'Home',
  components: {
    Modal,
  },
  data() {
    return {
      modal: {
        open: false,
      },

      name: randomName(),
      selectedInstance: 'mensuel',
      instances: [
        {
          title: 'quotidien',
          name: 'public.day',
          adjective: 'public.daily',
          count: 0,
        },
        {
          title: 'hebdo',
          name: 'public.week',
          adjective: 'public.hebdo',
          count: 0,
        },
        {
          title: 'mensuel',
          name: 'public.month',
          adjective: 'public.mensual',
          count: 0,
        },
        {
          title: 'bimestriel',
          name: 'public.two-month',
          adjective: 'public.bimestrial',
          count: 0,
        },
        {
          title: 'semestriel',
          name: 'public.six-month',
          adjective: 'public.semestrial',
          count: 0,
        },
        {
          title: 'annuel',
          name: 'public.year',
          adjective: 'public.annual',
          count: 0,
        },
      ],
    };
  },
  computed: {
    currentInstance() {
      return this.instances.find(instance => instance.title === this.selectedInstance);
    },
  },
  mounted() {
    if (!window.vuefsPrerender) {
      this.loadStats();
    }
  },
  methods: {
    sanitizeName() {
      this.name = sanitize(rmDiacritics(this.name)).replace(/[.]/g, '');
    },
    createPad(event) {
      event.preventDefault();
      let instanceId = this.selectedInstance;

      window.location = `https://${instanceId}.framapad.org/p/${this.name}`;
    },
    loadStats() {
      fetch('https://framastats.org/autresStats/framapad/statistics.json')
        .then(response => response.json())
        .then((data) => {
          this.instances = this.instances.map((instance) => {
            const count = data.rest_json.pluginFramapad[instance.title].padsCount;
            return {
              ...instance,
              count,
            };
          });
        }).catch((err) => {
          console.error(err); // eslint-disable-line
        });
    },
    displayJauge(instance) {
      let jauge = 'fa-thermometer-full';
      if (instance.count < 30000) {
        jauge = 'fa-thermometer-half';
      }
      if (instance.count < 10000) {
        jauge = 'fa-thermometer-quarter';
      }
      return jauge;
    },
    displayColor(instance) {
      let textColor = 'text-danger';
      if (instance.count < 30000) {
        textColor = 'text-warning';
      }
      if (instance.count < 10000) {
        textColor = 'text-success';
      }
      return textColor;
    },
  },
};
</script>
