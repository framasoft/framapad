<template>
  <div id="app" class="container ombre">
    <vue-headful
      :title="$t('meta.title')"
      :description="$t('meta.description')"
      :html="{ body: {id: $route.meta.id } }"
      :lang="$route.meta.lang"
      :head="{
        'link[rel^=shortcut]': {href: `${$root['/']}icons/favicon.png`},
        'link[rel=apple-touch-icon]': {href: `${$root['/']}icons/apple-touch-icon.png`},

        'meta[property^=og][property$=title]': {content: `${$t('meta.title')}`},
        'meta[property^=og][property$=image]': {content: `${$root.baseurl}icons/apple-touch-icon.png`},
        'meta[property^=og][property$=url]': {content: $root.baseurl},
        'meta[property^=og][property$=description]': {content: `${$t('meta.description')}`},

        'meta[name^=twitter][name$=title]': {content: `${$t('meta.title')}`},
        'meta[name^=twitter][name$=image]': {content: `${$root.baseurl}icons/apple-touch-icon.png`},
        'meta[name^=twitter][name$=description]': {content: `${$t('meta.description')}`},
      }"
    />
    <header-component></header-component>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderComponent from './components/partials/Header.vue'
export default {
  name: 'app',
  components: {
    HeaderComponent,
  }
}
</script>
