<template lang="pug">
  v-app-bar(app color="#ffffff")
    nuxt-link.reset-a(to="/")
      v-toolbar-title.headline
        v-icon(color="primary") chat_bubble
        span.title-name LINE Flex Generator
</template>
<style scoped lang="stylus">
.title-name
  margin-left 10px
.reset-a
  text-decoration none
  color #222222
</style>
