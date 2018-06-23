<template>
  <article v-if="category" :class="$style.box">
    <BaseBack @click.native="$router.push('/categories')">类别列表</BaseBack>
    <BaseTitle>{{ category.name }}知识体系</BaseTitle>
    <section :class="$style.main">
      <p :class="$style.description">{{ category.description }}</p>
      <dl v-for="(item, index) in childCategories" :key="index">
        <dt>
          <BreadCrumb :class="$style['bread-crumb']" :datas="item.titleDatas"/>
        </dt>
        <dd
          v-for="(innerItem, innerIndex) in item.posts"
          :key="innerIndex"
          :class="$style.item"
          @click="$router.push({
            name:'post',
            params: { postid: innerItem._id, parentPath: $route.path }
          })"
        >{{ innerItem.title }}</dd>
      </dl>
    </section>
  </article>
</template>
<script>
import BaseBack from '@/common/BaseBack'
import BreadCrumb from '@/common/BreadCrumb'
import BaseTitle from '@/common/BaseTitle'

export default {
  components: {
    BreadCrumb,
    BaseBack,
    BaseTitle
  },
  computed: {
    paramsNumber() {
      return this.$route.params.number
    },
    category() {
      return this.$store.getters.getCategoryByNumber(Number(this.paramsNumber))
    },
    childCategories() {
      return this.$store.getters.getPosterityCategories(Number(this.paramsNumber))
    }
  }
}
</script>
<style  module lang="postcss">
.box {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  font-size: 1.1em;
  line-height: 2.2;
}

.main {
  flex: 1;
  width: 100%;
  margin-top: 10px;
  overflow-y: auto;
}

.description {
  margin-bottom: 10px;
  white-space: pre-wrap;
}

.bread-crumb {
  border-radius: 4px;
  line-height: 50px;
  color: rgba(0, 0, 0, .6);
  background: #eee;
  cursor: default;
}

.item {
  overflow: hidden;
  line-height: 50px;
  text-overflow: ellipsis;
  text-indent: 2em;
  white-space: nowrap;
  color: rgba(0, 0, 0, .8);
  cursor: pointer;

  &:nth-of-type(odd) {
    background-color: #fff;
  }
}
</style>
