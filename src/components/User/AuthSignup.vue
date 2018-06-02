<template>
  <AuthSign>
    <AuthVerificate
      :displayed="doShowVerificateBox"
      v-model="verificationCode"
      :cleanTheEnvironment="cleanVeficatedEnvironment"
    />
    <form @submit="onSignupSubmit">
      <InputWithTest
        v-for="item in inputDatas"
        :key="item.id"
        :type="item.type || 'text'"
        :placeholder="item.placeholder"
        :errMsg="item.errMsg"
        :value="item.value"
        :onBlur="() => { onItemBlur(item) }"
        :onFocus="()=>{ item.errMsg='' }"
        @input="val => { item.value = val }"
      />
      <BaseButton type="submit">注&nbsp;&nbsp;册</BaseButton>
      <AuthSignFooter :onClick="() => { doShowUserList = true }" text="查看已注册过的用户名" />
      <UserList v-show="doShowUserList" :onExit="() => { doShowUserList = false }"/>
    </form>
  </AuthSign>
</template>
<script>
import InputWithTest from '@/common/InputWithTest'
import BaseButton from '@/common/BaseButton'
import { isEmpty, isOneChineseCharacter, isLengthElt20, isPhoneNumber } from '@/utils/fnVarificate'
import AuthSign from './AuthSign'
import AuthSignFooter from './AuthSignFooter'
import AuthVerificate from './AuthVerificate'
import UserList from './UserList'
import { SIGNUP_ASYNC } from './module'

const inputDatas = [
  {
    title: 'phoneNumber',
    text: '手机号',
    placeholder: '请输入11位手机号',
    type: 'number'
  },
  {
    title: 'username',
    text: '用户名',
    placeholder: '用户名只能是一个汉字'
  },
  {
    title: 'password',
    text: '密码',
    placeholder: '密码不能超过20位'
  }
]
inputDatas.forEach((t, index) => {
  t.id = index
  t.value = ''
  t.errMsg = undefined
})
export default {
  components: {
    AuthSign,
    AuthSignFooter,
    AuthVerificate,
    UserList,
    BaseButton,
    InputWithTest
  },
  data() {
    return {
      inputDatas,
      IsThereNoError: false,
      verificationCode: undefined,
      doShowVerificateBox: false,
      doShowUserList: false
    }
  },
  methods: {
    /* 表单提交 */
    onSignupSubmit(e) {
      e.preventDefault()
      if (this.IsThereNoError) {
        const [{ value: phoneNumber }, { value: username }, { value: password }] = this.inputDatas
        // 注册
        this.$store.dispatch(SIGNUP_ASYNC, { phoneNumber, username, password }).then(() => {
          // 清空表单中所有input里的值
          this.clearItemsValue()
          // 显示验证框
          this.doShowVerificateBox = true
        })
      }
    },
    /* input项失去焦点时校验 */
    onItemBlur(item) {
      this.testEnter(item)
      this.testError()
    },
    /* 清理验证环境 */
    cleanVeficatedEnvironment() {
      // 隐藏验证框
      this.doShowVerificateBox = false
      // 清空验证码
      this.verificationCode = undefined
      // 跳转到登录前的页面或首页
      this.$router.push(this.$route.params.parentPath || '/')
    },
    /* 清空所有input中的值 */
    clearItemsValue() {
      this.inputDatas.forEach(t => { t.value = '' })
    },
    /* 检测每一个input的value值 */
    testEnter(item) {
      const trimedValue = item.value.trim()
      if (isEmpty(trimedValue)) {
        item.errMsg = `${item.text}不得为空`
        return false
      }
      // 如果没有错误，则将errMsg置为空字符串
      item.errMsg = ''
      switch (item.title) {
        case 'phoneNumber':
          if (!isPhoneNumber(trimedValue)) { item.errMsg = item.placeholder }
          break
        case 'username':
          if (!isOneChineseCharacter(trimedValue)) { item.errMsg = item.placeholder }
          break
        case 'password':
        default:
          if (!isLengthElt20(trimedValue)) { item.errMsg = item.placeholder }
      }
    },
    /* 检测是否验证完全通过 */
    testError() {
      this.IsThereNoError = this.inputDatas.every(t => t.errMsg === '')
    }
  }
}
</script>
