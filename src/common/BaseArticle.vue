<template>
  <div :class="$style.main" v-html="article" />
</template>
<script>
import marked from 'marked'

export default {
  props: {
    value: { type: String, default: '' }
  },
  data() {
    return {
      article: '',
      titles: []
    }
  },
  computed: {
    initalArticle() {
      return marked(this.value, { headerIds: false })
    }
  },
  mounted() {
    this.buildArticle()
  },
  methods: {
    buildArticle() {
      const reg = /<h3>(.*)<\/h3>/g
      let i = 0
      this.article = this.initalArticle.replace(reg, (match, m1) => {
        this.titles = [...this.titles, m1]
        i += 1
        return `<h3 id="anchor${i}">${m1}</h3>`
      })
      this.$emit('translateTitles', this.titles)
    }
  }
}
</script>
<style module lang="postcss">
.main {
  flex: 1;
  margin-top: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 14px;
  line-height: 2;
  word-break: break-all;
  -webkit-overflow-scrolling: touch;

  & a {
    text-decoration: underline;
  }

  & h2 {
    margin-bottom: 18px;
    border-bottom: 2px solid #efeaea;
    font-weight: normal;
    font-size: 1.3em;
  }

  & h3 {
    margin: 12px 0 8px;
    font-size: 1.2em;
    line-height: 1.2;

    &::after {
      width: 2px;
      padding-left: 6px;
      color: #2175bc;
      content: '|';
    }
  }

  & code {
    padding: .2em .4em;
    border-radius: 3px;
    font-size: 90%;
    background: rgba(27, 31, 35, .05);
  }

  & pre {
    display: block;
    padding: 1em;
    border: 2px solid #ddd;
    border-radius: 4px;
    overflow-x: auto;
    line-height: 1.6;
    background: #f8f8f8;
    -webkit-overflow-scrolling: touch;

    & code {
      padding: 0;
      background: none;
    }
  }

  & img {
    max-width: 100%;
  }

  & table {
    width: 100%;
    line-height: 1.5;
    text-align: center;
  }

  & td,
  & th {
    padding: 6px 12px;
    border: 1px solid #ddd;
  }

  @media screen and (max-width: 320px) {
    & iframe {
      max-width: 272px;
    }
  }
}

@media all and (min-width: 900px) {
  .main {
    font-size: 16px;
  }
}
</style>
