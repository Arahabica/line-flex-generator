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
    },
    title: {
      type: String,
      default: 'this is a flex message'
    },
    type: {
      type: String,
      default: 'here'
    }
  },
  methods: {
    send() {
      if (window.confirm('送信してもよろしいですか？')) {
        const messageObject = {
          type: "flex",
          altText: this.title,
          contents: this.data
        }
        if (this.type === 'share') {
          window.liff.shareTargetPicker([messageObject])
            .then(() => {
              window.alert('送信しました。')
              console.log('message sent');
            })
            .catch((err) => {
              window.alert('送信に失敗しました。\n' + err)
              console.log('error', err);
            });
        } else {
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
