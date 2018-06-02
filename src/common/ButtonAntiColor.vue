<template>
  <BaseButton :class="$style.button"><slot /></BaseButton>
</template>
<script>
import BaseButton from './BaseButton'

export default {
  components: {
    BaseButton
  }
}
</script>
<style lang="postcss" module>
button.button {
  display: inline-block;
  width: auto;
  font-size: 1.1em;
  color: #2196f3;
  background: transparent;
}
</style>
