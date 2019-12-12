<template>
  <main id="classic">

    <div class="row mt-4">
      <div class="col-lg-8">
        <h2 class="sr-only" v-html="$t('what.title')"></h2>
        <p class="text-center">
          <img :src="`${$t('/')}img/${$t('lang')}/screenshot.png`" alt="" class="ombre">
        </p>
        <div class="caption">
          <p v-html="$t('what.md')"></p>
        </div>
      </div>
      <div
        id="howitworks"
        class="col-lg-4"
        v-html="$t('how', { link: `https://quotidien.framapad.org/p/${prefix}-bac-a-sable` })">
      </div>
    </div>

    <div class="row my-3">
      <div class="col-lg-8">
        <div class="mx-5">
          <b-card bg-variant="light" >
            <b-card-text>
              <b-form>
                <fieldset>
                  <legend>
                    <i class="fa fa-fw fa-lg fa-globe" aria-hidden="true"></i>
                    <span v-html="$t('public.title')"></span>
                  </legend>
                  <b-form-group
                    label-cols-sm="4"
                    label-cols-lg="3"
                    :label="$t('public.name')"
                    label-for="name">
                    <b-form-input id="name"
                      v-model="name"
                      type="text"
                      maxlength="50"
                      aria-describedby="#name-help"
                      @focusout="name = $t(` ${name}`, '-L@').replace(/[.]/g, '')">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group
                    label-cols-sm="4"
                    label-cols-lg="3"
                    :label="$t('public.expiration')"
                    label-for="expiration">
                    <b-form-select id="expiration"
                      v-model="selected.instance"
                      @change="displaySelectedInstance()">
                      <option v-for="instance in Object.keys(instances)"
                        :key="instance"
                        :value="instance"
                        v-html="$t(instances[instance].name)">
                      </option>
                    </b-form-select>
                    <template slot="description">
                      <span class="text-muted"
                        v-html="$t('public.help')">
                      </span><br>
                      <span class="text-muted">
                        <i :class="`fa fa-lg fa-thermometer-${selected.icon} text-${selected.color}`"
                          aria-hidden="true">
                        </i>
                        <span v-html="$t('public.running', { count: selected.count, type: $t(instances[selected.instance].adjective) })"></span>
                      </span>
                    </template>
                  </b-form-group>
                  <div class="text-center col-sm-12">
                    <b-button
                      type="submit"
                      size="lg"
                      variant="primary"
                      @click="createPad">
                      <i class="fa fa-fw fa-lg fa-align-left" aria-hidden="true"></i>
                      <span v-html="$t('public.create')"></span> »
                    </b-button>
                  </div>
                </fieldset>
            </b-form>
            </b-card-text>
          </b-card>
        </div>
      </div>

      <div class="col-lg-4">
        <b-card bg-variant="light">
          <b-card-text>
            <fieldset>
              <legend>
                <i class="fa fa-fw fa-lg fa-key" aria-hidden="true"></i>
                <span v-html="$t('private.title')"></span>
              </legend>
              <p v-html="$t('private.md')"></p>
              <p>
                <b-button block variant="outline-primary" size="lg"
                  href="https://mypads.framapad.org/mypads/?/login">
                  <i class="fa fa-lg fa-fw fa-lock" aria-hidden="true"></i> 
                  <span v-html="$t('private.signin')"></span>
                </b-button>
                <b-button block variant="success" size="lg"
                  href="https://mypads.framapad.org/mypads/?/subscribe">
                  <i class="fa fa-lg fa-fw fa-user" aria-hidden="true"></i> 
                  <span v-html="$t('private.signup')"></span>
                </b-button>
              </p>
            </fieldset>
          </b-card-text>
        </b-card>
      </div>
    </div>

    <div class="row mt-4">
      <!-- Help -->
      <div class="col-md-4">
        <h2 v-html="$t('help.title')"></h2>
        <i class="fa fa-3x fa-film d-block text-center mb-3" aria-hidden="true"></i>

        <div v-html="$t('help.md')"></div>

        <b-button
          variant="outline-primary"
          @click="modal.open = true">
          <i class="fa fa-play" aria-hidden="true"></i>
          <span v-html="$t('help.play')"></span>
        </b-button>
      </div>

      <!-- modal video -->
      <b-modal
        v-model="modal.open"
        :static="true"
        :lazy="true"
        size="xl"
        :title="$t('help.title')"
        :header-close-label="$t('txt.close')"
        :cancel-title-html="$t('txt.close')"
        ok-variant="primary d-none"
        cancel-variant="light">
        <div class="embed-responsive embed-responsive-16by9">
          <iframe src="https://framatube.org/videos/embed/4ebf637e-83d1-4fd7-b255-2716cfd7447b"
            frameborder="0"
            allowfullscreen
            class="embed-responsive-item">
          </iframe>
        </div>
      </b-modal>

      <!-- About software -->
      <div class="col-md-4">
        <h2 v-html="$t('software.title')"></h2>
        <i class="fa fa-3x fa-cloud d-block text-center mb-3" aria-hidden="true"></i>

        <div v-html="$t('software.md', { link: 'https://github.com/ether/etherpad-lite/wiki/Sites-that-run-Etherpad-Lite' })">
        </div>
      </div>

      <!-- Garden -->
      <div class="col-md-4">
        <h2 v-html="$t('garden.title')"></h2>
        <i class="fa fa-3x fa-leaf d-block text-center mb-3" aria-hidden="true"></i>

        <div v-html="$t('garden.md')"></div>

        <b-button variant="outline-success"
          :href="`${$t('link.cloud')}/${$t('cloud.pad')}`">
          <i class="fa fa-leaf" aria-hidden="true"></i> framacloud.org
        </b-button>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    /* Random alphanumeric name with 10 chars */
    const name = [...Array(10)].map(() => Math.random().toString(36)[3]).join('')
      .replace(/(.|$)/g, c => c[!Math.round(Math.random()) ? 'toString' : 'toLowerCase']());

    return {
      modal: {
        open: false,
      },
      prefix: Math.trunc((new Date).getTime() / 3600000).toString(36),
      name,
      selected: {
        count: `<b class="text-success">0</b>`,
        icon: 'quarter',
        color: 'success',
        instance: 'mensuel',
      },
      instances: {
        quotidien: {
          name: 'public.day',
          adjective: 'public.daily',
          count: 0,
        },
        hebdo: {
          name: 'public.week',
          adjective: 'public.weekly',
          count: 0,
        },
        mensuel: {
          name: 'public.month',
          adjective: 'public.monthly',
          count: 0,
        },
        bimestriel: {
          name: 'public.two-month',
          adjective: 'public.bimestrial',
          count: 0,
        },
        semestriel: {
          name: 'public.six-month',
          adjective: 'public.semestrial',
          count: 0,
        },
        annuel2: {
          name: 'public.year',
          adjective: 'public.annual',
          count: 0,
        },
      },
    };
  },
  mounted() {
    if (!window.vuefsPrerender) {
      this.loadStats();
    }
    this.loadStats(); /* remove */
  },
  methods: {
    createPad(event) {
      event.preventDefault();
      window.location = `https://${this.selected.instance}.framapad.org/p/${this.prefix}-${this.name}?lang=${this.$t('lang')}`;
    },
    loadStats() {
      fetch('https://framastats.org/autresStats/framapad/statistics.json')
        .then(response => response.json())
        .then((data) => {
          Object.keys(this.instances).forEach((i) => {
            this.instances[i].count = data.rest_json.pluginFramapad[i.replace('2', '')].padsCount;
          });
          this.displaySelectedInstance();
        }).catch((err) => {
          console.error(err); // eslint-disable-line
        });
    },
    displaySelectedInstance() {
      const instance = this.instances[this.selected.instance];
      this.selected.icon = 'full';
      this.selected.color = 'danger';
      if (instance.count < 30000) {
        this.selected.icon = 'half';
        this.selected.color = 'warning';
      }
      if (instance.count < 10000) {
        this.selected.icon = 'quarter';
        this.selected.color = 'success';
      }
      this.selected.count = `<b class="text-${this.selected.color}">${instance.count}</b>`;
    },
  },
};
</script>
