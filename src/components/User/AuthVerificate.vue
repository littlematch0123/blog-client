<template>
  <BaseFullScreen v-show="displayed" :class="$style.screen">
    <BaseMask />
    <main :class="$style.main">
      <InputWithTest
        :class="$style.input"
        :value="value"
        :errMsg="errMsg"
        :onBlur="testEnter"
        :onFocus="() => { errMsg='' }"
        type="number"
        placeholder="验证码"
        @input="val => { $emit('input',val) }"
      />
      <ButtonBox :onConfirmClick="onSubmit" />
    </main>
  </BaseFullScreen>
</template>
<script>
import BaseFullScreen from '@/common/BaseFullScreen'
import BaseMask from '@/common/BaseMask'
import InputWithTest from '@/common/InputWithTest'
import ButtonBox from '@/common/ButtonBox'
import { AUTH_VERIFICATE_ASYNC } from './module'

export default {
  components: {
    BaseFullScreen,
    BaseMask,
    InputWithTest,
    ButtonBox
  },
  props: {
    value: { type: String, default: '' },
    displayed: { type: Boolean, required: true },
    cleanTheEnvironment: { type: Function, required: true }
  },
  data() {
    return {
      errMsg: ''
    }
  },
  methods: {
    /* 检测验证码是否符合要求 */
    testEnter() {
      const trimedValue = this.value.trim()
      if (trimedValue.match(/^$/)) {
        this.errMsg = '验证码不得为空'
      } else if (!trimedValue.match(/^\d{6}$/)) {
        this.errMsg = '必须是6位数字'
      } else {
        this.errMsg = ''
      }
    },
    /* 确定发送验证码 */
    onSubmit() {
      if (this.errMsg === '') {
        // 验证
        this.$store.dispatch(AUTH_VERIFICATE_ASYNC, { verificationCode: this.value }).then(() => {
          // 清理验证环境
          this.cleanTheEnvironment()
        })
      }
    }
  }
}
</script>
<style module lang="postcss">
.screen {
  z-index: 1;
  max-width: 1200px;
}

.main {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px;
  background: rgba(255, 255, 255, .4);
}

.input {
  flex: 1;
  margin-right: 10px;
}
</style>
