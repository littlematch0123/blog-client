<template>
  <BaseFullScreen v-if="post" :class="$style.wrap">
    <header :class="$style.topBox">
      <BaseBack @click.native="$router.push($route.params.parentPath || '/')">返回</BaseBack>
      <ul :class="$style.controlBox">
        <li :class="$style.control" @click="toggleLike">
          <SVGLike :fill="like ? '#f00' : '#000'" />
          <p>喜欢 {{ likesCount }}</p>
        </li>
        <li :class="$style.control" @click="comment">
          <SVGComment />
          <p>评论 {{ commentsCount }}</p>
        </li>
      </ul>
    </header>
    <BaseCard :class="$style.article">
      <BaseTitle>{{ post.title }}</BaseTitle>
      <BreadCrumb :class="$style.breadCrumb" :datas="post.titleDatas"/>
      <BaseArticle>{{ post.text }}</BaseArticle>
    </BaseCard>
    <router-view />
  </BaseFullScreen>
</template>
<script>
import VueMarkdown from 'vue-markdown'
import BaseFullScreen from '@/common/BaseFullScreen'
import BaseCard from '@/common/BaseCard'
import BaseBack from '@/common/BaseBack'
import BaseArticle from '@/common/BaseArticle'
import BaseTitle from '@/common/BaseTitle'
import BreadCrumb from '@/common/BreadCrumb'
import { LOAD_POST_ASYNC, CLEAR_POST } from '@/components/Post/module'
import { ADD_LIKE_ASYNC, DELETE_LIKE_ASYNC } from '@/components/Like/module'
import SVGLike from '@/common/SVG/SVGLike'
import SVGComment from '@/common/SVG/SVGComment'

export default {
  components: {
    VueMarkdown,
    BaseFullScreen,
    BaseCard,
    BaseBack,
    BreadCrumb,
    BaseArticle,
    BaseTitle,
    SVGLike,
    SVGComment
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    postId() {
      return this.$route.params.postid
    },
    post() {
      return this.$store.getters.getPostWithTitleDatas
    },
    like() {
      return this.$store.getters.getLike({ userId: this.user && this.user._id, postId: this.postId })
    },
    likesCount() {
      return this.$store.getters.getLikesCountByPostId(this.postId)
    },
    commentsCount() {
      return this.$store.getters.getCommentsCountByPostId(this.postId)
    }
  },
  created() {
    this.$store.dispatch(LOAD_POST_ASYNC, { id: this.postId })
  },
  beforeDestroy() {
    this.$store.commit(CLEAR_POST)
  },
  methods: {
    toggleLike() {
      const { dispatch } = this.$store
      if (this.testWhetherDoLogin()) {
        if (this.like) {
          dispatch(DELETE_LIKE_ASYNC, { id: this.like._id })
        } else {
          dispatch(ADD_LIKE_ASYNC, { post: this.postId, user: this.user._id })
        }
      }
    },
    comment() {
      if (this.testWhetherDoLogin()) {
        this.$router.push(`/posts/${this.postId}/comments`)
      }
    },
    testWhetherDoLogin() {
      if (this.user) {
        return true
      }
      this.$router.push({ name: 'signin_by_username', params: { parentPath: this.$route.path } })
    }
  }
}
</script>
<style module lang="postcss">
.wrap {
  box-sizing: border-box;
  padding: 10px;
  background: #eee;
}

.topBox {
  display: flex;
  justify-content: space-between;
}

.controlBox {
  display: flex;
  text-align: center;
}

.control {
  padding: 0 10px;
  cursor: pointer;
}

.article {
  height: calc(100% - 50px);
}

.breadCrumb {
  justify-content: flex-end;
  line-height: 30px;
  color: rgba(0, 0, 0, .6);
}
</style>
