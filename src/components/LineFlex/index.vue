<template>
    <div>
        <div v-if="data.type === 'bubble'" class="w300">
            <bubble-content :data="data"/>
        </div>
        <carousel-content v-if="data.type === 'carousel'" :data="data"/>
    </div>
</template>

<script>
import bubbleContent from './bubbleContent'
import carouselContent from './carouselContent'

export default {
  name: 'LineFlex',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    bubbleContent,
    carouselContent
  }
}
</script>

<style>
@import url('./style.css');

.T1 {
    border-radius: 17px;
    overflow: hidden;
    background-color: #ffffff;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
}
.w300 {
    width: 300px;
}
</style>
