<template>
  <BaseFullScreen>
    <BaseMask :class="$style.mask"/>
    <nav :class="$style.list">
      <a
        v-for="(item, index) in titles"
        :key="item"
        :class="$style.item"
        :href="`#anchor${index + 1}`"
      >
        {{ index + 1 }}、{{ item }}
      </a>
    </nav>
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
}
</style>
