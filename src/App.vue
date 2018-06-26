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
import { throttle } from '@/utils/util'

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
    window.addEventListener('devicemotion', throttle(this.testShake))
    this.setWrapHeight()
  },
  beforeDestroy() {
    window.removeEventListener('devicemotion', throttle(this.testShake))
  },
  methods: {
    testShake(e) {
      const { x, y, z } = e.accelerationIncludingGravity
      const { lastX, lastY, lastZ } = this
      const nowRange = Math.abs(lastX - x) + Math.abs(lastY - y) + Math.abs(lastZ - z)
      if (nowRange > 80) {
        window.location.href = ADMIN_URL
      }
      this.lastX = x
      this.lastY = y
      this.lastZ = z
    },
    setWrapHeight() {
      this.$store.commit(SET_HEIGHT, { height: document.documentElement.clientHeight })
    }
  }
}
</script>
<style module lang="postcss">
* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

html {
  height: 100%;
}

body {
  height: 100%;
  overflow: hidden;
  background-image: linear-gradient(90deg, #f3f3f3 2px, transparent 0), linear-gradient(#f3f3f3 2px, transparent 0), linear-gradient(90deg, #f3f3f3 1px, transparent 0), linear-gradient(#f3f3f3 1px, transparent 0);
  background-size: 100px 100px, 100px 100px, 40px 40px, 40px 40px;
  background-color: #fafafa;
  -webkit-font-smoothing: antialiased;
}

/* 格式化边距及边框 */
body,
p,
h1,
h2,
h3,
h4,
dl,
dd,
figure {
  margin: 0;
}

ol,
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

fieldset,
img {
  border: 0;
}

/* 要注意表单元素并不继承父级 font 的问题 */
body,
button,
input,
select,
textarea {
  font: 12px/1.2 PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;
}

@media all and (min-width: 900px) {
  body,
  button,
  input,
  select,
  textarea {
    font-size: 15px;
  }
}

/* 去掉各Table cell 的边距并让其边重合 */
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* 默认不显示下划线，保持页面简洁 */
a {
  text-decoration: none;
  color: inherit;
}

/* 表单格式化 */
input,
button,
textarea {
  padding: 0;
  border: none;
  outline: none;
  background: none;
  -webkit-appearance: none;
}

/* 代码片断 */
pre,
code,
pre tt {
  font-family: Courier, 'Courier New', monospace;
}

/* 电脑端自定义滚动条 */
@media all and (min-width: 900px) {
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, .1);
  }
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
