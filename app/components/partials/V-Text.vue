<template>
  <article>
    <div v-for="tag in sectionElements()" :key="tag">
      <div class="alert alert-info"
        v-if="/^alert/.test(tag)"
        v-html="$t(`${section}.${tag}`)">
      </div>
      <h2
        v-if="/^h2/.test(tag)" :id="id(tag)"
        v-html="$t(`${section}.${tag}`)">
      </h2>
      <h3
        v-if="/^h3/.test(tag)" :id="id(tag)"
        v-html="$t(`${section}.${tag}`)">
      </h3>
      <h4
        v-if="/^h4/.test(tag)" :id="id(tag)"
        v-html="$t(`${section}.${tag}`)">
      </h4>
      <h5
        v-if="/^h5/.test(tag)"
        v-html="$t(`${section}.${tag}`)">
      </h5>
      <h6
        v-if="/^h6/.test(tag)"
        v-html="$t(`${section}.${tag}`)">
      </h6>
      <ul v-if="/^ul/.test(tag)">
        <li
          v-for="li in tagIndexes(tag)"
          :key="li"
          v-html="$t(`${section}.${tag}[${li}]`)">
        </li>
      </ul>
      <ol v-if="/^ol/.test(tag)">
        <li
          v-for="li in tagIndexes(tag)"
          :key="li"
          v-html="$t(`${section}.${tag}[${li}]`)">
        </li>
      </ol>
      <p
        v-for="p in pIndexes(tag)"
        :key="p"
        v-html="$t(`${section}.${tag}[${p}]`)">
      </p>
      <blockquote
        v-for="bq in bqIndexes(tag)"
        :key="bq"
        v-html="$t(`${section}.${tag}[${bq}]`)">
      </blockquote>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    section: {
      type: String,
      required: true,
    },
  },
  methods: {
    sectionElements() {
      return Object.keys(this.$t(this.section));
    },
    tagIndexes(tag) {
      return Object.keys(this.$t(`${this.section}.${tag}`));
    },
    pIndexes(tag) {
      return this.tagIndexes(tag).filter(i => /^p/.test(tag));
    },
    bqIndexes(tag) {
      return this.tagIndexes(tag).filter(i => /^blockquote/.test(tag));
    },
    id(tag) {
      let id = `${this.section.replace('.', '-')}-${tag}`;
      if (tag.split('-')[1] !== undefined) {
        id = tag.split('-')[1];
      }
      return id;
    },
  },
};
</script>
