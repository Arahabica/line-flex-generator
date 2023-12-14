<template>
  <div :class="classes" :style="style">
    <p>
      <span v-if="html" v-html="html"></span>
      <component
        :is="findContent(content.type)"
        v-for="(content, index) in data.contents"
        :key="index"
        :data="content"
        :wrap="data.wrap"
        :layout="layout"
      ></component>
    </p>
  </div>
</template>

<script>
import {
  getSize,
  getMargin,
  getWeight,
  getFlex,
  getFlexClass,
  getWrap,
  getGravity,
  getAlign,
  getDecoration,
  getTextStyle,
  getOffsetClasses,
  getOffsetStyle
} from './flexClasses'
import spanContent from './spanContent'

export default {
  components: { spanContent },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    layout: {
      type: String,
      default: 'vertical'
    }
  },
  computed: {
    classes() {
      const {
        margin,
        weight,
        size,
        flex,
        wrap,
        gravity,
        align,
        decoration,
        style
      } = this.data
      const offsetClasses = getOffsetClasses(this.data)
      return [
        'MdTxt',
        getMargin(margin, this.layout),
        getWeight(weight),
        getWrap(wrap),
        getSize(size),
        getGravity(gravity),
        getFlexClass(flex),
        getAlign(align),
        getTextStyle(style),
        getDecoration(decoration)
      ]
        .concat(offsetClasses)
        .filter(t => t)
    },
    style() {
      const result = {}
      const { color, flex } = this.data
      const offsetStyle = getOffsetStyle(this.data)
      if (color) {
        result.color = color
      }
      return {
        ...result,
        ...getFlex(flex),
        ...offsetStyle
      }
    },
    html() {
      if (!this.data.text || (this.data.contents && this.data.contents.length > 0)) {
        return ''
      }
      if (!this.data.wrap) {
        return this.data.text
      }
      return this.data.text.split('\n').join('<br/>')
    }
  },
  methods: {
    findContent(key) {
      return `${key}Content`
    }
  }
}
</script>
