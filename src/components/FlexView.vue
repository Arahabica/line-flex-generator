<template lang="pug">
  .flex-app
    .app
      .message
        LineFlex(:data="data")
    .send-btn
      v-btn(block color="primary" @click="send") 送信

</template>

<script>
import LineFlex from './LineFlex'

export default {
  name: 'app',
  components: {
    LineFlex
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mounted() {
    window.liff.init(
      data => {
        // Now you can call LIFF API
        console.log(data)
      },
      err => {
        // LIFF initialization failed
        window.alert('LIFFの初期化失敗。\n' + err)
      }
    );
  },
  methods: {
    send() {
      const messageObject = {
        type: "flex",
        altText: "this is a flex message",
        contents: this.data
      }
      window.liff.sendMessages([messageObject])
        .then(() => {
          window.alert('送信しました。')
          console.log('message sent');
        })
        .catch((err) => {
          window.alert('送信に失敗しました。\n' + err)
          console.log('error', err);
        });
    }
  }
}
</script>
<style scoped>
.flex-app .app {
  background-color: #728BB2;
  padding: 10px
}
.message {
  padding: 15px 0 15px 0;
}
.send-btn {
  padding: 10px 5px 10px 5px;
}
</style>
