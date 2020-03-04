<template lang="pug">
  div
    .text-center.pa-12(v-if="loadStatus === 0")
      v-progress-circular(
      :size="70"
      :width="7"
      color="primary"
      indeterminate
     )
    .app-root(v-if="loadStatus === 9")
      v-container
        div
          v-row
            | 読み込みに失敗しました。
          v-row
            v-btn(block color="error" @click="() => $emit('cancel')") 戻る
    div(v-if="loadStatus === 1")
      FlexView(:data="flex" :title="data ? data.name :''" type="share")
      .btn-padding
        v-btn(block @click="() => $emit('cancel')") 戻る
</template>
<script>
import FlexView from '../FlexView'
const axios = require('axios')
const restaurantFlex = require('../../assets/restaurant.json')
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
      const flex = _.cloneDeep(restaurantFlex)
      console.log(flex)
      flex.hero.url = this.data.imageUrls[0]
      flex.body.contents[0].text = this.data.name
      flex.body.contents[1].text = this.data.jenre
      const goldStarUrl = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
      const grayStarUrl = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
      for(let num=0; num < 5; num++) {
        flex.body.contents[2].contents[num].url = this.data.score >= num + 1 ? goldStarUrl : grayStarUrl
      }
      flex.body.contents[2].contents[5].text = String(this.data.score)
      flex.body.contents[3].text = this.data.transit
      flex.footer.contents[0].action.uri = this.url
      flex.footer.contents[1].action.uri = this.gmapUrl(this.data.location)
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
    testfetchScrapedData(url) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            name: 'もつまさ',
            score: 4.2,
            jenre: 'ギター',
            transit: '銀座から2分',
            location: {lat: 35.6, lng: 136},
            tel: '03-333-3333',
            imageUrls: ['https://tblg.k-img.com/restaurant/images/Rvw/68520/640x640_rect_68520201.jpg']
          })
        }, 3500)
      })
    },
    async fetchScrapedData(url) {
      const baseUrl = '/api/scrape/restaurant'
      return axios.get(`${baseUrl}?url=${encodeURIComponent(url)}`)
    },
    gmapUrl(location) {
      return `https://www.google.com/maps?q=${location.lat},${location.lng}`
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
