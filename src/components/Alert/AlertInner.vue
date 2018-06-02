<template>
  <BaseFullScreen :class="$style.screen">
    <BaseMask />
    <div :class="$style.inner"><slot /></div>
  </BaseFullScreen>
</template>
<script>
import BaseFullScreen from '@/common/BaseFullScreen'
import BaseMask from '@/common/BaseMask'

export default {
  components: {
    BaseMask,
    BaseFullScreen
  }
}
</script>
<style  module lang="postcss">
.screen {
  z-index: 3;
}

.inner {
  position: absolute;
  top: 0;
  left: 50%;
  box-sizing: border-box;
  min-width: 180px;
  padding: 16px;
  margin: 100px auto 0;
  border-radius: 4px;
  line-height: 22px;
  text-align: center;
  color: rgba(255, 255, 255, .8);
  background-color: rgba(0, 0, 0, .3);
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
  transform: translateX(-50%);
}

</style>
