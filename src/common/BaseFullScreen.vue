<template>
  <section :class="$style.wrap" :style="{height:wrapHeight+'px'}"><slot /></section>
</template>
<script>
export default {
  computed: {
    wrapHeight() {
      return this.$store.state.size.height
    }
  }
}
</script>
<style module lang="postcss">
.wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  margin: 0 auto;
}
</style>
