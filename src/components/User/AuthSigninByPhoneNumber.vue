<template>
  <AuthSign signinURL="signin_by_phonenumber">
    <AuthVerificate
      :displayed="doShowVerificateBox"
      v-model="verificationCode"
      :cleanTheEnvironment="cleanVeficatedEnvironment"
    />
    <form @submit="onSubmit">
      <InputWithTest
        v-model="phoneNumber"
        :errMsg="phoneNumberErrMsg"
        :onBlur="testphoneNumber"
        :onFocus="() => { phoneNumberErrMsg = '' }"
        placeholder="请输入11位手机号"
        type="number"
      />
      <BaseButton type="submit">登&nbsp;&nbsp;录</BaseButton>
      <AuthSignFooter :onClick="onRouterClick" text="用户名密码登录" />
    </form>
  </AuthSign>
</template>
<script>
import InputWithTest from '@/common/InputWithTest'
import BaseButton from '@/common/BaseButton'
import { isEmpty, isPhoneNumber } from '@/utils/fnVarificate'
import AuthSign from './AuthSign'
import AuthSignFooter from './AuthSignFooter'
import AuthVerificate from './AuthVerificate'
import { SIGNIN_BYPHONENUMBER_ASYNC } from './module'

export default {
  components: {
    AuthSign,
    AuthSignFooter,
    AuthVerificate,
    BaseButton,
    InputWithTest
  },
  data() {
    return {
      phoneNumber: '',
      phoneNumberErrMsg: undefined,
      verificationCode: undefined,
      doShowVerificateBox: false
    }
  },
  methods: {
    /* 跳转到用户名密码登录页面 */
    onRouterClick() {
      const { parentPath } = this.$route.params
      if (!parentPath) {
        this.$router.push({ name: 'signin_by_username' })
      } else {
        this.$router.push({ name: 'signin_by_username', params: { parentPath } })
      }
    },
    /* 表单提交 */
    onSubmit(e) {
      e.preventDefault()
      // 如果检测没有错误，则提交
      if (this.phoneNumberErrMsg === '') {
        const { phoneNumber } = this
        // 手机号登录
        this.$store.dispatch(SIGNIN_BYPHONENUMBER_ASYNC, { phoneNumber }).then(() => {
          // 登录后，清除input项的值
          this.phoneNumber = ''
          // 显示验证框
          this.doShowVerificateBox = true
        })
      }
    },
    /* 检测手机号 */
    testphoneNumber() {
      const trimedValue = this.phoneNumber.trim()
      // 如果没有错误，则将errMsg置为空字符串
      this.phoneErrMsg = ''
      if (isEmpty(trimedValue)) {
        this.phoneErrMsg = '手机号不得为空'
        return false
      }
      if (!isPhoneNumber(trimedValue)) {
        this.phoneErrMsg = '请输入正确的手机号'
        return false
      }
    },
    /* 清理验证环境 */
    cleanVeficatedEnvironment() {
      // 隐藏验证框
      this.doShowVerificateBox = false
      // 清空验证码
      this.verificationCode = undefined
      // 跳转到登录前的页面或首页
      this.$router.push(this.$route.params.parentPath || '/')
    }
  }
}
</script>
