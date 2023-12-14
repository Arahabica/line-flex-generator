<template>
  <div :class="classes" :style="style">
    <component
      :is="findContent(content.type)"
      v-for="(content, index) in data.contents"
      :key="index"
      :data="content"
      :layout="data.layout"
    >
    </component>
  </div>
</template>

<script>
import textContent from './textContent'
import spanContent from './spanContent'
import imageContent from './imageContent'
import buttonContent from './buttonContent'
import spacerContent from './spacerContent'
import separatorContent from './separatorContent'
import iconContent from './iconContent'
import fillerContent from './fillerContent'
import {
  getLayout,
  getBaseline,
  getMargin,
  getSpacing,
  getCornerRadius,
  getHeight,
  getWidth,
  getBorderColor,
  getBorderWidth,
  getBackgroundColor,
  getFlex,
  getPosition,
  getFlexClass,
  getOffsetStyle,
  getOffsetClasses,
  getPaddingStyle,
  getPaddingClasses,
  getAlignItems,
  getJustifyContent
} from './flexClasses'

export default {
  name: 'BoxContent',
  components: {
    textContent,
    spanContent,
    imageContent,
    buttonContent,
    spacerContent,
    separatorContent,
    iconContent,
    fillerContent
  },
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
      const { layout, margin, spacing, position, flex, width, alignItems, justifyContent } = this.data
      const offsetClasses = getOffsetClasses(this.data)
      const paddingClasses = getPaddingClasses(this.data)
      return [
        'MdBx',
        getLayout(layout),
        getBaseline(layout),
        getMargin(margin, this.layout),
        getSpacing(spacing),
        getFlexClass(flex, width),
        getPosition(position),
        getAlignItems(alignItems),
        getJustifyContent(justifyContent),
      ]
        .concat(offsetClasses)
        .concat(paddingClasses)
        .filter(t => t)
    },
    style() {
      const {
        cornerRadius,
        height,
        width,
        borderColor,
        borderWidth,
        backgroundColor
      } = this.data
      const offsetStyle = getOffsetStyle(this.data)
      const paddingStyle = getPaddingStyle(this.data)
      return {
        ...getCornerRadius(cornerRadius),
        ...getHeight(height),
        ...getWidth(width),
        ...getBorderColor(borderColor),
        ...getBorderWidth(borderWidth),
        ...getFlex(this.flex),
        ...getBackgroundColor(backgroundColor),
        ...offsetStyle,
        ...paddingStyle
      }
    }
  },
  methods: {
    findContent(key) {
      return `${key}Content`
    },
    height(type) {
      return type === 'text' ? 'h-100pct' : ''
    },
    width(type) {
      return type !== 'separator' ? 'w-100pct' : ''
    },
    textAlign(align) {
      if (align === 'end') {
        return 'ExAlgE'
      } else if (align === 'center') {
        return 'ExAlgC'
      }
      return ''
    },
    gravity(content) {
      if (content.gravity) {
        return `gravity-${content.gravity}`
      }
      return ''
    },
    separator(layout) {
      return `separator-${layout}`
    }
  }
}
</script>
