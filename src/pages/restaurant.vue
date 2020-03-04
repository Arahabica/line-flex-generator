<template lang="pug">
  .root
    Restaurant
</template>
<script>
import Restaurant from '../components/Restaurant/Restaurant'

export default {
  components: {Restaurant},
  async mounted() {
    const liffId = '1576325464-okbDD9wk'
    await window.liff.init({liffId})
      .catch((err) => {
        window.alert('LIFFの初期化失敗。\n' + err)
      })
    if (!window.liff.isLoggedIn()) {
      await window.liff.login({redirectUri: "https://line-flex-generator.firebaseapp.com/restaurant"})
    }
  }
}
</script>
