<template>
  <input
    :class="$style.input"
    :value="value"
    autocomplete="off"
    autocapitalize="off"
    @input="$emit('input', $event.target.value)"
  >
</template>
<script>
export default {
  props: {
    value: { type: String, default: '' }
  }
}
</script>
<style module lang="postcss">
.input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 20px;
  border: 1px solid #e5e5e5;
  border-radius: 4px 4px 0 0;
  font-size: 1.1em;
  line-height: 18px;
  letter-spacing: 1px;
  color: #333;

  &:focus {
    border-bottom: 1px solid #666;
    outline: none;
  }
}
</style>
