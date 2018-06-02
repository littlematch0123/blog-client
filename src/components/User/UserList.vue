<template>
  <BaseFullScreen @click.native="onExit">
    <BaseMask/>
    <nav v-if="users" :class="$style.inner">
      <BaseAvatar v-for="(item, index) in users" :class="$style.avatar" :key="index">
        {{ item.username }}
      </BaseAvatar>
    </nav>
  </BaseFullScreen>
</template>
<script>
import BaseFullScreen from '@/common/BaseFullScreen'
import BaseMask from '@/common/BaseMask'
import BaseAvatar from '@/common/BaseAvatar'

export default {
  components: {
    BaseFullScreen,
    BaseMask,
    BaseAvatar
  },
  props: {
    onExit: { type: Function, required: true }
  },
  computed: {
    users() {
      return this.$store.state.auth.users
    }
  }
}
</script>
<style module lang="postcss">
.inner {
  position: relative;
  display: flex;
  flex-flow: wrap row;
  padding: 10px;
}

.avatar {
  margin: 10px;
}
</style>
