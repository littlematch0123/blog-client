<template>
  <div
    id="root"
    :class="$style.wrap"
    :style="{height:wrapHeight+'px'}"
  >
    <AlertWithLoading v-show="doShowLoading" />
    <AlertWithText
      v-show="alertText !== ''"
      :text="alertText"
      :onClick="() => {$store.commit(HIDE_ALERTTEXT)}"
    />
    <TheHeader :class="$style.header"/>
    <main :class="$style.main">
      <transition :name="transitionName">
        <router-view :class="$style.router" />
      </transition>
    </main>
  </div>

</template>

<script>
import TheHeader from '@/components/TheHeader/TheHeader'
import AlertWithText from '@/components/Alert/AlertWithText'
import AlertWithLoading from '@/components/Alert/AlertWithLoading'
import { HIDE_ALERTTEXT } from '@/components/Alert/module'
import { SET_HEIGHT } from '@/components/Size/module'
import { ADMIN_URL } from '@/constants/API'

export default {
  components: {
    TheHeader,
    AlertWithText,
    AlertWithLoading
  },
  data() {
    return {
      transitionName: 'left',
      HIDE_ALERTTEXT,
      lastX: null,
      lastY: null,
      lastZ: null
    }
  },
  computed: {
    alertText() {
      return this.$store.state.alert.alertText
    },
    doShowLoading() {
      return this.$store.state.alert.doShowLoading
    },
    wrapHeight() {
      return this.$store.state.size.height
    }
  },
  watch: {
    $route(to, from) {
      this.transitionName = to.meta.index < from.meta.index ? 'right' : 'left'
    }
  },
  mounted() {
    window.addEventListener('devicemotion', this.testShake)
    this.setWrapHeight()
  },
  destroyed() {
    window.removeEventListener('devicemotion', this.testShake)
  },
  methods: {
    testShake(e) {
      requestAnimationFrame(() => {
        const { x, y, z } = e.accelerationIncludingGravity
        const { lastX, lastY, lastZ } = this
        const nowRange = Math.abs(lastX - x) + Math.abs(lastY - y) + Math.abs(lastZ - z)
        if (nowRange > 80) {
          window.location.href = ADMIN_URL
        }
        this.lastX = x
        this.lastY = y
        this.lastZ = z
      })
    },
    setWrapHeight() {
      this.$store.commit(SET_HEIGHT, { height: document.documentElement.clientHeight })
    }
  }
}
</script>
<style module>
html {
  height: 100%;
}

body {
  height: 100%;
  background-image: linear-gradient(90deg, #f3f3f3 2px, transparent 0), linear-gradient(#f3f3f3 2px, transparent 0), linear-gradient(90deg, #f3f3f3 1px, transparent 0), linear-gradient(#f3f3f3 1px, transparent 0);
  background-size: 100px 100px, 100px 100px, 40px 40px, 40px 40px;
}

.wrap {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  background: #fafafa;
}

.header {
  height: 40px;
}

.main {
  position: relative;
  height: calc(100% - 40px);
  overflow: auto;
}

.router {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
}
</style>
<style scope>
.left-enter,
.right-leave-to {
  transform: translate3d(100%, 0, 0);
}

.left-leave-to,
.right-enter {
  transform: translate3d(-100%, 0, 0);
}

.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active {
  transition: transform .5s;
}
</style>
