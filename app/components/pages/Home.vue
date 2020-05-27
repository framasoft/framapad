<template>
  <main>
    <b-row class="mt-4">
      <b-col lg="8">
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
      </b-col>
      <b-col
        id="howitworks"
        lg="4"
        v-html="$t('how', { link: `https://quotidien.framapad.org/p/bac-a-sable-${suffix}` })"
      />
    </b-row>

    <b-row class="my-3">
      <b-col lg="8">
        <div class="mb-4">
          <b-card
            bg-variant="light"
            no-body
          >
            <b-card-text>
              <b-form class="m-4">
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
                  </b-form-group>
                  <b-form-group
                    label-cols-sm="4"
                    label-cols-lg="3"
                    :label="$t('public.expiration')"
                    label-for="expiration"
                  >
                    <b-form-select
                      id="expiration"
                      v-model="selected.instance"
                      @change="displaySelectedInstance()"
                    >
                      <option
                        v-for="instance in Object.keys(instances)"
                        :key="instance"
                        :value="instance"
                        v-html="`${$t(instances[instance].emoji)} ${$t(instances[instance].name)}`"
                      ></option>
                    </b-form-select>
                    <template slot="description">
                      <span
                        class="text-muted"
                        v-html="$t('public.help')"
                      ></span>
                      <br />
                      <span class="text-muted">
                        <icon
                          size="lg"
                          :name="`thermometer-${selected.icon} text-${selected.color}`"
                          :label="$t('public.running', {
                            count: selected.count,
                            type: $t(instances[selected.instance].adjective)
                          })"
                        />
                      </span>
                    </template>
                  </b-form-group>
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
              <b-alert
                show
                variant="info mb-0 d-flex  align-items-center border-0 rounded-0"
              >
                <img
                  :src="`${$t('/')}img/entraide-chatons.png`"
                  alt=""
                  class="border rounded-circle img-fluid mr-4"
                />
                <p
                  class="m-0"
                  v-html="$t('public.other')"
                ></p>
              </b-alert>
            </b-card-text>
          </b-card>
        </div>
      </b-col>

      <b-col lg="4">
        <b-card
          bg-variant="light"
          no-body
        >
          <b-card-text>
            <fieldset class="m-4">
              <legend>
                <icon
                  name="key"
                  :label="$t('private.title')"
                />
              </legend>
              <p v-html="$t('private.md')"></p>
              <p>
                <b-dropdown
                  block
                  right
                  variant="outline-primary mb-2"
                  size="lg"
                >
                  <template v-slot:button-content>
                    <icon
                      name="lock"
                      :label="$t('private.signin')"
                    />
                  </template>
                  <b-dropdown-item
                    href="https://mypads.framapad.org/mypads/?/login"
                  >
                    <span v-html="$t('private.mypads', { date: date('2020-03-18') })"></span>
                  </b-dropdown-item>
                  <b-dropdown-item
                    href="https://mypads2.framapad.org/mypads/?/login"
                  >
                    <span v-html="$t('private.mypads2', { date: date('2020-03-18') })"></span>
                  </b-dropdown-item>
                </b-dropdown>
                <b-button
                  block
                  variant="success"
                  size="lg"
                  href="https://mypads2.framapad.org/mypads/?/subscribe"
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
      </b-col>
    </b-row>

    <b-row class="mt-4">
      <!-- Help -->
      <b-col md="4">
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
      </b-col>

      <!-- About software -->
      <b-col md="4">
        <h2 v-html="$t('software.title')"></h2>
        <icon
          size="3x d-block text-center mb-3"
          name="cloud"
        />
        <div v-html="$t('software.md', { link: './info' })">
        </div>
      </b-col>

      <!-- Garden -->
      <b-col md="4">
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
      </b-col>
    </b-row>
  </main>
</template>

<script>
// import instanceStatus from '../../mixins/instanceStatus';

// const DEFAULT_WEIGHT = 2;

export default {
  // mixins: [instanceStatus],
  data() {
    /* Random alphanumeric name with 10 chars */
    const name = [...Array(10)].map(() => Math.random().toString(36)[3]).join('')
      .replace(/(.|$)/g, (c) => c[!Math.round(Math.random()) ? 'toString' : 'toLowerCase']());

    return {
      modal: {
        open: false,
      },
      suffix: Math.trunc(new Date().getTime() / 3600000).toString(36),
      name,
      // remoteInstance: null,
      selected: {
        count: '<b class="text-success">0</b>',
        icon: 'quarter',
        color: 'success',
        instance: 'mensuel',
      },
      // remoteInstances: this.$t('instances'),
      instances: {
        quotidien: {
          emoji: 'emoji.bike',
          name: 'public.day',
          adjective: 'public.daily',
          count: 0,
        },
        hebdo: {
          emoji: 'emoji.boat',
          name: 'public.week',
          adjective: 'public.weekly',
          count: 0,
        },
        mensuel: {
          emoji: 'emoji.car',
          name: 'public.month',
          adjective: 'public.monthly',
          count: 0,
        },
        bimestriel: {
          emoji: 'emoji.truck',
          name: 'public.two-month',
          adjective: 'public.bimestrial',
          count: 0,
        },
        semestriel: {
          emoji: 'emoji.airplane',
          name: 'public.six-month',
          adjective: 'public.semestrial',
          count: 0,
        },
        annuel2: {
          emoji: 'emoji.rocket',
          name: 'public.year',
          adjective: 'public.annual',
          count: 0,
        },
        /*
        unknown: {
          name: 'public.unknown',
          adjective: 'public.unknown',
          count: 0,
        },
        */
      },
    };
  },
  /*
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
  computed: {
    nbInstances() {
      return Object.keys(this.remoteInstances).length;
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
  async mounted() {
    this.status = await (await fetch('https://framapad.org/instances_check.json')).json();
    this.anotherInstance();
    while (this.keyForEndpoint(this.remoteInstance.endpoint) in this.status.failed) {
      this.anotherInstance();
    }
  },
  */
  mounted() {
    if (!window.vuefsPrerender) {
      this.loadStats();
    }
  },
  methods: {
    create(e) {
      e.preventDefault();
      window.location = `https://${this.selected.instance}.framapad.org/p/${this.name}-${this.suffix}?lang=${this.$t('lang')}`;
    },
    date(date) {
      return new Date(this.$t(date)).toLocaleDateString(this.$t('lang'), {
        year: 'numeric',
        month: 'long',
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
    loadStats() {
      fetch('https://framastats.org/autresStats/framapad/statistics.json')
        .then((res) => res.json())
        .then((data) => {
          Object.keys(this.instances).forEach((i) => {
            this.instances[i].count = data.rest_json.pluginFramapad[i.replace('2', '')].padsCount;
          });
          this.displaySelectedInstance();
        }).catch((err) => {
          console.error(err); // eslint-disable-line
        });
    },
  },
};
</script>
