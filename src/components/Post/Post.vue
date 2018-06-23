<template>
  <BaseFullScreen v-if="post" :class="$style.wrap">
    <header :class="$style.topBox">
      <BaseBack @click.native="$router.push($route.params.parentPath || '/')">返回</BaseBack>
      <div :class="$style.contentBox" titles="titles" @click="doShowContent=true">
        <SVGContent width="30" height="30" />&nbsp;目录
      </div>
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
    <article :class="$style.article">
      <BaseTitle>{{ post.title }}</BaseTitle>
      <BreadCrumb :class="$style.breadCrumb" :datas="post.titleDatas" />
      <BaseArticle :value="post.text" @translateTitles="getTitles" />
    </article>
    <router-view />
    <PostContent v-if="doShowContent" :titles="titles" @click.native="doShowContent=false" />
  </BaseFullScreen>
</template>
<script>
import BaseFullScreen from '@/common/BaseFullScreen'
import BaseBack from '@/common/BaseBack'
import BaseArticle from '@/common/BaseArticle'
import BaseTitle from '@/common/BaseTitle'
import BreadCrumb from '@/common/BreadCrumb'
import { LOAD_POST_ASYNC, CLEAR_POST } from '@/components/Post/module'
import { ADD_LIKE_ASYNC, DELETE_LIKE_ASYNC } from '@/components/Like/module'
import SVGContent from '@/common/SVG/SVGContent'
import SVGLike from '@/common/SVG/SVGLike'
import SVGComment from '@/common/SVG/SVGComment'
import PostContent from './PostContent'

export default {
  asyncData({ store, route }) {
    return store.dispatch(LOAD_POST_ASYNC, { id: route.params.postid })
  },
  components: {
    BaseFullScreen,
    BaseBack,
    BreadCrumb,
    BaseArticle,
    BaseTitle,
    PostContent,
    SVGContent,
    SVGLike,
    SVGComment
  },
  data() {
    return {
      titles: [],
      doShowContent: false
    }
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
  mounted() {
    !this.post && this.$store.dispatch(LOAD_POST_ASYNC, { id: this.postId })
  },
  beforeDestroy() {
    this.$store.commit(CLEAR_POST)
  },
  methods: {
    getTitles(value) {
      this.titles = value
    },
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
  align-items: center;
}

.contentBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
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
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  height: calc(100% - 50px);
  padding: 14px;
  margin-top: 10px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
}

.breadCrumb {
  justify-content: flex-end;
  line-height: 30px;
  color: rgba(0, 0, 0, .6);
}
</style>
