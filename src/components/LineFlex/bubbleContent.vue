<template>
  <div :class="classes.concat([bubbleClass])">
    <div class="T1 fxLTR" :dir="direction">
      <template v-for="(data, key) in flexData">
        <separator-content
          v-if="hasSeparator(key)"
          :key="`sep-${key}`"
          :data="separatorData(key)"
        />
        <component
          :is="findComponent(key)"
          :id="key"
          :key="key"
          :data="data"
          :has-footer="hasFooter"
          :background-color="backgroundColor(key)"
        ></component>
      </template>
    </div>
  </div>
</template>

<script>
import headerContent from './headerContent'
import bodyContent from './bodyContent'
import footerContent from './footerContent'
import imageContent from './imageContent'
import heroContent from './heroContent'
import separatorContent from './separatorContent'

export default {
  name: 'LineFlex',
  components: {
    headerContent,
    bodyContent,
    imageContent,
    heroContent,
    footerContent,
    separatorContent
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    classes: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    bubbleClass() {
      const size = this.data.size || 'mega'
      const classes = {
        nano: 'Na',
        micro: 'Mi',
        deca: 'De',
        hecto: 'He',
        kilo: 'Ki',
        giga: 'Gi',
        mega: 'Me'
      }
      return 'Ly' + classes[size]
    },
    direction() {
      return this.data.direction || 'ltr'
    },
    hasFooter() {
      return !!this.data.footer
    },
    flexData() {
      const { header, hero, body, footer } = this.data
      const data = { header, hero, body, footer }
      Object.keys(data).forEach(key => {
        if (!data[key]) {
          delete data[key]
        }
      })
      return data
    }
  },
  methods: {
    findComponent(key) {
      const compConst = {
        header: 'headerContent',
        hero: 'heroContent',
        body: 'bodyContent',
        footer: 'footerContent'
      }
      return compConst[key] ? compConst[key] : ''
    },
    backgroundColor(key) {
      const { styles } = this.data
      return styles && styles[key] && styles[key].backgroundColor
        ? styles[key].backgroundColor
        : ''
    },
    hasSeparator(key) {
      const { styles } = this.data
      return styles && styles[key] && styles[key].separator
    },
    separatorData(key) {
      const { styles } = this.data
      const color =
        styles && styles[key] && styles[key].separatorColor
          ? styles[key].separatorColor
          : ''
      return color ? { color } : {}
    }
  }
}
</script>
