<template>
  <div>
    <HomeBanner />
    <HomeMenu />
    <HomeTopic />
    <HomePost />
    <HomeCategory />
  </div>
</template>
<script>
import HomeBanner from './HomeBanner'
import HomeMenu from './HomeMenu'
import HomeTopic from './HomeTopic'
import HomePost from './HomePost'
import HomeCategory from './HomeCategory'

export default {
  components: {
    HomeBanner,
    HomeMenu,
    HomeTopic,
    HomePost,
    HomeCategory
  }
}
</script>
