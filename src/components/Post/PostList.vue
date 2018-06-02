<template>
  <div :class="$style.wrap">
    <div :class="$style.typeBox">
      <BaseButton :class="$style.button" @click.native="onInitSelector">类别筛选</BaseButton>
      <BreadCrumb :class="$style.breadCrumb" :datas="titleDatas" />
      <SVGClear v-if="titleDatas.length" :class="$style.svgClear" @click.native="onClearClick" />
    </div>
    <ul v-if="posts" :class="$style.list" >
      <li
        v-for="(item, index) in posts"
        :key="index"
        :class="$style.item"
        @click="$router.push({
          name:'post',
          params: { postid: item._id, parentPath: $route.path }
        })"
      >{{ item.title }}</li>
    </ul>
    <div v-if="doShowSelector" :class="$style.selectorBox" >
      <BaseMask @click.native="() => { doShowSelector=false }"/>
      <LinkageSelector :class="$style.selector" :datas="currentSelectorDatas" @input="onUpdate"/>
    </div>
  </div>
</template>
<script>
import BaseMask from '@/common/BaseMask'
import BaseInput from '@/common/BaseInput'
import BaseButton from '@/common/BaseButton'
import BreadCrumb from '@/common/BreadCrumb'
import LinkageSelector from '@/common/LinkageSelector'
import SVGClear from '@/common/SVG/SVGClear'

export default {
  components: {
    BaseMask,
    LinkageSelector,
    BreadCrumb,
    BaseInput,
    BaseButton,
    SVGClear
  },
  data() {
    return {
      currentSelectorDatas: [],
      doShowSelector: false,
      titleDatas: [],
      filterCategoryNumber: null
    }
  },
  computed: {
    posts() {
      return this.$store.getters.getPostsFilterByCategoryNumber(this.filterCategoryNumber)
    },
    categoryRootDatas() {
      return this.$store.getters.getCategoryRootDatas
    }
  },
  methods: {
    onInitSelector() {
      this.currentSelectorDatas = this.categoryRootDatas
      this.doShowSelector = true
      this.titleDatas = []
    },
    onUpdate(t) {
      this.titleDatas = [...this.titleDatas, t.name]
      this.filterCategoryNumber = t.number
      const temp = this.$store.getters.getChildrenCategoryies(Number(t.number))
      if (temp.length) {
        this.currentSelectorDatas = temp
      } else {
        this.doShowSelector = false
      }
    },
    onClearClick() {
      this.titleDatas = []
      this.filterCategoryNumber = null
    }
  }
}
</script>
<style module lang="postcss">
.wrap {
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  overflow: hidden;
  font-size: 1em;
  line-height: 50px;
}

.typeBox {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #ebedf0;
}

button.button {
  flex-shrink: 0;
  width: auto;
  padding: 0 8px;
  font-size: 1em;
  line-height: 40px;
  color: rgba(0, 0, 0, .8);
  background: #f5f5f5;
}

.breadCrumb {
  flex: 1;
  margin: 0 6px;
  line-height: 40px;
}

.svgClear {
  fill: rgba(0, 0, 0, .6);
  cursor: pointer;
}

.list {
  height: calc(100% - 60px);
  overflow: auto;
}

.item {
  position: relative;
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;

  &::after {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: #eee;
    transform: scaleY(.5);
    content: '';
  }
}

.selectorBox {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 1200px;
  margin: 0 auto;
}

.selector {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
}
</style>
