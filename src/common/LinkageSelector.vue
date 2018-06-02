<template>
  <section :class="$style.wrap">
    <ul :class="$style.list">
      <li
        v-for="(item, i) in datas"
        :key="i"
        :class="$style.item"
        @click="$emit('input',item)"
      >{{ item.name }}</li>
    </ul>
  </section>
</template>
<script>
export default {
  props: {
    datas: { type: Array, required: true }
  }
}
</script>
<style module lang="postcss">
.wrap {
  padding: 10px;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
}

.list {
  border: 1px solid #aaa;
  border-radius: 4px;
}

.item {
  padding: 10px;
  border-top: 1px solid #ccc;
  line-height: 20px;
  cursor: pointer;

  &:first-child {
    border: none;
  }
}
</style>
