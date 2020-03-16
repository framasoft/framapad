<template>
  <main>
    <div class="row mt-4">
      <div class="col-lg-8">
        <h2
          class="sr-only"
          v-html="$t('what.title')"
        ></h2>
        <p class="text-center">
          <img
            :src="`${$t('/')}img/${$t('lang')}/screenshot.png`"
            alt=""
            class="ombre"
          />
        </p>
        <div class="caption">
          <p v-html="$t('what.md')"></p>
        </div>
      </div>
      <div
        id="howitworks"
        class="col-lg-4"
        v-html="$t('how', { link: `https://quotidien.framapad.org/p/${prefix}-bac-a-sable` })"
      ></div>
    </div>

    <b-alert show variant="danger" v-html="$t('info.educ_nat')" />

    <div class="row my-3">
      <div class="col-lg-8">
        <div class="mx-5">
          <b-card bg-variant="light">
            <b-card-text>
              <b-form>
                <fieldset>
                  <legend>
                    <icon
                      name="globe"
                      :label="$t('public.title')"
                    />
                  </legend>
                  <b-form-group
                    label-cols-sm="4"
                    label-cols-lg="3"
                    :label="$t('public.name')"
                    label-for="name"
                  >
                    <b-form-input
                      id="name"
                      v-model="name"
                      type="text"
                      maxlength="50"
                      @focusout="name = $t(name, '-kL@').replace(/[.]/g, '')"
                    />
                    <template slot="description">
                      <span
                        v-if="remoteInstance"
                        class="text-muted"
                        v-html="$t('public.external', {
                          title: remoteInstance.title,
                          website: remoteInstance.website
                        })"
                      ></span>
                    </template>
                  </b-form-group>
