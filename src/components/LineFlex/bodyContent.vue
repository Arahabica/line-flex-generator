<template>
  <div :class="classes" :style="style">
    <box-content :data="data" />
  </div>
</template>
<script>
import boxContent from './boxContent'

export default {
  components: { boxContent },
  props: {
    data: {
      type: Object,
      required: true
    },
    hasFooter: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: ''
    }
  },
  computed: {
    classes() {
      const classes = ['t1Body']
      if (this.hasFooter) {
        classes.push('ExHasFooter')
      }
      return classes
    },
    style() {
      return this.backgroundColor
        ? { backgroundColor: this.backgroundColor }
        : {}
    }
  }
}
</script>
