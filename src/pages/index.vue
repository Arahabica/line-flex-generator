<template lang="pug">
  .root
    Restaurant(v-if="path === 'restaurant'")
    GroupAd(v-else-if="path === 'op'")
    App(v-else)
</template>
<script>
import App from '../components/App'
import GroupAd from '../components/GroupAd/GroupAd'
import Restaurant from '../components/Restaurant/Restaurant'

const getUrlVars = () => {
  const vars = {}
  const hash = window.location.search.slice(1).split('&').filter(t => t)
  hash.forEach((x) => {
    const arr = x.split('=')
    vars[arr[0]] = arr[1] || true
  })
  return vars
}
export default {
  components: { App, GroupAd, Restaurant },
  computed: {
    path() {
      if (typeof window === 'undefined') {
        return ''
      }
      const vars = getUrlVars()
      return vars.path || ''
    }
  },
  async mounted() {
    const liffId = '1576325464-okbDD9wk'
    await window.liff.init({liffId})
      .catch((err) => {
        window.alert('LIFFの初期化失敗。\n' + err)
      })
    if (!window.liff.isLoggedIn()) {
      // await window.liff.login({ redirectUri: `https://line-flex-generator.firebaseapp.com?path=${this.path}`})
    }
  }
}
</script>
