<template lang="pug">
  .app-root
    v-container
      div
        v-row
          v-col
            p このページではリッチな飲食店のサマリをLINEで送ることができます。
            p 下のフォームに食べログの店舗URLをコピペして「メッセージ作成」を押してください。
        v-row
          v-textarea(
            outlined
            label="飲食店URL"
            v-model="url"
            hint="現在対応しているのは食べログのURLのみです。"
          )
        v-row
          v-btn(block :disabled="!valid" color="primary" @click="move") メッセージ作成
</template>
<script>
export default {
  data() {
    return {
      url: null
    }
  },
  computed: {
    valid() {
      if (!this.url) {
        return false
      }
      return this.url.indexOf("https://tabelog.com") === 0 || this.url.indexOf("https://s.tabelog.com") === 0
    }
  },
  methods: {
    move() {
      this.$emit('submit', this.url)
    }
  }
}
</script>
<style lang="stylus" scoped>
.app-root
  padding 15px 10px 5px 10px
</style>
