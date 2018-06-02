<template>
  <div :class="$style.box">
    <BaseButton @click.native="onConfirmClick">{{ textForConfirm }}</BaseButton>
    <ButtonAntiColor @click.native="$router.go(-1)">{{ textForCancle }}</ButtonAntiColor>
  </div>
</template>
<script>
import BaseButton from '@/common/BaseButton'
import ButtonAntiColor from '@/common/ButtonAntiColor'

export default {
  components: {
    BaseButton,
    ButtonAntiColor
  },
  props: {
    onConfirmClick: { type: Function, required: true },
    textForConfirm: { type: String, default: '确定' },
    textForCancle: { type: String, default: '取消' }
  }
}
</script>
<style module lang="postcss">
.box {
  display: flex;
  justify-content: center;
  align-items: center;

  & button {
    width: auto;
  }
}
</style>
