<template>
  <div class="line-flex line-flex-01 line-flex-02 line-flex-03">
    <div v-if="data.type === 'bubble'">
      <bubble-content :data="data" />
    </div>
    <carousel-content v-if="data.type === 'carousel'" :data="data" />
  </div>
</template>

<script>
import bubbleContent from './bubbleContent'
import carouselContent from './carouselContent'

export default {
  name: 'LineFlex',
  components: {
    bubbleContent,
    carouselContent
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus">
@import './style.styl'
.line-flex.line-flex-01.line-flex-02.line-flex-03
  line-flex()
// root='.line-flex'
/*

.T1
  border-radius 17px
  overflow hidden
  background-color #ffffff
  display flex
  -webkit-box-orient vertical
  -webkit-box-direction normal
  flex-direction column
*/

.w300
  width 300px
.LyGi
  width 400px
  float right
.LyMe
  width 300px
  float right
.LyKi
  width 260px
  float right
.LyHe
  max-width 241px
  float right
.LyDe
  max-width 220px
  float right
.LyMi
  width 160px
  float right
.LyNa
  width 120px
  float right
</style>
