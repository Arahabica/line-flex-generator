<template>
  <div class="video-content" @click="onClick">
    <div
      v-if="mode === 'video'"
      class="alt-btn"
      @click.stop="mode = 'alt'">ALT</div>
    <video
      v-if="mode === 'video'"
      :src="data.url"
      :poster="data.previewUrl"
      muted autoplay controls
      :style="style"/>
    <component
      v-if="mode === 'alt'"
      :is="findComponent(data.altContent.type)"
      :data="data.altContent"
    />
  </div>
</template>

<script>
import imageContent from './imageContent'
import boxContent from './boxContent'

export default {
  name: 'FlexVideo',
  components: {
    boxContent,
    imageContent
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      mode: 'video'
    }
  },
  computed: {
    style() {
      const { aspectRatio } = this.data
      const aspectRatioVal = (aspectRatio || '1:1').replace(':', '/')
      return {
        width: '100%',
        aspectRatio: aspectRatioVal,
        objectFit: 'cover'
      }
    }
  },
  methods: {
    onClick() {
      if (this.mode === 'alt') {
        this.mode = 'video'
      }
    },
    findComponent(type) {
      const compConst = {
        box: 'boxContent',
        image: 'imageContent'
      }
      return compConst[type]
    }
  }
}
</script>
<style scoped lang="stylus">
.video-content
  position relative
  .alt-btn
    position absolute
    top 0
    right 0
    width 40px
    height 30px
    opacity 0
    background-color rgba(255,255, 255, 0.2)
    color #ffffff
    text-align center
    line-height 30px
    font-size 16px
    z-index 2
    cursor pointer
    &:hover
      opacity 1
</style>
