<template lang="pug">
  .root
    GroupAd
</template>
<script>
import GroupAd from '../components/GroupAd/GroupAd'

export default {
  components: { GroupAd },
  async mounted() {
    const liffId = '1576325464-okbDD9wk'
    await window.liff.init({liffId})
      .catch((err) => {
        window.alert('LIFFの初期化失敗。\n' + err)
      })
    if (!window.liff.isLoggedIn()) {
      //await window.liff.login({ redirectUri: "https://line-flex-generator.firebaseapp.com/?path=op" })
      await window.liff.login()
    }
  }
}
</script>
