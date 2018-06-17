<template>
  <section :class="$style.wrap">
    <ul
      :class="{ [$style.panelBox]:true, [$style.transitionByPanelBox]:needTransition }"
      :style="{ width: `calc(100% * ${len})`, transform: transformByPanelBox }"
      @touchstart="onStartDrag"
      @touchmove="onMoveDrag"
      @touchend="onStopDrag"
    >
      <li
        v-for="(el,i) in imgDatas"
        :key="i"
        :style="{width:`calc(100% / ${len})`}"
        :class="[{[$style['panel-active']]:(i === index)}, $style['panel']]"
        @click.stop="$router.push(el.url)"
      >
        <img
          :class="$style['panel-img']"
          :src="el.src"
          :alt="el.name"
        >
      </li>
    </ul>
    <ul :class="$style.dotBox">
      <li
        v-for="(el,i) in dotLen"
        :key="i"
        :class="[{[$style['dot-active']]:(i === dotIndex)} ,$style.dot]"
        @click="onDotClick(i)"
      />
    </ul>
  </section>
</template>

<script>
const imgDatas = [
  {
    id: '1',
    name: 'HTML',
    src: require('@/assets/imgs/html.png'),
    url: '/categories/1000000000'
  },
  {
    id: '2',
    name: 'CSS',
    src: require('@/assets/imgs/css.png'),
    url: '/categories/1100000000'
  },
  {
    id: '3',
    name: 'JavaScript',
    src: require('@/assets/imgs/javascript.png'),
    url: '/categories/1200000000'
  },
  {
    id: '4',
    name: 'Vue',
    src: require('@/assets/imgs/vue.png'),
    url: '/categories/1403000000'
  },
  {
    id: '5',
    name: 'React',
    src: require('@/assets/imgs/react.png'),
    url: '/categories/1404000000'
  }
]

export default {
  data() {
    return {
      imgDatas,
      index: 0,
      len: 0,
      needTransition: false,
      slideDis: 0,
      transformByPanelBox: 'translate3d(0,0,0)',
      timer: 0,
      timerDuration: 3000
    }
  },
  computed: {
    // 显示点的数量为复制后的图像数量的一半
    dotLen() {
      return this.len / 2
    },
    // 显示点的索引值为图像索引值 % 显示点的数量
    dotIndex() {
      return this.index % this.dotLen
    }
  },
  mounted() {
    // 复制一次imgDatas，用于无缝滚动
    this.imgDatas = this.imgDatas.concat(this.imgDatas)
    // 设置轮播图的长度为图片的个数
    this.len = this.imgDatas.length
    // 开启自动轮播
    this.autoSwipe()
    // 设置轮播图的tranform属性
    this.$_setTransformByPanelBox_g()
  },
  methods: {
    /* 检测滑动 */
    $_checkSwipe(changeX, duration) {
      // 最小滑动距离为10px
      const THRESHOLD = 10
      // 最大滑动时间为300ms
      const SHORTESTTIME = 300
      // 距离大于10，且时间小于300ms，才算做一次滑动
      return Boolean(Math.abs(changeX) > THRESHOLD && duration < SHORTESTTIME)
    },

    /* 设置index */
    $_setIndex_g() {
      // 当index为原始列的第0个时， 将其设置为复制列的第0个
      if (this.index === 0) {
        this.index = this.len / 2
      }
      // 当index为复制列的最后一个时，将其设置为原始列的最后一个
      if (this.index === this.len - 1) {
        this.index = (this.len / 2) - 1
      }
    },

    /* 设置元素的transform属性 */
    $_setTransformByPanelBox_g() {
      // 如果过渡被开启，表示已经结束滑动
      if (this.needTransition) {
        this.transformByPanelBox = `translate3d(calc(-${this.index} * 100% / ${this.len}) , 0, 0)`
        // 否则，正在滑动
      } else {
        const temp = `${((-this.index / this.len) * 100)}%`
        this.transformByPanelBox = `translate3d(calc(${temp} + ${this.slideDis}px), 0, 0)`
      }
    },

    /* 自动轮播 */
    autoSwipe() {
      const autoSetTimeoutFn = () => {
        // 如果是复制列的最后一个，则将其设置为原始列的最后一个。并取消transition，设置transform
        if (this.index === this.len - 1) {
          this.index = (this.len / 2) - 1
          this.needTransition = false
          this.$_setTransformByPanelBox_g()
        }
        // 设置index的自增
        this.index = (this.index + 1) % this.len
        // 设置50ms的延时，为元素渲染留出时间
        setTimeout(() => {
          this.needTransition = true
          this.$_setTransformByPanelBox_g()
        }, 50)
        this.timer = setTimeout(autoSetTimeoutFn, this.timerDuration)
      }
      this.timer = setTimeout(autoSetTimeoutFn, this.timerDuration)
    },
    /* Dot点击事件 */
    onDotClick(i) {
      // 设置index
      this.index = i
      // 关闭过渡
      this.$_setTransformByPanelBox_g()
    },
    /* 开始滑动 */
    onStartDrag(e) {
      // 记录手指按下时的时刻及位置
      this.startTime = new Date().getTime()
      this.startX = e.changedTouches[0].pageX
      // 清除定时器，并将其值置0
      clearInterval(this.timer)
      this.timer = 0
      // 设置index
      this.$_setIndex_g()
      // 关闭过渡
      this.needTransition = false
    },

    /* 滑动过程 */
    onMoveDrag(e) {
      // 记录手指的滑动距离
      this.slideDis = e.changedTouches[0].pageX - this.startX
      // 设置元素的transform属性
      this.$_setTransformByPanelBox_g()
    },

    /* 滑动结束 */
    onStopDrag(e) {
      // 记录手指的滑动时间及滑动距离
      const duration = new Date().getTime() - this.startTime
      const moveX = e.changedTouches[0].pageX - this.startX
      // 检测是否是一次成功的滑动
      if (this.$_checkSwipe(moveX, duration)) {
        // 检测方向，如果moveX>0，表示向右滑动，则index减小
        if (moveX > 0) {
          this.index = this.index - 1
          // 否则，表示向左滑动，index增大
        } else {
          this.index = this.index + 1
        }
      }
      // 开启过渡
      this.needTransition = true
      // 设置元素的transform属性[注意：transform属性的设置依赖于是否开启过渡]
      this.$_setTransformByPanelBox_g()
      // 开启自动轮播
      this.autoSwipe()
    }
  }
}
</script>
<style module lang="postcss">
.wrap {
  position: relative;
  height: 140px;
  overflow: hidden;
}

@media all and (min-width: 900px) {
  .wrap {
    height: 240px;
  }
}

.panelBox {
  display: flex;
  height: 100%;
}

.transitionByPanelBox {
  transition: transform .2s;
}

.panel {
  height: 100%;
}

.panel-img {
  width: 100%;
  height: 100%;
}

.dotBox {
  position: absolute;
  bottom: 10px;
  left: 36%;
  right: 36%;
  display: flex;
  justify-content: space-between;
}

.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, .6);
  cursor: pointer;
}

@media all and (min-width: 900px) {
  .dot {
    width: 20px;
    height: 20px;
  }
}

.dot-active {
  background: #fff;
}
</style>
