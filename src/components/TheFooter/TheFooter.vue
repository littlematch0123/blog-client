<template>
  <ul :class="$style['footer']">
    <li
      :class="$style['item']"
      v-for="(item,i) in footerDatas" :key="item.id"
    >
    <router-link exact :to="{name:item.name}" :active-class="$style['active']">
      <span
        :class="$style['icon']"
        :style="{'mask-image': `url(${srcArray[i]})`}"
      ></span>
      <h4 :class="$style['title']">{{item.title}}</h4>
    </router-link>
    </li>
  </ul>
</template>

<script>
const footerDatas = [
  {
    id: 0,
    title: '首页',
    name: 'home',
    url: '/',
    src: 'home.svg'
  },
  {
    id: 1,
    title: '专题',
    name: 'topic',
    url: '/topic',
    src: 'topic.svg'
  },
  {
    id: 2,
    title: '文章',
    name: 'article',
    url: '/article',
    src: 'article.svg'
  },
  {
    id: 3,
    title: '书桌',
    name: 'desk',
    url: '/desk',
    src: 'desk.svg'
  }
]
export default {
  data() {
    return {
      footerDatas
    }
  },
  computed: {
    srcArray() {
      return this.footerDatas.map(t => require(`./imgs/${t.src}`))
    }
  }
}
</script>

<style module lang="postcss">
.footer {
  display: flex;
  justify-content: space-around;
}

.item {
  box-sizing: border-box;
  min-width: 60px;
  height: 100%;
  padding: 6px;
  text-align: center;
  color: #111;
}

.icon {
  display: inline-block;
  width: 100%;
  height: 50%;
  background: #111;
  mask-position: center;
  mask-size: contain;
  mask-repeat: no-repeat;
}

.active {
  display: block;
  width: 100%;
  height: 100%;
  color: #0074d9;

  & .icon {
    background: #0074d9;
  }
}

.title {
  font-size: 12px;
}
</style>
