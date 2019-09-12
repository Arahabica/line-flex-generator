<template>
    <div class="t1Hero" :style="style">
        <component :data="data" :is="findComponent(data.type)"></component>
    </div>
</template>
<script>
import imageContent from './imageContent'
import boxContent from './boxContent'
export default {
  name: 'hero-content',
  components: {
    boxContent,
    imageContent
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
      return this.backgroundColor ? { backgroundColor: this.backgroundColor} : {}
    }
  },
  methods: {
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