<!--                  <b-form-group-->
<!--                    label-cols-sm="4"-->
<!--                    label-cols-lg="3"-->
<!--                    :label="$t('public.expiration')"-->
<!--                    label-for="expiration"-->
<!--                  >-->
<!--                    <b-form-select-->
<!--                      id="expiration"-->
<!--                      v-model="selected.instance"-->
<!--                      @change="displaySelectedInstance()"-->
<!--                    >-->
<!--                      <option-->
<!--                        v-for="instance in expirations"-->
<!--                        :key="instance"-->
<!--                        :value="instance"-->
<!--                        v-html="$t(instances[instance].name)"-->
<!--                      ></option>-->
<!--                    </b-form-select>-->
<!--                    <template slot="description">-->
<!--                      <span-->
<!--                        class="text-muted"-->
<!--                        v-html="$t('public.help')"-->
<!--                      ></span>-->
<!--                      <br />-->
<!--                      <span class="text-muted">-->
<!--                        <icon-->
<!--                          size="lg"-->
<!--                          :name="`thermometer-${selected.icon} text-${selected.color}`"-->
<!--                          :label="$t('public.running', {-->
<!--                            count: selected.count,-->
<!--                            type: $t(instances[selected.instance].adjective)-->
<!--                          })"-->
<!--                        />-->
<!--                      </span>-->
<!--                    </template>-->
<!--                  </b-form-group>-->
                  <div class="text-center col-sm-12">
                    <b-button
                      type="submit"
                      size="lg"
                      variant="primary"
                      @click="create"
                    >
                      <icon
                        name="align-left"
                        :label="$t('public.create')"
                      />
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
                <icon
                  name="key"
                  :label="$t('private.title')"
                />
              </legend>
              <p v-html="$t('private.md')"></p>
              <p>
                <b-button
                  block
                  variant="outline-primary"
                  size="lg"
                  href="https://mypads.framapad.org/mypads/?/login"
                >
                  <icon
                    name="lock"
                    :label="$t('private.signin')"
                  />
                </b-button>
                <b-button
                  block
                  variant="success"
                  size="lg"
                  href="https://mypads.framapad.org/mypads/?/subscribe"
                >
                  <icon
                    name="user"
                    :label="$t('private.signup')"
                  />
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
        <icon
          size="3x d-block text-center mb-3"
          name="film"
        />

        <div v-html="$t('help.md')"></div>

        <b-button
          variant="outline-primary"
          @click="modal.open = true"
        >
          <icon
            name="play"
            :label="$t('help.play')"
          />
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
        cancel-variant="light"
      >
        <div class="embed-responsive embed-responsive-16by9">
          <iframe
            src="https://framatube.org/videos/embed/4ebf637e-83d1-4fd7-b255-2716cfd7447b"
            frameborder="0"
            allowfullscreen
            class="embed-responsive-item"
          ></iframe>
        </div>
      </b-modal>

      <!-- About software -->
      <div class="col-md-4">
        <h2 v-html="$t('software.title')"></h2>
        <icon
          size="3x d-block text-center mb-3"
          name="cloud"
        />
        <div v-html="$t('software.md', { link: 'https://github.com/ether/etherpad-lite/wiki/Sites-that-run-Etherpad-Lite' })">
        </div>
      </div>

      <!-- Garden -->
      <div class="col-md-4">
        <h2 v-html="$t('garden.title')"></h2>
        <icon
          size="3x d-block text-center mb-3"
          name="leaf"
        />

        <div v-html="$t('garden.md')"></div>

        <b-button
          variant="outline-success"
          :href="`${$t('link.cloud')}/${$t('cloud.pad')}`"
        >
          <icon
            name="leaf"
            label="framacloud.org"
          />
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
      prefix: Math.trunc(new Date().getTime() / 3600000).toString(36),
      name,
      remoteInstance: null,
      selected: {
        count: '<b class="text-success">0</b>',
        icon: 'quarter',
        color: 'success',
        instance: 'unknown',
      },
      remoteInstances: {
        colibris: {
          title: 'Outils Libres Colibris',
          endpoint: 'https://pad.colibris-outilslibres.org/p/',
          website: 'https://colibris-outilslibres.org/',
          degradability: ['semestriel'],
          chatons: true,
        },
        infini: {
          title: 'Infini',
          endpoint: 'https://pad.infini.fr/p/',
          website: 'https://www.infini.fr/',
          degradability: ['semestriel'],
          chatons: true,
        },
        chapril: {
          title: 'Chapril',
          endpoint: 'https://pad.chapril.org/p/',
          website: 'https://www.chapril.org/',
          degradability: ['unknown'],
          chatons: true,
        },
        picasoft: {
          title: 'Picasoft',
          endpoint: 'https://pad.picasoft.net/p/',
          website: 'https://picasoft.net/',
          degradability: ['unknown'],
          chatons: true,
        },
        aloise: {
          title: 'Aloise',
          endpoint: 'https://etherpad.alolise.org/p/',
          website: 'https://alolise.org/',
          degradability: ['unknown'],
          chatons: true,
        },
        tedomum: {
          title: 'TeDomum',
          endpoint: 'https://pads.tedomum.net/p/',
          website: 'https://tedomum.net/',
          degradability: ['unknown'],
          chatons: true,
        },
        april: {
          title: 'APRIL',
          endpoint: 'https://pad.april.org/p/',
          website: 'https://april.org/',
          degradability: ['unknown'],
          chatons: false,
        },
        hadoly: {
          title: 'Hadoly',
          endpoint: 'https://pad.hadoly.fr/p/',
          website: 'https://www.hadoly.fr/',
          degradability: ['unknown'],
          chatons: true,
        },
        parinux: {
          title: 'Parinux',
          endpoint: 'https://bn.parinux.org/p/',
          website: 'https://parinux.org/',
          degradability: ['unknown'],
          chatons: false,
        },
        lqdn: {
          title: 'La Quadrature du Net',
          endpoint: 'https://pad.lqdn.fr/p/',
          website: 'https://www.laquadrature.net/',
          degradability: ['unknown'],
          chatons: false,
        },
        wikimedia: {
          title: 'Wikimedia',
          endpoint: 'https://etherpad.wikimedia.org/p/',
          website: 'https://www.wikimedia.org/',
          degradability: ['unknown'],
          chatons: false,
        },
        aquilenet: {
          title: 'AquileNet',
          endpoint: 'https://pad.aquilenet.fr/p/',
          website: 'https://www.aquilenet.fr/',
          degradability: ['unknown'],
          chatons: false,
        },
        fdn: {
          title: 'French Data Network (FDN)',
          endpoint: 'https://pad.fdn.fr/',
          website: 'https://www.fdn.fr/',
          degradability: ['unknown'],
          chatons: false,
        },
        faimaison: {
          title: 'FAImaison',
          endpoint: 'https://pad.faimaison.net/p/',
          website: 'https://www.faimaison.net/',
          degradability: ['unknown'],
          chatons: false,
        },
        ilico: {
          title: 'Ilico',
          endpoint: 'https://pad.ilico.org/p/',
          website: 'https://www.ilico.org/',
          degradability: ['unknown'],
          chatons: false,
        },
        iloth: {
          title: 'Iloth',
          endpoint: 'https://pad.iloth.net/p/',
          website: 'https://iloth.net/',
          degradability: ['unknown'],
          chatons: false,
        },
        tetaneutral: {
          title: 'tetaneutral.net',
          endpoint: 'https://pad.tetaneutral.net/p/',
          website: 'https://tetaneutral.net/',
          degradability: ['unknown'],
          chatons: false,
        },
        gresille: {
          title: 'Grésille',
          endpoint: 'https://pad.gresille.org/p/',
          website: 'https://www.gresille.org/',
          degradability: ['unknown'],
          chatons: false,
        },
        aposti: {
          title: 'Aposti·net',
          endpoint: 'https://pad.aposti.net/p/',
          website: 'https://www.aposti.net/',
          degradability: ['unknown'],
          chatons: false,
        },
        aliens: {
          title: 'AliENS',
          endpoint: 'https://pad.aliens-lyon.fr/p/',
          website: 'https://aliens-lyon.fr/',
          degradability: ['unknown'],
          chatons: false,
        },
        grrrndzero: {
          title: 'Grrrnd Zero',
          endpoint: 'https://etherpad.grrrndzero.org/p/',
          website: 'https://grrrndzero.org/',
          degradability: ['unknown'],
          chatons: false,
        },
        opportunisme: {
          title: 'Opportunis.me',
          endpoint: 'https://pad.opportunis.me/p/',
          website: 'https://opportunis.me/',
          degradability: ['unknown'],
          chatons: false,
        },
        domain_public: {
          title: 'Domaine public',
          endpoint: 'https://pads.domainepublic.net/p/',
          website: 'https://www.domainepublic.net/',
          degradability: ['unknown'],
          chatons: false,
        },
        devloprog: {
          title: 'Domaine public',
          endpoint: 'https://pad.devloprog.org/p/',
          website: 'https://www.domainepublic.net/',
          degradability: ['unknown'],
          chatons: false,
        },
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
        unknown: {
          name: 'public.unknown',
          adjective: 'public.unknown',
          count: 0,
        },
      },
    };
  },
  computed: {
    expirations() {
      return Object.values(this.remoteInstances).reduce((acc, remoteInstance) => {
        remoteInstance.degradability.reduce((acc2, degradability) => {
          acc2.add(degradability);
          return acc2;
        }, acc);
        return acc;
      }, new Set());
    },
  },
  watch: {
    selected: {
      handler() {
        this.remoteInstance = this.randomInstance();
      },
      deep: true,
    },
  },
  mounted() {
    // if (!window.vuefsPrerender) {
    //   this.loadStats();
    // }
    this.remoteInstance = this.randomInstance();
  },
  methods: {
    create(event) {
      event.preventDefault();
      window.location = `${this.remoteInstance.endpoint}${this.prefix}-${this.name}?lang=${this.$t('lang')}`;
      // window.location = `https://${this.selected.instance}.framapad.org/p/${this.prefix}-${this.name}?lang=${this.$t('lang')}`;
    },
    randomInstance() {
      const remoteInstancesArray = Object.values(this.remoteInstances)
        .filter(
          remoteInstance => remoteInstance.degradability.includes(this.selected.instance),
        );
      return remoteInstancesArray[Math.floor(Math.random() * remoteInstancesArray.length)];
    },
    // loadStats() {
    //   fetch('https://framastats.org/autresStats/framapad/statistics.json')
    //     .then(response => response.json())
    //     .then((data) => {
    //       Object.keys(this.instances).forEach((i) => {
    //         if (i === 'unknown') return;
    //         this.instances[i].count = data.rest_json.pluginFramapad[i.replace('2', '')].padsCount;
    //       });
    //       this.displaySelectedInstance();
    //     }).catch((err) => {
    //       console.error(err); // eslint-disable-line
    //     });
    // },
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
