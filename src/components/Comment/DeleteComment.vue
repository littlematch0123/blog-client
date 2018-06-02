<template>
  <AlertWithButtonBox :onConfirmClick="deleteComment" text="确定要删除吗?" />
</template>
<script>
import AlertWithButtonBox from '@/components/Alert/AlertWithButtonBox'
import { DELETE_COMMENT_ASYNC } from './module'

export default {
  components: {
    AlertWithButtonBox
  },
  computed: {
    postId() {
      return this.$route.params.postid
    },
    commentId() {
      return this.$route.params.commentid
    }
  },
  methods: {
    deleteComment() {
      this.$store.dispatch(DELETE_COMMENT_ASYNC, { id: this.commentId }).then(() => {
        this.$router.push(`/posts/${this.postId}/comments`)
      }, () => {
        this.$router.push(`/posts/${this.postId}/comments`)
      })
    }
  }
}
</script>
