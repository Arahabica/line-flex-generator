<template>
  <div class="LySlider">
    <div class="lyInner">
      <bubble-content
        v-for="(content, i) in data.contents"
        :key="i"
        :data="content"
        :classes="['lyItem']"
      />
    </div>
  </div>
</template>
<script>
import bubbleContent from './bubbleContent'

export default {
  components: { bubbleContent },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
