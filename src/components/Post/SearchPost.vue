<template>
  <BaseSearchBox :datas="posts" />
</template>
<script>
import BaseSearchBox from '@/common/BaseSearchBox'

export default {
  components: {
    BaseSearchBox
  },
  computed: {
    posts() {
      return this.$store.getters.getPosts
    }
  }
}
</script>

