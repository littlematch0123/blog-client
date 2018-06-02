<template>
  <ol :class="$style.list">
    <li v-for="(item, index) in datas" :key="index" :class="$style.item">{{ item }}</li>
  </ol>
</template>
<script>
export default {
  props: {
    datas: { type: Array, required: true }
  }
}
</script>
<style module lang="postcss">
.list {
  display: flex;
  overflow: auto;
}

.item {
  flex-shrink: 0;
  margin: 0 4px;

  &::after {
    position: relative;
    left: 4px;
    content: '/';
  }

  &:last-child::after {
    content: '';
  }
}
</style>
