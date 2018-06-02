<template>
  <div :class="$style.avatar"><slot /></div>
</template>
<style module lang="postcss">
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  line-height: 30px;
  text-align: center;
  color: #fff;
  background-color: #00a8e5;
  cursor: pointer;
}

</style>
