<template>
  <AlertInner>
    <h3 :class="$style.title">{{ text }}</h3>
    <span
      :class="$style.exit"
      @click="onClick"
    >&times;</span>
  </AlertInner>
</template>
<script>
import AlertInner from './AlertInner'

export default {
  components: {
    AlertInner
  },
  props: {
    text: { type: String, required: true },
    onClick: { type: Function, required: true }
  }
}
</script>
<style module lang="postcss">
.title {
  float: left;
  box-sizing: border-box;
  width: calc(100% - 32px);
  padding: 4px 0;
  font-size: 1.2em;
  cursor: default;
}

.exit {
  float: right;
  box-sizing: border-box;
  width: 32px;
  padding: 2px 6px;
  font-size: 26px;
  cursor: pointer;
}
</style>
