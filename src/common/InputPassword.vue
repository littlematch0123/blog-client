<template>
  <div v-if="doShowPassword" :class="$style.wrap">
    <input
      :class="$style.input"
      :placeholder="placeholder"
      :value="value"
      autocomplete="off"
      autocapitalize="off"
      type="password"
      @input="$emit('input',$event.target.value)"
    >
    <SVGVisibility :class="$style.svg" @click.native="togglePassword"/>
  </div>
  <div v-else :class="$style.wrap">
    <input
      :class="$style.input"
      :placeholder="placeholder"
      :value="value"
      autocomplete="off"
      autocapitalize="off"
      type="text"
      @input="$emit('input',$event.target.value)"
    >
    <SVGVisibilityOff :class="$style.svg" @click.native="togglePassword"/>
  </div>
</template>
<script>
import SVGVisibility from './SVG/SVGVisibility'
import SVGVisibilityOff from './SVG/SVGVisibilityOff'

export default {
  components: {
    SVGVisibility,
    SVGVisibilityOff
  },
  props: {
    value: { type: String, required: true },
    placeholder: { type: String, default: '' }
  },
  data() {
    return {
      doShowPassword: true
    }
  },
  methods: {
    togglePassword() {
      this.doShowPassword = !this.doShowPassword
    }
  }
}
</script>
<style module lang="postcss">
.wrap {
  position: relative;
  margin: 12px 0;
  line-height: 40px;
}

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

.svg {
  position: absolute;
  top: 50%;
  right: 4px;
  transform: translateY(-50%);
  fill: #333;
}
</style>
