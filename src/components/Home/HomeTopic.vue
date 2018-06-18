<template>
  <section :class="$style['topic']">
    <header :class="$style['header']">
      <h4>专题推荐</h4>
      <router-link :class="$style['header-link']" to="/categories" >更多专题</router-link>
    </header>
    <ul :class="$style['main']">
      <li
        v-for="item in recommendCategories"
        :class="$style['item']"
        :key="item._id"
        @click="$router.push(`/topics/${item.number}`)"
      >
        <dl>
          <dt>{{ item.name }}</dt>
          <dd :class="$style['dl-txt']">{{ item.description }}</dd>
        </dl>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  computed: {
    recommendCategories() {
      return this.$store.getters.getRecommendedCategories
    }
  }
}
</script>

<style module lang="postcss">
.topic {
  box-sizing: border-box;
  padding: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
  line-height: 20px;
  cursor: default;
}

.header-link {
  font-size: 1em;

  &::after {
    margin-left: 2px;
    content: '>';
  }
}

.main {
  display: flex;
  flex-wrap: wrap;
  min-height: 176px;
}

.item {
  box-sizing: border-box;
  width: calc(50% - 20px);
  padding: 10px;
  margin: 10px;
  border-radius: 6px;
  line-height: 2;
  color: #fff;
  background: #0074d9;
  box-shadow: 0 4px 16px 0 #0074d9;
  cursor: pointer;
}

.dl-txt {
  font-size: 1em;
  text-indent: 1em;
}

@media all and (min-width: 900px) {
  .main {
    min-height: 276px;
  }

  .item {
    font-size: 1.1em;
    line-height: 3;
  }
}
</style>
