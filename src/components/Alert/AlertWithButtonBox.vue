<template>
  <AlertInner>
    <h2 :class="$style.title">{{ text }}</h2>
    <ButtonBox :onConfirmClick="onConfirmClick"/>
  </AlertInner>
</template>
<script>
import ButtonBox from '@/common/ButtonBox'
import AlertInner from './AlertInner'

export default {
  components: {
    ButtonBox,
    AlertInner
  },
  props: {
    onConfirmClick: { type: Function, required: true },
    text: { type: String, required: true }
  }
}
</script>
<style  module lang="postcss">
.title {
  padding: 10px;
  font-weight: bold;
  font-size: 1.2em;
  line-height: 2;
}
</style>
