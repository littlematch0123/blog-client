<template>
  <textarea :class="$style.textarea" :value="value" @input="$emit('input', $event.target.value)"/>
</template>
<script>
export default {
  props: {
    value: { type: String, required: true }
  }
}
</script>
<style module lang="postcss">
.textarea {
  display: block;
  flex: 1;
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  min-height: 140px;
  padding: 4px 10px;
  margin: 0;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  resize: none;
  line-height: 1.5;
  color: rgba(0, 0, 0, .8);
}
</style>
