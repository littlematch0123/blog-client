<template>
  <div :class="$style.buttonBox">
    <ButtonAntiColor @click.native="onClick">{{ text }}</ButtonAntiColor>
  </div>
</template>
<script>
import ButtonAntiColor from '@/common/ButtonAntiColor'

export default {
  components: {
    ButtonAntiColor
  },
  props: {
    text: { type: String, required: true },
    onClick: { type: Function, required: true }
  }
}
</script>
<style module lang="postcss">
.buttonBox {
  line-height: 50px;
  text-align: right;
}
</style>
