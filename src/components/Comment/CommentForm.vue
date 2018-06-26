<template>
  <BaseFullScreen>
    <BaseMask />
    <div :class="$style.wrap">
      <BaseTextArea v-model="textAreaValue" placeholder="在此处写下评论..." />
      <ButtonBox :class="$style.buttonBox" :onConfirmClick="onConfirmClick" />
    </div>
  </BaseFullScreen>
</template>
<script>
import BaseFullScreen from '@/common/BaseFullScreen'
import BaseMask from '@/common/BaseMask'
import BaseTextArea from '@/common/BaseTextArea'
import ButtonBox from '@/common/ButtonBox'
import { ADD_COMMENT_ASYNC, UPDATE_COMMENT_ASYNC } from '@/components/Comment/module'

export default {
  components: {
    BaseTextArea,
    ButtonBox,
    BaseFullScreen,
    BaseMask
  },
  props: {
    operate: { type: String, required: true }
  },
  data() {
    return {
      textAreaValue: ''
    }
  },
  computed: {
    userId() {
      const { user } = this.$store.state.auth
      if (!user) return ''
      return user._id
    },
    postId() {
      return this.$route.params.postid
    },
    commentId() {
      return this.$route.params.commentid
    },
    comment() {
      return this.$store.getters.getCommentById(this.commentId)
    }
  },
  mounted() {
    if (!this.comment && this.operate === 'update') {
      this.$router.push(`/posts/${this.postId}/comments`)
    } else {
      this.setTextAreaValue()
    }
  },
  methods: {
    setTextAreaValue() {
      switch (this.operate) {
        case 'add':
          this.textAreaValue = ''
          break
        case 'update':
          this.textAreaValue = this.comment.content
          break
        default:
          return false
      }
    },
    onConfirmClick() {
      if (this.textAreaValue.trim()) {
        const { dispatch } = this.$store
        switch (this.operate) {
          case 'add':
            dispatch(ADD_COMMENT_ASYNC, { user: this.userId, post: this.postId, content: this.textAreaValue }).then(() => {
              this.$router.push(`/posts/${this.postId}/comments`)
            })
            break
          case 'update':
            dispatch(UPDATE_COMMENT_ASYNC, { id: this.commentId, data: { user: this.userId, post: this.postId, content: this.textAreaValue } }).then(() => {
              this.$router.push(`/posts/${this.postId}/comments`)
            }, () => {
              this.$router.push(`/posts/${this.postId}/comments`)
            })
            break
          default:
            return false
        }
      }
    }
  }
}
</script>
<style module lang="postcss">
.wrap {
  position: relative;
  box-sizing: border-box;
  max-width: 1200px;
  height: 220px;
  padding: 10px;
  margin: 0 auto;
  border-radius: 4px;
  background: #fff;
}

.buttonBox {
  margin-top: 10px;
}
</style>
