<template>
  <header :class="$style.header">
    <div :class="$style.logoBox" @click="$router.push('/')">
      <SVGLogo height="32" width="32"/>
      <h1 :class="$style.title">小火柴的蓝色理想</h1>
    </div>
    <BaseAvatar :style="{transform: `rotate(${beta}deg)`}" @click.native="onUserClick">
      {{ user ? user.username : '我' }}
    </BaseAvatar>
    <UserMenuList v-if="doShowMenuList" :onExit="() => {doShowMenuList = false}"/>
  </header>
</template>

<script>
import SVGLogo from '@/common/SVG/SVGLogo'
import BaseAvatar from '@/common/BaseAvatar'
import BaseMask from '@/common/BaseMask'
import UserMenuList from '@/components/User/UserMenuList'
import { mapState, mapGetters } from 'vuex'
import { LOAD_CATEGORIES_ASYNC } from '@/components/Category/module'
import { LOAD_POSTS_ASYNC } from '@/components/Post/module'
import { LOAD_LIKES_ASYNC } from '@/components/Like/module'
import { LOAD_COMMENTS_ASYNC } from '@/components/Comment/module'
import { LOAD_USERS_ASYNC, SIGNIN } from '@/components/User/module'

export default {
  components: {
    BaseAvatar,
    BaseMask,
    SVGLogo,
    UserMenuList
  },
  data() {
    return {
      beta: '',
      doShowMenuList: false
    }
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
      user: state => state.auth.user
    }),
    ...mapGetters([
      'postCount',
      'categoryCount',
      'likeCount',
      'commentCount',
      'userCount'
    ])
  },
  mounted() {
    // 获取异步信息
    this.loadAsync()
    // 自动登录
    this.autoLogin()
    // 监测陀螺仪
    window.addEventListener('deviceorientation', this.changeBeta)
  },
  destroyed() {
    // 取消监测
    window.removeEventListener('deviceorientation', this.changeBeta)
  },
  methods: {
    loadAsync() {
      const { postCount, categoryCount, userCount, likeCount, commentCount } = this
      const { dispatch } = this.$store
      // 获取类别信息
      !categoryCount && dispatch(LOAD_CATEGORIES_ASYNC)
      // 获取文章信息
      !postCount && dispatch(LOAD_POSTS_ASYNC)
      // 获取点赞信息
      !likeCount && dispatch(LOAD_LIKES_ASYNC)
      // 获取评论信息
      !commentCount && dispatch(LOAD_COMMENTS_ASYNC)
      // 获取用户信息
      !userCount && dispatch(LOAD_USERS_ASYNC)
    },
    autoLogin() {
      const { commit } = this.$store
      // 如果storage中存在token，则使用storage中保存的信息进行自动登录
      if (sessionStorage.token) {
        commit(SIGNIN, {
          user: JSON.parse(sessionStorage.user),
          token: sessionStorage.token
        })
      }
    },
    onUserClick() {
      // 如果当前用户已经登录，则弹出选择列表界面
      if (this.user) {
        this.doShowMenuList = true
      // 如果用户未登录，则显示登录页面
      } else {
        this.$router.push('/signin_by_username')
      }
    },
    changeBeta(e) {
      requestAnimationFrame(() => {
        if (this.beta !== Math.round(e.beta)) {
          this.beta = Math.round(e.beta)
        }
      })
    }
  }
}
</script>

<style module lang="postcss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
}

.logoBox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.title {
  display: inline-block;
  margin-left: 4px;
  font-size: 1.1em;
  background-image: linear-gradient(160deg, #7fdbff, #0074d9);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
</style>
