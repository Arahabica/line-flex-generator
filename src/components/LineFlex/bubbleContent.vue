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
                        :id="key"
                        :key="key"
                        :data="data"
                        :has-footer="hasFooter"
                        :backgroundColor="backgroundColor(key)"
                        :is="findComponent(key)"
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
  components: {
    headerContent,
    bodyContent,
    imageContent,
    heroContent,
    footerContent,
    separatorContent
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
      const {styles} = this.data
      return styles && styles[key] && styles[key].backgroundColor ? styles[key].backgroundColor : ''
    },
    hasSeparator(key) {
      const {styles} = this.data
      return styles && styles[key] && styles[key].separator
    },
    separatorData(key) {
      const {styles} = this.data
      const color = styles && styles[key] && styles[key].separatorColor ? styles[key].separatorColor : ''
      return color ? {color} : {}
    }
  },
  computed: {
    bubbleClass() {
      const size = this.data.size || 'mega'
      const classes = {
        nano: 'Na',
        micro: 'Mi',
        kilo: 'Ki',
        giga: 'Gi',
        mega: 'Me',
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
      const {header, hero, body, footer} = this.data
      let data = {header, hero, body, footer}
      Object.keys(data).forEach(key => {
        if (!data[key]) {
          delete data[key]
        }
      })
      return data
    }
  }
}
</script>
