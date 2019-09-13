<template lang="pug">
  div
    div(v-if="loadStatus === 0")
    v-container(v-if="loadStatus === 9")
      div
        v-row
          | 読み込みに失敗しました。
        v-row
          v-btn(block color="error" @click="() => $emit('cancel')") 戻る
    div(v-if="loadStatus === 1")
      FlexView(:data="flex")
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
        this.scrape(url)
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
      flex.body.contents[2].contents[0].contents[2].contents[0].text = this.data.description
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
        console.log(data)
        this.data = data.data.data
        this.loadStatus = 1
      }
    },
    _fetchScrapedData(url) {
      const result = {
        "data": {
          "imgUrl": "https://obs.line-scdn.net/0h8w3qnN4RZ1gOCExzqGEYDzBeOnZ1e35Kc3BqNiwPaTslb3MPZ24oaSsJOzsrOHJcOj0vankNbWB0OnU",
          "title": "SNSマーケを語る会（Twitter、Instagram、Facebook他のソーシャルメディア活用",
          "number": "487",
          "description": "SNSマーケティングに関わっている人、興味のある人、情報交換しましょう！"
        }
      }
      return new Promise(resolve => resolve({data: result}))
    },
    fetchScrapedData(url) {
      const baseUrl = '/api/scrape'
      return axios.get(`${baseUrl}?url=${encodeURIComponent(url)}`)
    }
  }
}
</script>
<style lang="stylus" scoped>
.app
  background-color #ffffff
.app-root
  padding 15px 10px 5px 10px
</style>
