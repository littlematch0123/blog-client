<template>
  <section :class="$style.wrap">
    <header :class="$style.header">
      <router-link
        :active-class="$style.active"
        :to="{ name: `${signinURL}`, params: { parentPath } }"
      >登&nbsp;录</router-link>
      <router-link
        :active-class="$style.active"
        :to="{ name: 'signup', params: { parentPath } }"
      >注&nbsp;册</router-link>
    </header>
    <slot />
  </section>
</template>
<script>
export default {
  props: {
    signinURL: { type: String, default: 'signin_by_username' }
  },
  computed: {
    parentPath() {
      const temp = this.$route.params.parentPath
      if (temp) {
        return temp
      }
      return ''
    }
  }
}
</script>

<style module lang="postcss">
.wrap {
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  text-align: center;
}

.header {
  display: flex;
  justify-content: space-between;
  width: 140px;
  margin: 20px auto;
  font-weight: normal;
  font-size: 1.6em;
}

.active {
  padding-bottom: 6px;
  border-bottom: 1px solid #2196f3;
  color: #2196f3;
}
</style>
