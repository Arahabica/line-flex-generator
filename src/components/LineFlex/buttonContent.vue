<template>
    <div :class="classes" :style="style.root">
        <a :style="style.a">
            <div :style="style.text">
                {{data.action.label}}
            </div>
        </a>
    </div>
</template>

<script>
import {
  getMargin, getPosition, getFlexClass,
  getFlex, getGravity, getOffsetClasses, getOffsetStyle, getSize
} from './flexClasses'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    layout: {
      type: String,
      default: 'vertical'
    }
  },
  computed: {
    classes() {
      const {height, margin, gravity, position, flex} = this.data
      const offsetClasses = getOffsetClasses(this.data)
      return [
        'MdBtn',
        getMargin(margin, this.layout),
        getFlexClass(flex),
        getPosition(position),
        getGravity(gravity),
        height ? getSize(height) : '',
        this.buttonStyleClass
      ]
        .concat(offsetClasses)
        .filter(t => t)
    },
    buttonStyle() {
      return this.data.style ? this.data.style : 'link'
    },
    buttonStyleClass() {
      const buttonStyle = this.buttonStyle
      const classes = {
        link: 'ExBtnL',
        primary: 'ExBtn1',
        secondary: 'ExBtn2'
      }
      return classes[buttonStyle]
    },
    style() {
      const {color} = this.data
      const buttonStyle = this.buttonStyle

      const style = {root: {}, text: {}, a: {}}
      if (color) {
        if (buttonStyle === 'link') {
          style.text.color = color
        } else {
          style.a.backgroundColor = color
        }
      }
      const offsetStyle = getOffsetStyle(this.data)
      style.root = {
        ...getFlex(this.flex),
        ...offsetStyle
      }

      return style
    }
  }
}
</script>
