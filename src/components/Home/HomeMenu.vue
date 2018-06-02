<template>
  <ul :class="$style['menu']">
    <li
      v-for="item in menuDatas"
      :key="item.catrgory"
      :class="$style['item']"
      @click="$router.push(item.url)"
    >
      <div :class="$style['title']">{{ item.name }}</div>
      <p :class="$style['des']">{{ item.category }}</p>
    </li>
  </ul>
</template>
<script>
const menuDatas = [
  { id: 0, name: '小', category: 'HTML', url: '/categories/1000000000' },
  { id: 1, name: '火', category: 'CSS', url: '/categories/1100000000' },
  { id: 2, name: '柴', category: 'JavaScript', url: '/categories/1200000000' },
  { id: 3, name: '的', category: 'HTTP', url: '/categories/1300000000' },
  { id: 4, name: '蓝', category: '前端框架', url: '/categories' },
  { id: 5, name: '色', category: '前端工具', url: '/categories/1500000000' },
  { id: 6, name: '理', category: '后端相关', url: '/categories' },
  { id: 7, name: '想', category: '移动端', url: '/categories/1600000000' }
]
export default {
  data() {
    return {
      menuDatas
    }
  }
}
</script>

<style module lang="postcss">
.menu {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  font-size: 1.1em;
  text-align: center;
}

.item {
  width: 25%;
  cursor: pointer;
}

.title {
  display: inline-block;
  width: 40px;
  margin: 6px 0;
  border-radius: 50%;
  line-height: 40px;
  color: white;
}

@media all and (min-width: 900px) {
  .title {
    width: 50px;
    margin: 10px 0;
    line-height: 50px;
  }
}

.item:nth-child(1) .title {
  background-color: #7fdbff;
}

.item:nth-child(2) .title {
  background-color: #ff4136;
}

.item:nth-child(3) .title {
  background-color: #f012be;
}

.item:nth-child(4) .title {
  background-color: #3d9970;
}

.item:nth-child(5) .title {
  background-color: #0074d9;
}

.item:nth-child(6) .title {
  background-color: #ff851b;
}

.item:nth-child(7) .title {
  background-color: #85144b;
}

.item:nth-child(8) .title {
  background-color: #aaa;
}
</style>
