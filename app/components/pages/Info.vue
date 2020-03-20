<template>
  <main>
    <h1>{{ $t('page_info.title') }}</h1>
    <section>
      <h3>{{ $t('page_info.title_pool', { nbinstances: items.length }) }}</h3>
      <p v-html="$t('page_info.intro')"></p>
      <b-table
        striped
        hover
        :items="items"
        :fields="fields"
      >
        <template v-slot:cell(country)="data">
          <span :title="data.item.country">
            {{ data.item.country ? countryToFlag(data.item.country) : '❓' }}
          </span>
        </template>
        <template v-slot:cell(titlelink)="data">
          <a :href="data.item.website">
            <b class="text-info">{{ data.item.title }}</b>
          </a>
        </template>
        <template v-slot:cell(endpoint)="data">
          <a :href="stripEnd(data.item.endpoint)">
            <b class="text-info">{{ urlize(data.item.endpoint) }}</b> <icon name="external-link" />
          </a>
        </template>
        <template v-slot:cell(chatons)="data">
          <a
            v-if="data.item.chatons"
            href="https://chatons.org"
          >
            {{ $t('page_info.instance.type.chatons') }}
          </a>
          <span v-else>
            {{ $t('page_info.instance.type.other') }}
          </span>
        </template>
      </b-table>
      <p v-html="$t('page_info.add_yourself')"></p>
    </section>

    <section>
      <h3>{{ $t('page_info.title_other') }}</h3>
      <p>{{ $t('page_info.intro_other') }}</p>
      <b-table
        striped
        hover
        :items="untrustedItems"
        :fields="fieldsForUntrustedInstance"
      >
        <template v-slot:cell(country)="data">
          <span :title="data.item.country">
            {{ data.item.country ? countryToFlag(data.item.country) : '❓' }}
          </span>
        </template>
        <template v-slot:cell(titlelink)="data">
          <a :href="data.item.website">
            <b class="text-info">{{ data.item.title }}</b>
          </a>
        </template>
        <template v-slot:cell(endpoint)="data">
          <a :href="stripEnd(data.item.endpoint)">
            <b class="text-info">{{ urlize(data.item.endpoint) }}</b> <icon name="external-link" />
          </a>
        </template>
      </b-table>
    </section>

    <section>
      <h3>{{ $t('page_info.title_specific') }}</h3>
      <ul>
        <li><a href="https://edu-portail.ac-versailles.fr/2018/10/11/edu-pad/">Édu-pad de l'académie de Versailles</a> (réservé aux personnels académiques de l'académie de Versailles)</li>
      </ul>
    </section>
  </main>
</template>
<script>
import { shuffle } from 'lodash';
import flag from 'country-code-emoji';

export default {
  data() {
    return {
      items: shuffle(Object.values(this.$t('instances')).filter(instance => !(instance.trust === false))),
      untrustedItems: shuffle(Object.values(this.$t('instances')).filter(instance => instance.trust === false)),
      fieldsForUntrustedInstance: [
        {
          key: 'country',
          sortable: true,
          label: this.$t('page_info.columns.country'),
        },
        {
          key: 'titlelink',
          sortable: true,
          label: this.$t('page_info.columns.title'),
        },
        {
          key: 'endpoint',
          sortable: false,
          label: this.$t('page_info.columns.url'),
        },
      ],
      fields: [
        {
          key: 'country',
          sortable: true,
          label: this.$t('page_info.columns.country'),
        },
        {
          key: 'titlelink',
          sortable: true,
          label: this.$t('page_info.columns.title'),
        },
        {
          key: 'endpoint',
          sortable: false,
          label: this.$t('page_info.columns.url'),
        },
        {
          key: 'chatons',
          sortable: true,
          label: this.$t('page_info.columns.chatons'),
        },
      ],
    };
  },
  methods: {
    urlize(endpoint) {
      return (new URL(endpoint)).hostname;
    },
    stripEnd(endpoint) {
      if (endpoint.match(/\/p\/$/g)) {
        return endpoint.slice(0, -3);
      }
      return endpoint;
    },
    countryToFlag(country) {
      return flag(country);
    },
  },
};
</script>
