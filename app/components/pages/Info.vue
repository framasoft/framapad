<template>
  <main>
    <h1>{{ $t('page_info.title') }}</h1>
    <p>{{ $t('page_info.intro') }}</p>
    <b-table
      striped
      hover
      :items="items"
      :fields="fields"
    >
      <template v-slot:cell(titlelink)="data">
        <a :href="data.item.website">
          <b class="text-info">{{ data.item.title }}</b>
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
  </main>
</template>
<script>
import { shuffle } from 'lodash';

export default {
  data() {
    return {
      items: shuffle(Object.values(this.$t('instances'))),
      fields: [
        {
          key: 'titlelink',
          sortable: true,
          label: this.$t('page_info.columns.title'),
        },
        {
          key: 'chatons',
          sortable: true,
          label: this.$t('page_info.columns.chatons'),
        },
      ],
    };
  },
};
</script>
