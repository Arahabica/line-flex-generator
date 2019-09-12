<template>
    <div :class="classes" :style="style">
        <div>
            <span :style="spanStyle"></span>
        </div>
    </div>
</template>
<script>

import {
  getPosition,
  getOffsetClasses,
  getOffsetStyle,
  getSize,
  getMargin
} from './flexClasses'

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
      const {position, margin, size} = this.data
      const offsetClasses = getOffsetClasses(this.data)
      return [
        'MdIco',
        'fl0',
        getSize(size),
        getPosition(position),
        getMargin(margin, this.layout)
      ]
        .concat(offsetClasses)
        .filter(t => t)
    },
    style() {
      const offsetStyle = getOffsetStyle(this.data)
      return {
        ...offsetStyle
      }
    },
    spanStyle() {
      const { aspectRatio, url}  = this.data
      const aspects = (aspectRatio || '1:1').split(':')
      console.log(aspectRatio, aspects)
      const width = aspects[0] / aspects[1] + 'em'

      return { backgroundImage: `url('${url}')`, width }
    }
  }
}
</script>