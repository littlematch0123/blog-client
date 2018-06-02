<template>
  <svg :class="$style.svg" height="50" width="50" viewBox="0 0 50 50">
    <circle :class="$style.circle" cx="25" cy="25" r="20" fill="none" stroke-width="4" />
  </svg>
</template>
<script>
</script>
<style module lang="postcss">
@keyframes progressCircularRotate {
  100% { transform: rotate(360deg); }
}

@keyframes progressCircularDash {
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -120px;
  }
}

.svg {
  color: #2196f3;
  animation: progressCircularRotate 1.4s linear infinite;
}

.circle {
  stroke-dasharray: 80px, 200px;
  stroke-dashoffset: 0;
  stroke: currentColor;
  stroke-linecap: round;
  animation: progressCircularDash 1.4s ease-in-out infinite;
}
</style>
