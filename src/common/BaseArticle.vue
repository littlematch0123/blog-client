<template>
  <div :class="$style.main" v-html="compiledMarksdown" />
</template>
<script>
import marked from 'marked'

export default {
  props: {
    value: { type: String, default: '' }
  },
  computed: {
    compiledMarksdown() {
      return marked(this.value, { headerIds: false })
    }
  }
}
</script>
<style module lang="postcss">
.main {
  flex: 1;
  margin-top: 20px;
  overflow-y: auto;
  font-size: 1.1em;
  line-height: 2;
  word-break: break-all;

  & a {
    text-decoration: underline;
  }

  & h2 {
    margin-bottom: 18px;
    border-bottom: 2px solid #efeaea;
    font-weight: normal;
    font-size: 18px;
  }

  & h3 {
    margin: 12px 0 8px;
    font-size: 16px;
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
    font-size: 85%;
    background: rgba(27, 31, 35, .05);
  }

  & pre {
    display: block;
    padding: 1em;
    border: 2px solid #ddd;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 12px;
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
    font-size: 12px;
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
</style>
