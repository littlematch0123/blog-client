<template>
  <button :class="$style.button" type="button" ><slot /></button>
</template>
<style module lang="postcss">
.button {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
  border-radius: 4px;
  font-size: 1.3em;
  line-height: 42px;
  text-align: center;
  color: #fff;
  background: #2196f3;
  cursor: pointer;

  &:focus {
    outline: none;
  }
}
</style>
