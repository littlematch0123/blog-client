<template>
  <BaseFullScreen>
    <BaseMask :class="$style.mask"/>
    <ul :class="$style.list">
      <li
        v-for="(item, index) in titles"
        :key="item"
        :class="$style.item"
        @click="onChangeAnchor(`anchor${index+1}`)"
      >
        {{ index + 1 }}、{{ item }}
      </li>
    </ul>
  </BaseFullScreen>
</template>
<script>
import BaseFullScreen from '@/common/BaseFullScreen'
import BaseMask from '@/common/BaseMask'

export default {
  components: {
    BaseFullScreen,
    BaseMask
  },
  props: {
    titles: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onChangeAnchor(id) {
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
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

.mask {
  opacity: 0;
  animation: opacity linear both .2s;
}

.list {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  max-height: 100%;
  padding: 10px;
  overflow: auto;
  line-height: 2;
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
}
</style>
