<template>
  <h1 :class="$style.title"><slot /></h1>
</template>
<style module lang="postcss">
.title {
  align-self: center;
  padding: 6px 0;
  font-weight: normal;
  font-size: 1.6em;
  line-height: 2;
  text-align: center;
  cursor: default;
}
</style>
