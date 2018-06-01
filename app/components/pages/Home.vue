<template lang="html">
  <main id="classic">

    <div class="row">
      <div class="col-md-8">
        <div class="">
          <h2 class="sr-only">{{ $t('msg.what.title') }}</h2>
          <p class="text-center"><img
            :src="screen"
            alt=""
            class="ombre" /></p>
          <div class="caption">
            <p>{{ $t('msg.what.desc') }}</p>
          </div>
        </div>
      </div>
      <div
        id="howitworks"
        class="col-md-4">
        <h2 class="h3">{{ $t('msg.how.title') }}</h2>
        <ul>
          <li v-html="$t('msg.how.create')"></li>
          <li v-html="$t('msg.how.write')"></li>
          <li v-html="$t('msg.how.invite')"></li>
          <li
            id="howColor"
            v-html="$t('msg.how.color')"></li>
          <li v-html="$t('msg.how.chat')"></li>
          <li v-html="$t('msg.how.timeline')"></li>
          <li v-html="$t('msg.how.export')"></li>
        </ul>
        <p v-html="$t('msg.how.demo')"></p>
      </div>
    </div>

    <div class="row">

      <div class="col-md-6 col-md-offset-1 pad-options">
        <div class="well">
          <form
            id="create-pad"
            class="form-horizontal">
            <fieldset>
              <legend><i class="fa fa-fw fa-lg fa-globe"></i> {{ $t('msg.public.title') }}</legend>
              <div class="form-group">
                <label
                  for="classic-pad-name"
                  class="col-sm-4 control-label">{{ $t('msg.public.name') }}</label>
                <div class="col-sm-8">
                  <input
                    id="classic-pad-name"
                    v-model="padName"
                    type="text"
                    class="form-control pad-name"
                    maxlength="50"
                    aria-describedby="#name-help"
                    @focusout="sanitizePadName"
                  />
                  <span
                    id="name-help"
                    class="help-block small">
                    <strong>
                      <i
                        class="fa fa-lg fa-warning"
                        aria-hidden="true"></i>
                      {{ $t('msg.public.warning') }}
                    </strong><br/>
                    {{ $t('msg.public.samename') }}
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
                      :value="instance.title">{{ $t(instance.name) }}</option>
                  </select>
                  <span
                    id="expiration-help"
                    class="help-block small"
                    v-html="$t('msg.public.help')"></span>
                  <span
                    :class="`${currentInstance.title} jauge help-block small`">
                    <i
                      :class="`fa fa-lg ${displayJauge(currentInstance)} ${displayColor(currentInstance)}`"
                      aria-hidden="true"></i>
                    {{ $t('msg.public.actually') }}
                    <b :class="`${displayColor(currentInstance)}`">{{ currentInstance.count }}</b>
                    pads
                    <b>{{ $t(currentInstance.adjective) }}</b> {{ $t('msg.public.running') }}<br/>
                  </span>
                </div>
              </div>
              <div class="text-center col-sm-12">
                <button
                  class="btn btn-lg btn-primary pad-create"
                  type="submit"
                  @click="createPad"
                >
                  <i class="fa fa-fw fa-lg fa-align-left"></i> {{ $t('msg.public.create') }} »
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
            <legend><i class="fa fa-fw fa-lg fa-key"></i> {{ $t('msg.private.title') }}</legend>
            <p>{{ $t('msg.private.desc') }}</p>
            <p class="text-center">
              <a
                href="https://mypads.framapad.org/mypads/?/login"
                class="btn btn-block btn-lg btn-primary"><i class="glyphicon glyphicon-lock"></i> {{ $t('msg.private.signin') }}</a>
              <a
                href="https://mypads.framapad.org/mypads/?/subscribe"
                class="btn btn-block btn-lg btn-success"><i class="glyphicon glyphicon-user"></i> {{ $t('msg.private.signup') }}</a>
            </p>
          </fieldset>
        </div>
      </div>

    </div>

    <hr role="presentation" />

    <div class="row">

      <div
        class="col-md-4"
        id="tuto-video">
        <h2>{{ $t('msg.help.title') }}</h2>
        <p
          class="text-center"
          role="presentation"><i class="glyphicon glyphicon-film"></i></p>
        <p>{{ $t('msg.help.desc') }}</p>
        <p class="text-center">
          <a
            href="#TutoVideo"
            class="btn btn-primary"
            @click="modal.open = true"
          >{{ $t('msg.help.play') }}</a>
        </p>
      </div>

      <!-- modale vidéo -->
      <modal
        id="TutoVideo"
        v-model="modal.open"
        :title="$t('msg.help.title')"
        :ok-text="$t('msg.help.close')"
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
            @click="modal.open = false">{{ $t('msg.help.close') }}
          </button>
        </div>
      </modal>
      <!-- /modale vidéo -->

      <div
        class="col-md-4"
        id="le-logiciel">
        <h2>{{ $t('msg.software.title') }}</h2>
        <p
          class="text-center"
          role="presentation"><i class="glyphicon glyphicon-cloud"></i></p>
        <p>{{ $t('msg.software.basedon') }} <a href="http://etherpad.org">Etherpad</a>.</p>
        <p>{{ $t('msg.software.itis') }} <a href="https://github.com/ether/etherpad-lite/wiki/Sites-that-run-Etherpad-Lite">{{ $t('msg.software.instances') }}</a>.</p>
        <p v-html="$t('msg.software.license')"></p>
      </div>

      <div
        class="col-md-4"
        id="jardin">
        <h2>{{ $t('msg.garden.title') }}</h2>
        <p
          class="text-center"
          role="presentation"><i class="glyphicon glyphicon-tree-deciduous"></i></p>
        <p>{{ $t('msg.garden.contrib') }} <a href="https://github.com/ether/etherpad-lite">{{ $t('msg.garden.devsite') }}</a>.</p>
        <br/>
        <p>{{ $t('msg.garden.install') }}</p>
        <p class="text-center"><a
          :href="$t('msg.garden.framacloud')"
          style="color:white"
          class="btn btn-success"><i class="glyphicon glyphicon-tree-deciduous"></i> framacloud.org</a></p>
      </div>
    </div>
  </main>
