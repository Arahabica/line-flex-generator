<template lang="pug">
.edit-app
  v-container
    div(v-for="(content, i) in flex.contents")
      v-row.page
        h1 ページ{{i + 1}}
      v-row
        v-text-field(
          label="画像URL"
          placeholder="画像URLを入力"
          v-model="content.hero.url"
        )
      v-row
        v-text-field(
          label="画像リンクURL"
          placeholder="画像リンクURLを入力(省略可)"
          v-model="content.hero.action.uri"
        )
      v-row(v-if="content.body")
        v-text-field(
          label="タイトル"
          placeholder="タイトルを入力"
          v-model="content.body.contents[0].text"
        )
      v-row(v-if="content.body")
        v-text-field(
          label="説明"
          placeholder="説明を入力"
          v-model="content.body.contents[1].text"
        )
      template(v-if="content.footer")
        div(v-for="(btn, j) in content.footer.contents")
          v-row
            v-text-field(
              :label="`ボタン${j + 1}`"
              :placeholder="`ボタン${j + 1}のタイトル`"
              v-model="btn.action.label"
          )
          v-row
            v-text-field(
              :label="`ボタン${j + 1}のURL`"
              :placeholder="`ボタン${j + 1}のURL`"
              v-model="btn.action.uri"
            )
          v-row
            v-text-field(
              :label="`ボタン${j + 1}の色`"
              :placeholder="`ボタン${j + 1}の色`"
              v-model="btn.color"
            )
          v-row(justify="center")
            v-btn(@click="() => deleteBtn(i, j)") ボタン{{j + 1}}削除
      v-row(justify="center" :style="{paddingTop: '40px'}")
        v-col(v-if="content.body").text-center
          v-btn(color="secondary" @click="() => deleteText(i)") テキスト削除
        v-col(v-else).text-center
          v-btn(color="secondary" @click="() => addText(i)") テキスト追加
        v-col.text-center(v-if="!content.footer || content.footer.contents.length < 4")
          v-btn(color="secondary" @click="() => addBtn(i)") ボタン追加
        v-col.text-center
          v-btn(color="error" @click="() => deletePage(i)") ページ{{i + 1}}削除
  v-btn.margin-btn(v-if="flex.contents.length < 4" block color="secondary" @click="addPage") ページ追加
  v-btn.margin-btn(block color="primary" @click="save") 反映

</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      flex: this.data
    }
  },
  computed: {
    isTemplateFlex() {
      if (this.flex.type !== 'carousel') {
        return false
      }
      const contents = this.flex.contents
      if (!contents || contents.length === 0) {
        return false
      }
      let ok = true
      contents.forEach(content => {
        if (!(content.hero && content.hero.type === 'image')) {
          ok = false
        }
        if (!(content.body && content.body.contents && contetns.body.contents.length > 1)) {
          ok = false
        }
      })
      return ok
    }
  },
  methods: {
    save() {
      this.$emit('save', this.flex)
    },
    deleteText(page) {
      this.flex.contents[page].body = null
    },
    addText(page) {
      this.flex.contents[page].body = {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "text",
            "text": "",
            "wrap": true,
            "weight": "bold",
            "size": "xl"
          },
          {
            "type": "text",
            "text": "",
            "wrap": true
          }
        ]
      }
    },
    deleteBtn(page, num) {
      const btns = this.flex.contents[page].footer.contents
      this.flex.contents[page].footer.contents = btns.filter((btn, i) => i !== num)
      if (this.flex.contents[page].footer.contents.length === 0) {
        this.flex.contents[page].footer = null
      }
    },
    addBtn(page) {
      if (!this.flex.contents[page].footer) {
        this.flex.contents[page].footer =  {
          "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": []
        }
      }
      this.flex.contents[page].footer.contents.push({
        "type": "button",
        "style": "primary",
        "color": "#dadada",
        "action": {
          "type": "uri",
          "label": "ボタン",
          "uri": "https://linecorp.com"
        }
      })
    },
    deletePage(page) {
      this.flex.contents = this.flex.contents.filter((c, i) => i !== page)
    },
    addPage() {
      this.flex.contents.push({
        "type": "bubble",
        "hero": {
          "type": "image",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "url": ""
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "text",
              "text": "",
              "wrap": true,
              "weight": "bold",
              "size": "xl"
            },
            {
              "type": "text",
              "text": "",
              "wrap": true
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "button",
              "style": "primary",
              "color": "#28c756",
              "action": {
                "type": "uri",
                "label": "ボタン",
                "uri": "https://linecorp.com"
              }
            }
          ]
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus">
.edit-app
  padding 15px 10px 5px 10px
.page
  padding 70px 0 10px 0
.margin-btn
  margin-top 30px
</style>
