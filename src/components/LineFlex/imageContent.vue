<template>
    <div :class="classes" :style="style">
        <div>
            <a :style="{ paddingBottom: paddingRatio(data.aspectRatio) }" :href="href" target="_blank">
                <span :style="{ backgroundImage: `url('${data.url}')` }"></span>
            </a>
        </div>
    </div>
</template>

<script>
import {
  getPosition, getOffsetClasses, getSize, pascal,
  getOffsetStyle, getAlign, getGravity, getBackgroundColor,
  getFlex, getFlexClass
} from './flexClasses'

export default {
  name: 'flex-image',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    classes() {
      const {aspectMode, size, position, align, gravity, flex} = this.data
      const offsetClasses = getOffsetClasses(this.data)
      return [
        'MdImg',
        this.aspectMode(aspectMode),
        getSize(size),
        getPosition(position),
        getAlign(align),
        getGravity(gravity),
        getFlexClass(flex)
      ]
        .concat(offsetClasses)
        .filter(t => t)
    },
    href() {
      if (this.data.action && this.data.action.type === 'uri') {
        return this.data.action.uri
      }
      return null
    },
    style() {
      const {backgroundColor, flex} = this.data
      const offsetStyle = getOffsetStyle(this.data)
      return {
        ...offsetStyle,
        ...getBackgroundColor(backgroundColor),
        ...getFlex(flex)
      }
    }
  },
  methods: {
    aspectMode(mode) {
      return 'Ex' + pascal(mode || 'fit')
    },
    paddingRatio(ratio) {
      const wh = (ratio || '1:1').split(':')
      return (wh[1] / wh[0]) * 100 + "%"
    }
  }
}
</script>
