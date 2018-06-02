<template>
  <div :class="$style.wrap">
    <BaseInput
      :value="value"
      :type="type"
      :placeholder="placeholder"
      @input="(val) => { $emit('input',val) }"
      @focus.native="onFocus"
      @blur.native="onBlur"
    />
    <span :class="$style.errShow">{{ errMsg }}</span>
  </div>
</template>
<script>
import BaseInput from '@/common/BaseInput'

export default {
  components: {
    BaseInput
  },
  props: {
    value: { type: String, default: '' },
    type: { type: String, default: 'input' },
    errMsg: { type: String, default: '' },
    onBlur: { type: Function, required: true },
    onFocus: { type: Function, required: true },
    placeholder: { type: String, default: '' }
  }
}
</script>
<style module>
.wrap {
  position: relative;
  margin: 12px 0;
  line-height: 40px;
}

.errShow {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px;
  font-size: 1em;
  color: red;
}
</style>
