<template lang="pug">
  .app-root
    v-container
      div
        v-row
          v-textarea(
            outlined
            label="招待リンク"
            v-model="url"
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
    link() {
      if (!this.url) {
        return null
      }
      const matches = this.url.trim().match(/https:.*$/)
      if (!matches || matches.length === 0){
        return null
      }
      return matches[0]
    },
    valid() {
      if (!this.link) {
        return false
      }
      return this.link.indexOf("https://line.me/ti") === 0
    }
  },
  methods: {
    move() {
      this.$emit('submit', this.link)
    }
  }
}
</script>
<style lang="stylus" scoped>
.app-root
  padding 15px 10px 5px 10px
</style>
