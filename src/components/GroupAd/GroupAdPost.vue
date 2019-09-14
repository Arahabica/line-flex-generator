<template lang="pug">
  div
    div(v-if="loadStatus === 0")
    .app-root(v-if="loadStatus === 9")
      v-container
        div
          v-row
            | 読み込みに失敗しました。
          v-row
            v-btn(block color="error" @click="() => $emit('cancel')") 戻る
    div(v-if="loadStatus === 1")
      FlexView(:data="flex" :title="data ? data.title :''")
      .btn-padding
        v-btn(block @click="() => $emit('cancel')") 戻る
</template>
<script>
import FlexView from '../FlexView'
const axios = require('axios')
const op = require('../../assets/op.json')
const _ = require('lodash')

export default {
  components: { FlexView },
  props: {
    url: {
      type: String,
      required: true
    }
  },
  watch: {
    url: {
      immediate: true,
      handler(url) {
        this.loadStatus = 0
        if (url) {
          this.scrape(url)
        }
      }
    }
  },
  data() {
    return {
      loadStatus: 0,
      message: null,
      data: null
    }
  },
  computed: {
    flex() {
      if (!this.data) {
        return null
      }
      const flex = _.cloneDeep(op)
      console.log(flex)
      flex.body.contents[0].url = this.data.imgUrl
      flex.body.contents[2].contents[0].contents[0].contents[0].text = this.data.title
      flex.body.contents[2].contents[0].contents[1].contents[0].text = "メンバー " + this.data.number
      flex.body.contents[2].contents[0].contents[2].contents[0].contents[0].text = this.data.description
      flex.body.contents[2].contents[0].contents[3].contents[0].action.uri = this.url
      console.log({flex})
      return flex
    }
  },
  methods: {
    async scrape(url) {
      this.data = null
      const data = await this.fetchScrapedData(url).catch(err => {
        this.loadStatus = 9
        window.alert(err)
      })
      if (data) {
        this.data = data.data.data
        this.loadStatus = 1
      }
    },
    fetchScrapedData(url) {
      const baseUrl = '/api/scrape'
      return axios.get(`${baseUrl}?url=${encodeURIComponent(url)}`)
    }
  }
}
</script>
<style lang="stylus" scoped>
.app-root
  padding 15px 10px 5px 10px
.btn-padding
  padding: 40px 5px 10px 5px;
</style>
