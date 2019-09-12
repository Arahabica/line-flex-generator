<template>
  <div :class="classes"></div>

</template>

<script>
import { pascal } from './flexClasses'
export default {
  props: {
    data: {
      Type: Object,
      required: true
    }
  },
  computed: {
    classes() {
      const { size } = this.data
      return [
        'mdBxSpacer',
        'fl0',
        'spc' + pascal(size || 'md')
      ]
    }
  }
}
</script>
