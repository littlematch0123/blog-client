<template>
  <BaseFullScreen :class="$style.wrap">
    <header :class="$style.header">
      <router-link :to="`/posts/${postId}`" exact><BaseBack>返回文章</BaseBack></router-link>
      <router-link :to="`/posts/${postId}/comments/add`"><BaseAdd>添加评论</BaseAdd></router-link>
    </header>
    <BaseCard :class="$style.article">
      <BaseTitle>评论列表</BaseTitle>
      <ul :class="$style.commentBox">
        <li v-if="!comments.length">暂无评论</li>
        <li v-for="(item, index) in comments" v-else :key="index" :class="$style.comment">
          <header :class="$style.headerBox">
            <div :class="$style.avatarBox">
              <BaseAvatar v-if="item.user">{{ item.user.username }}</BaseAvatar>
              <BaseAvatar v-else :class="$style.elseAvatar" >删</BaseAvatar>
              <time :class="$style.time">{{ (item.createdAt).match(/^.*(?=T)/)[0] }}</time>
            </div>
            <div v-if="item.user && (userId === item.user._id)" :class="$style.buttonBox" >
              <BaseButton
                :class="$style.basebutton"
                @click.native="$router.push(`/posts/${postId}/comments/${item._id}/update`)"
              >编辑</BaseButton>
              <BaseButton
                :class="$style.basebutton"
                @click.native="$router.push(`/posts/${postId}/comments/${item._id}/delete`)"
              >删除</BaseButton>
            </div>
            <span>{{ len - index }}楼</span>
          </header>
          <p :class="$style.paragraph">{{ item.content }}</p>
        </li>
      </ul>
    </BaseCard>
    <router-view />
  </BaseFullScreen>
</template>
<script>
import BaseFullScreen from '@/common/BaseFullScreen'
import BaseCard from '@/common/BaseCard'
import BaseTitle from '@/common/BaseTitle'
import BaseAvatar from '@/common/BaseAvatar'
import AvatarWithAnimation from '@/common/AvatarWithAnimation'
import BaseBack from '@/common/BaseBack'
import BaseAdd from '@/common/BaseAdd'
import BaseButton from '@/common/BaseButton'

export default {
  components: {
    BaseFullScreen,
    BaseCard,
    BaseTitle,
    BaseAvatar,
    AvatarWithAnimation,
    BaseBack,
    BaseAdd,
    BaseButton
  },
  computed: {
    userId() {
      const { user } = this.$store.state.auth
      if (!user) return ''
      return user._id
    },
    postId() {
      return this.$route.params.postid
    },
    comments() {
      return this.$store.getters.getCommentsByPostId(this.postId)
    },
    len() {
      return this.comments.length
    }
  }
}
</script>
<style module lang="postcss">
.wrap {
  padding: 10px;
  background: #eee;
}

.header {
  display: flex;
  justify-content: space-between;
  line-height: 30px;
}

.article {
  max-height: calc(100% - 40px);
  font-size: 1.1em;
  line-height: 2;
}

.commentBox {
  overflow-y: auto;
}

.comment {
  position: relative;
  padding-bottom: 10px;
  border-bottom: 2px dashed #eee;
}

.headerBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.avatarBox {
  display: flex;
  align-items: center;
}

.elseAvatar {
  background-color: #f67280;
}

.time {
  margin-left: 6px;
}

.paragraph {
  white-space: pre-wrap;
  word-break: break-all;
}

.input {
  margin: 10px 0;
}

.buttonBox {
  display: flex;
  align-items: center;
}

button.basebutton {
  margin: 0 4px;
  font-size: 1em;
  color: rgba(0, 0, 0, .8);
  background: #f5f5f5;
}
</style>
