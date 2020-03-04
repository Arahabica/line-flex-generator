<template lang="pug">
  .app
    RestaurantInput(v-show="mode ==='input'" @submit="movePost")
    RestaurantPost(v-show="mode === 'post'" :url="url" @cancel="cancel")
</template>
<script>
import RestaurantInput from './RestaurantInput'
import RestaurantPost from './RestaurantPost'

export default {
  components: { RestaurantInput, RestaurantPost },
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