</template>

<script>
import { Modal } from 'uiv';
import { removeDiacritics, randomPadName } from '../../tools';

export default {
  name: 'Home',
  components: {
    Modal,
  },
  data() {
    const { lang } = document.getElementsByTagName('html')[0];
    const base = (window.location.href.split('/')[3] !== lang) ? `/${window.location.href.split('/')[3]}` : '';
    return {
      modal: {
        open: false,
      },
      screen: `${base}/img/screenshot-fr.png`,
      padName: randomPadName(),
      selectedInstance: 'mensuel',
      beta: false,
      instances: [
        {
          title: 'quotidien',
          name: 'msg.public.day',
          adjective: 'msg.public.daily',
          count: 0,
        },
        {
          title: 'hebdo',
          name: 'msg.public.week',
          adjective: 'msg.public.hebdo',
          count: 0,
        },
        {
          title: 'mensuel',
          name: 'msg.public.month',
          adjective: 'msg.public.mensual',
          count: 0,
        },
        {
          title: 'bimestriel',
          name: 'msg.public.two-month',
          adjective: 'msg.public.bimestrial',
          count: 0,
        },
        {
          title: 'semestriel',
          name: 'msg.public.six-month',
          adjective: 'msg.public.semestrial',
          count: 0,
        },
        {
          title: 'annuel',
          name: 'msg.public.year',
          adjective: 'msg.public.annual',
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
    this.loadStats();
  },
  methods: {
    sanitizePadName() {
      this.padName = removeDiacritics(this.padName).replace(/[ '’]/g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
    },
    createPad(event) {
      event.preventDefault();
      let instanceId = this.selectedInstance;

      if (this.beta === true) {
        instanceId = 'beta';
      }

      window.location = `https://${instanceId}.framapad.org/p/${this.padName}`;
    },
    loadStats() {
      fetch('https://framastats.org/autresStats/framapad/statistics.json').then(response => response.json()).then((data) => {
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
