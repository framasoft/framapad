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

    <b-alert
      show
      variant="warning"
    >
      <h4 v-html="$t('info.educ_nat.title')"></h4>
      <p v-html="$t('info.educ_nat.body')"></p>
    </b-alert>

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
                    <div>
                      <span
                        v-if="remoteInstance"
                        class="text-muted"
                        v-html="$t('public.external', {
                          title: remoteInstance.title,
                          website: remoteInstance.website
                        })"
                      ></span>
                      <span
                        v-if="remoteInstance && remoteInstance.chatons"
                        class="text-muted"
                        v-html="$t('public.chatons')"
                      ></span>.
                      <br />
                      <p class="text-center">
                        <router-link
                          :to="`/${$t('lang')}/info`"
                          class="text-muted text-center"
                          v-html="$t('public.full_list', { nbinstances: nbInstances })"
                        />
                      </p>
                    </div>
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
import { shuffle } from 'lodash';
import instanceStatus from "../../mixins/instanceStatus";

const DEFAULT_WEIGHT = 2;

export default {
  mixins: [instanceStatus],
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
      remoteInstances: this.$t('instances'),
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
    nbInstances() {
      return Object.keys(this.remoteInstances).length;
    },
  },
  // computed: {
  //   expirations() {
  //     return Object.values(this.remoteInstances).reduce((acc, remoteInstance) => {
  //       remoteInstance.degradability.reduce((acc2, degradability) => {
  //         acc2.add(degradability);
  //         return acc2;
  //       }, acc);
  //       return acc;
  //     }, new Set());
  //   },
  // },
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
  methods: {
    create(event) {
      event.preventDefault();
      window.location = `${this.remoteInstance.endpoint}${this.prefix}-${this.name}?lang=${this.$t('lang')}`;
      // window.location = `https://${this.selected.instance}.framapad.org/p/${this.prefix}-${this.name}?lang=${this.$t('lang')}`;
    },
    randomInstance() {
      const remoteInstancesSelected = Object.entries(this.remoteInstances)
        .filter(([, value]) => (!(value.trust === false)))
        .map(([key, instance]) => [key, (instance.weight || DEFAULT_WEIGHT)]);
      return this.remoteInstances[this.weightedRand(remoteInstancesSelected)];
    },
    weightedRand(data) {
      // First, we loop the main dataset to count up the total weight.
      // We're starting the counter at one because the upper boundary of Math.random() is exclusive.
      let total = 1;
      for (let i = 0; i < data.length; i += 1) {
        total += data[i][1];
      }
      // Total in hand, we can now pick a random value akin to our
      // random index from before.
      const threshold = Math.floor(Math.random() * total);

      // Now we just need to loop through the main data one more time
      // until we discover which value would live within this
      // particular threshold. We need to keep a running count of
      // weights as we go, so let's just reuse the "total" variable
      // since it was already declared.
      total = 0;
      for (let i = 0; i < data.length; i += 1) {
        // Add the weight to our running total.
        total += data[i][1];

        // If this value falls within the threshold, we're done!
        if (total >= threshold) {
          return data[i][0];
        }
      }
      // Should never happen
      return data[0][0];
    },
    anotherInstance() {
      let newInstance = this.remoteInstance;
      while (newInstance === this.remoteInstance) {
        newInstance = this.randomInstance();
      }
      this.remoteInstance = newInstance;
    },
  },
};
</script>
