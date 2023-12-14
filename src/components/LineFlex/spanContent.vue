<template>
  <span :class="classes" :style="style" v-html="html"></span>
</template>
<script>
import { getSize, getWeight, getTextStyle, getDecoration } from './flexClasses'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    wrap: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      const { size, weight, style, decoration } = this.data
      return [
        'MdSpn',
        size ? getSize(size) : '',
        getWeight(weight),
        getTextStyle(style),
        getDecoration(decoration)
      ].filter(t => t)
    },
    style() {
      const { color } = this.data
      const style = {}
      if (color) {
        style.color = color
      }
      return style
    },
    html() {
      if (!this.wrap) {
        return this.data.text
      }
      return this.data.text.split('\n').join('<br/>')
    }
  }
}
</script>
