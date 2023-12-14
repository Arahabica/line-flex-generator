<template>
  <div class="t1Header" :style="style">
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
  }
}
</script>
