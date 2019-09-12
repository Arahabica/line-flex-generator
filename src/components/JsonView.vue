<template lang="pug">
  .json-view-root
    v-textarea.textarea(
      outlined
      name="flex-json"
      label="Flex Object"
      v-model="value"
      rows="12"
    )
    v-btn(block :disabled="disabled" color="primary" @click="save") 反映
</template>
<script>
export default {
  props: {
    initialValue: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      value: JSON.stringify(this.initialValue, null, '  ')
    }
  },
  computed: {
    disabled() {
      const initialText = JSON.stringify(this.initialValue, null, '  ')
      if (initialText === this.value) {
        return true
      }
      return !this.validJson
    },
    validJson() {
      try {
        JSON.parse(this.value)
        return true
      } catch(e) {
        return false
      }
    }
  },
  methods: {
    save() {
      this.$emit('save', JSON.parse(this.value))
    }
  }
}
</script>
<style scoped lang="stylus">
.json-view-root
  padding 15px 10px 5px 10px
.textarea
  height 260px
</style>
