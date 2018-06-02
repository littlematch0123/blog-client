<template>
  <AlertInner>
    <BaseLoading/>
    <h2 :class="$style.title">请稍候</h2>
  </AlertInner>
</template>
<script>
import BaseLoading from '@/common/BaseLoading'
import AlertInner from './AlertInner'

export default {
  components: {
    BaseLoading,
    AlertInner
  }
}
</script>
<style module lang="postcss">
.title {
  font-weight: bold;
  font-size: 1.2em;
  line-height: 2;
}
</style>
