<template>
  <div :class="classes" :style="style"></div>
</template>

<script>
import { getMargin } from './flexClasses'

export default {
  props: {
    data: {
      type: Object
    },
    layout: {
      type: String,
      default: 'vertical'
    }
  },
  computed: {
    classes() {
      const { margin } = this.data
      return ['MdSep', 'fl0', getMargin(margin, this.layout)].filter(t => t)
    },
    style() {
      const { color } = this.data
      return color ? { borderColor: color } : {}
    }
  }
}
</script>
