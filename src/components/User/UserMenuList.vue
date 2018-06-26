<template>
  <BaseFullScreen :class="$style.screen" @click.native="onExit">
    <BaseMask :class="$style.mask"/>
    <ul :class="$style.list">
      <li :class="$style.item" @click="$router.push('/')" ><SVGHome />主页</li>
      <li :class="$style.item" @click="$router.push(`/users/${userId}`)" ><SVGUser />书桌</li>
      <li :class="$style.item" @click="$router.push('/posts/search')" ><SVGSearch />搜索</li>
      <li :class="$style.item" @click="$router.push('/posts')" ><SVGFilter />筛选</li>
      <li :class="$style.item" @click="$router.go(0)" ><SVGRefresh />刷新</li>
      <li :class="$style.item" @click="onLogoutClick" ><SVGExit />退出</li>
    </ul>
  </BaseFullScreen>
</template>
<script>
import BaseFullScreen from '@/common/BaseFullScreen'
import BaseMask from '@/common/BaseMask'
import SVGHome from '@/common/SVG/SVGHome'
import SVGUser from '@/common/SVG/SVGUser'
import SVGSearch from '@/common/SVG/SVGSearch'
import SVGExit from '@/common/SVG/SVGExit'
import SVGFilter from '@/common/SVG/SVGFilter'
import SVGRefresh from '@/common/SVG/SVGRefresh'
import { SIGNOUT } from '@/components/User/module'

export default {
  components: {
    BaseFullScreen,
    BaseMask,
    SVGHome,
    SVGUser,
    SVGExit,
    SVGFilter,
    SVGRefresh,
    SVGSearch
  },
  props: {
    onExit: { type: Function, required: true }
  },
  computed: {
    userId() {
      return this.$store.state.auth.user._id
    }
  },
  methods: {
    onLogoutClick() {
      this.$store.commit(SIGNOUT)
      this.$router.push('/signin_by_username')
    }
  }
}
</script>
<style module lang="postcss">
@keyframes move {
  100% { transform: translateY(0); }
}

@keyframes opacity {
  100% { opacity: 1; }
}

.screen {
  z-index: 2;
  max-width: 1200px;
}

.mask {
  opacity: 0;
  animation: opacity linear both .2s;
}

.list {
  position: absolute;
  width: 100%;
  padding: 10px;
  color: rgba(0, 0, 0, .8);
  background: #fff;
  transform: translateY(-100%);
  animation: move forwards .2s;
}

.item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  & > svg {
    margin-right: 16px;
  }
}
</style>
