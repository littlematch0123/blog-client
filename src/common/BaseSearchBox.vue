<template>
  <BaseFullScreen :class="$style.screen">
    <BaseMask />
    <BaseBack :class="$style.back" @click.native="$router.push('/')">返回首页</BaseBack>
    <div :class="$style.inner">
      <header :class="$style.searchBox">
        <span :class="$style.inputBox">
          <BaseInput
            :class="$style.input"
            v-model="searchText"
            placeholder="搜索html试试看"
            @keyup.enter.native="e => onEnter(e)"
          />
          <SVGClear
            v-if="searchText"
            :class="$style.clear"
            @click.native="onClear"
          />
        </span>
        <span :class="$style.buttonBox" @click="onSearchClick"><SVGSearch />搜索</span>
      </header>
      <ul ref="scrollRef" :class="$style.list">
        <li
          v-for="item in resultDatas"
          :class="$style.item"
          :key="item._id"
          @click="$router.push({
            name:'post',
            params:{ postid: item._id, parentPath: $route.path }
          })"
        >
          {{ item.title }}
        </li>
        <li v-if="resultDatas.length >= limitNumber && !doNeedMoreDatas" :class="$style['extendedItem']">已经到底了...</li>
      </ul>
      <div v-if="isNoResult" :class="$style['noResultItem']">抱歉，暂无搜索结果</div>
      <div v-if="doLoadingMore" :class="$style['loadingMoreItem']">正在加载新数据...</div>
    </div>
  </BaseFullScreen>
</template>
<script>
import BaseFullScreen from '@/common/BaseFullScreen'
import BaseMask from '@/common/BaseMask'
import BaseBack from '@/common/BaseBack'
import BaseInput from '@/common/BaseInput'
import SVGClear from '@/common/SVG/SVGClear'
import SVGSearch from '@/common/SVG/SVGSearch'
import { throttle } from '@/utils/util'

export default {
  components: {
    BaseFullScreen,
    BaseMask,
    BaseBack,
    BaseInput,
    SVGClear,
    SVGSearch
  },
  props: {
    datas: { type: Array, required: true }
  },
  data() {
    return {
      filterDatas: [],
      resultDatas: [],
      limitDatas: [],
      isNoResult: false,
      limitNumber: 16,
      page: 0,
      doLoadingMore: false,
      doNeedMoreDatas: true,
      searchText: ''
    }
  },
  mounted() {
    this.$refs.scrollRef.addEventListener('scroll', throttle(this.onScroll))
  },
  beforeDestroy() {
    this.$refs.scrollRef.removeEventListener('scroll', throttle(this.onScroll))
  },
  methods: {
    onScroll(e) {
      const { scrollTop, offsetHeight, scrollHeight } = e.target
      if (scrollTop + offsetHeight === scrollHeight) {
        this.doNeedMoreDatas && this.loadMore()
      }
    },
    initializeSearchBox() {
      this.resultDatas = []
      this.limitDatas = []
      this.isNoResult = false
      this.page = 0
      this.doLoadingMore = false
      this.doNeedMoreDatas = true
    },
    loadMore() {
      this.doLoadingMore = true
      this.page = this.page + 1
      setTimeout(() => {
        this.addDatas()
        this.doLoadingMore = false
      }, 1000)
    },
    getReg(searchText) {
      return new RegExp(searchText.replace(/[[(){}^$|?*+.\\-]/g, '\\$&'), 'ig')
    },
    testResultIsEmpty() {
      const reg = this.getReg(this.searchText)
      const filterDatas = this.datas.filter(t => t.title.trim().match(reg))
      if (filterDatas.length === 0) {
        this.isNoResult = true
      } else {
        this.filterDatas = filterDatas
        this.addDatas()
      }
    },
    addDatas() {
      const { filterDatas, limitNumber, page } = this
      const limitDatas = filterDatas.slice(page * limitNumber, (page + 1) * limitNumber)
      if (limitDatas.length < limitNumber) {
        this.loadingText = '数据已经全部加载'
      }
      const resultDatas = [...this.resultDatas, ...limitDatas]
      if (resultDatas.length === filterDatas.length) {
        this.doNeedMoreDatas = false
      }
      this.limitDatas = limitDatas
      this.resultDatas = resultDatas
    },
    startSearch() {
      this.initializeSearchBox()
      this.datas && this.searchText && this.testResultIsEmpty()
    },
    onClear() {
      this.initializeSearchBox()
      this.searchText = ''
    },
    onSearchClick() {
      this.startSearch()
    },
    onEnter() {
      this.startSearch()
    }
  }
}
</script>
<style module lang="postcss">
.screen {
  z-index: 1;
  background: #fff;

  & ::placeholder {
    color: #fff;
  }
}

.back {
  position: relative;
  margin: 10px;
}

.inner {
  position: relative;
  height: calc(100% - 100px);
  padding: 10px;
  background: rgba(255, 255, 255, .1);
}

.searchBox {
  display: flex;
  height: 30px;
  margin: 10px 0;
  font-size: 1.1em;
  line-height: 30px;
}

.inputBox {
  position: relative;
  flex: 1;
  height: 40px;
}

input.input {
  height: 40px;
}

.clear {
  position: absolute;
  top: 50%;
  right: 0;
  border-radius: 4px;
  fill: rgba(0, 0, 0, .6);
  transform: translateY(-50%);
}

.buttonBox {
  display: flex;
  align-items: center;
  padding: 20px 6px;
  margin-left: 6px;
  border-radius: 4px;
  line-height: 18px;
  background: #f5f5f5;
  cursor: pointer;
}

.list {
  height: calc(100% - 50px);
  overflow: auto;
  line-height: 60px;
}

.item,
.extendedItem {
  position: relative;
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: #eee;
    transform: scaleY(.5);
    content: '';
  }
}

.extendedItem {
  color: rgba(0, 0, 0, .6);

  &::after {
    position: static;
    content: '';
  }
}

.noResultItem {
  position: absolute;
  top: 70px;
  left: 20px;
}

.loadingMoreItem {
  margin-top: 10px;
  line-height: 30px;
}
</style>
