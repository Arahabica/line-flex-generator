<template lang="pug">
  .app
    v-tabs(fixed-tabs v-model="tab")
      v-tab(key="0" href="#tab-0") 表示
      v-tab(key="1" href="#tab-1") 編集
      v-tab(key="2" href="#tab-2") 高度な設定
    v-tabs-items(v-model="tab" touchless)
      v-tab-item(key="0" value="tab-0")
        FlexView(:data="flex")
      v-tab-item(key="1" value="tab-1")
        EditView(:data="flex" @save="save")
      v-tab-item(key="2" value="tab-2")
        JsonView(:initial-value="flex" @save="save")
</template>
<script>
import FlexView from './FlexView'
import EditView from './EditView'
import JsonView from './JsonView'
import data from './data.json'

export default {
  components: { FlexView, EditView, JsonView },
  data() {
    return {
      tab: null,
      flex: data
    }
  },
  methods: {
    save(data) {
      this.flex = data
    }
  }
}
</script>
<style lang="stylus" scoped>
.app
  background-color #ffffff
</style>
