<template lang="pug">
  .app
    GroupAdInput(v-show="mode ==='input'" @submit="movePost")
    GroupAdPost(v-show="mode === 'post'" :url="url" @cancel="cancel")
</template>
<script>
import GroupAdInput from './GroupAdInput'
import GroupAdPost from './GroupAdPost'

export default {
  components: { GroupAdInput, GroupAdPost },
  data() {
    return {
      mode: "input",
      url: ''
    }
  },
  methods: {
    movePost(url) {
      this.mode = 'post'
      this.url = url
    },
    cancel() {
      this.mode = 'input'
    }
  }
}
</script>
<style scoped lang="stylus">
.app
  background-color #ffffff
.app-root
  padding 15px 10px 5px 10px
</style>
