<template>
  <section :class="$style.wrap">
    <ul :class="$style.list">
      <li
        v-for="(item, i) in titles"
        :key="i"
        :class="[$style.item, { [$style.active] : i === index }]"
        @click="toggle(i)"
        v-html="item"
      />
    </ul>
    <BaseCard v-if="datas" :class="$style.article">
      <ul>
        <li
          v-for="(item, index) in datas"
          :key="index"
          :class="$style.showList"
          @click="item.post && $router.push({
            name:'post',
            params:{ postid: item.post._id, parentPath: $route.path }
          })"
        >
          <time>{{ (item.createdAt).match(/^.*(?=T)/)[0] }}</time>
          <span v-if="item.post" :class="$style.title" >{{ item.post.title }}</span>
          <span v-else :class="$style.extendedTitle" >该文章已删除</span>
        </li>
      </ul>
    </BaseCard>
  </section>
</template>
<script>
import BaseCard from '@/common/BaseCard'
import { LOAD_USER_ASYNC } from './module'

export default {
  components: {
    BaseCard
  },
  data() {
    return {
      titles: ['点赞的文章', '评论的文章'],
      index: 0,
      datas: null
    }
  },
  computed: {
    userId() {
      return this.$route.params.userid
    },
    comments() {
      return this.$store.getters.getCommentsByUserId(this.userId)
    },
    likes() {
      return this.$store.getters.getLikesByUserId(this.userId)
    }
  },
  mounted() {
    this.$store.dispatch(LOAD_USER_ASYNC, { id: this.userId }).then(() => {
      this.datas = this.likes
    })
  },
  methods: {
    toggle(i) {
      this.index = i
      this.datas = this.index ? this.comments : this.likes
    }
  }
}
</script>

<style module lang="postcss">
.wrap {
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, .1);
}

.list {
  font-size: 1.1em;
  line-height: 40px;
  text-align: center;
  column-count: 2;
}

.item {
  border-radius: 4px;
  color: #111;
  background: rgba(255, 255, 255, .4);
}

.active {
  border-radius: 4px;
  color: #fff;
  background: #0074d9;
}

.article {
  height: calc(100% - 50px);
  overflow: auto;
}

.showList {
  display: flex;
  padding: 0 10px;
  line-height: 40px;
  cursor: pointer;

  & > time {
    margin-right: 10px;
  }

  &:nth-of-type(odd) {
    background: #fafafa;
  }
}

.title,
.extendedTitle {
  flex: 1;
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.extendedTitle {
  color: rgba(255, 0, 0, .6);
}
</style>
