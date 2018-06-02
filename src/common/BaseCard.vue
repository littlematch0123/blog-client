<template>
  <section :class="$style.article"><slot /></section>
</template>
<style module lang="postcss">
.article {
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  padding: 14px;
  margin-top: 10px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
}
</style>
