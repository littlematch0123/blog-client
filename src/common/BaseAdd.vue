<template>
  <div :class="$style.backBox">
    <SVGAdd :class="$style.svg"/><slot />
  </div>
</template>
<script>
import SVGAdd from './SVG/SVGAdd'

export default {
  components: {
    SVGAdd
  }
}
</script>
<style module lang="postcss">
.backBox {
  display: flex;
  align-items: center;
  font-size: 1.1em;
}

.svg {
  margin-right: 6px;
}
</style>
