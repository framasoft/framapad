<template lang="html">
  <header role="banner" id="framaheader">
    <div class="pull-right">
      <I18n/>
    </div>
    <h1 id="framasoft" class="sitename" v-html="$t('message.meta.framasoft[2]')"></h1>
    <p class="lead">{{ $t("message.meta.slogan") }}</p>
    <hr class="trait" role="presentation" />
  </header>
</template>

<script>
import I18n from './I18n.vue'
export default {
  name: 'framaheader',
  components: {
    I18n,
  }
}
</script>

