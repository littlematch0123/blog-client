<template>
  <div :class="$style.backBox">
    <SVGBack :class="$style.svg"/><slot />
  </div>
</template>
<script>
import SVGBack from './SVG/SVGBack'

export default {
  components: {
    SVGBack
  }
}
</script>
<style module lang="postcss">
.backBox {
  display: flex;
  align-items: center;
  font-size: 1.1em;
  cursor: pointer;
}

.svg {
  margin-right: 6px;
}
</style>
