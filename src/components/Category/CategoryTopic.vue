<template>
  <div v-if="category" :class="$style.wrap">
    <BaseBack @click.native="$router.push('/categories')">类别列表</BaseBack>
    <BaseTitle>{{ category.name }}专题</BaseTitle>
    <ul :class="$style.list">
      <li
        v-for="(item, index) in category.posts"
        :key="index"
        :class="$style.item"
        @click="$router.push({
          name:'post',
          params: { postid: item._id, parentPath: $route.path }
        })"
      >
        <i>{{ index + 1 }}、</i>
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import BaseTitle from '@/common/BaseTitle'
import BaseBack from '@/common/BaseBack'

export default {
  components: {
    BaseTitle,
    BaseBack
  },
  computed: {
    number() {
      return this.$route.params.number
    },
    category() {
      return this.$store.getters.getCategoryByNumber(Number(this.number))
    }
  }
}
</script>
<style module lang="postcss">
.wrap {
  padding: 10px;
  font-size: 1.1em;
}

.list {
  position: relative;
  width: 80%;
  max-width: 800px;
  margin: 16px auto;
  text-align: center;
  background-color: #fff;
}

.item {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 30px;
  margin: 20px 0;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
  cursor: pointer;

  & > i {
    position: absolute;
    margin-left: -26px;
  }
}

@media all and (min-width: 900px) {
  .item {
    padding: 20px 30px;
    margin: 26px 0;
  }
}
</style>
