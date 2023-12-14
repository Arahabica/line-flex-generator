<template>
  <div class="t1Hero" :style="style">
    <component :is="findComponent(data.type)" :data="data"></component>
  </div>
</template>
<script>
import imageContent from './imageContent'
import boxContent from './boxContent'
import videoContent from './videoContent'

export default {
  name: 'HeroContent',
  components: {
    boxContent,
    imageContent,
    videoContent
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    backgroundColor: {
      type: String,
      default: ''
    }
  },
  computed: {
    style() {
      return this.backgroundColor
        ? { backgroundColor: this.backgroundColor }
        : {}
    }
  },
  methods: {
    findComponent(type) {
      const compConst = {
        box: 'boxContent',
        image: 'imageContent',
        video: 'videoContent'
      }
      return compConst[type]
    }
  }
}
</script>
