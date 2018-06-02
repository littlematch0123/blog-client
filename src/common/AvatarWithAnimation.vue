<template>
  <BaseAvatar :class="$style.avatar"><slot /></BaseAvatar>
</template>
<script>
import BaseAvatar from './BaseAvatar'

export default {
  components: {
    BaseAvatar
  }
}
</script>

<style module lang="postcss">
.avatar {
  animation: pulsate 100s linear infinite;
}

@keyframes pulsate {
  0% {
    color: #333;
    background: #fff;
  }

  7% {
    color: #0c85ff;
    background: #001f3f;
  }

  14% {
    color: #40a9ff;
    background: #0074d9;
  }

  21% {
    color: #00a8e5;
    background: #7fdbff;
  }

  28% {
    color: #165656;
    background: #39cccc;
  }

  35% {
    color: #112c20;
    background: #3d9970;
  }

  42% {
    color: #124f18;
    background: #2ecc40;
  }

  49% {
    color: #00672d;
    background: #01ff70;
  }

  56% {
    color: #665700;
    background: #ffdc00;
  }

  63% {
    color: #ffd6b4;
    background: #ff851b;
  }

  70% {
    color: #ffd1cf;
    background: #ff4136;
  }

  77% {
    color: #e44e99;
    background: #85144b;
  }

  84% {
    color: #f9a2e6;
    background: #f012be;
  }

  91% {
    color: #e679f6;
    background: #b10dc9;
  }

  95% {
    color: #5e5e5e;
    background: #111;
  }

  96% {
    color: #919191;
    background: #ddd;
  }

  98% {
    color: #5d5d5d;
    background: #aaa;
  }

  100% {
    color: #b3b3b3;
    background: #fff;
  }
}
</style>
