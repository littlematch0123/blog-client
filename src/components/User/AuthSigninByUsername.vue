<template>
  <AuthSign signinURL="signin_by_username">
    <form @submit="onSubmit">
      <InputWithTest
        v-model="username"
        :errMsg="usernameErrMsg"
        :onBlur="testUsername"
        :onFocus="() => {usernameErrMsg=''}"
        placeholder="用户名只能是一个汉字"
      />
      <InputPassword
        v-model="password"
        placeholder="密码不能超过20位"
      />
      <BaseButton type="submit">登&nbsp;&nbsp;录</BaseButton>
      <AuthSignFooter
        :onClick="onRouterClick"
        text="短信验证码登录"
      />
    </form>
  </AuthSign>
</template>
<script>
import InputWithTest from '@/common/InputWithTest'
import InputPassword from '@/common/InputPassword'
import BaseButton from '@/common/BaseButton'
import { isEmpty, isOneChineseCharacter } from '@/utils/fnVarificate'
import AuthSign from './AuthSign'
import AuthSignFooter from './AuthSignFooter'
import { SIGNIN_BYUSERNAME_ASYNC } from './module'

export default {
  components: {
    AuthSign,
    BaseButton,
    AuthSignFooter,
    InputWithTest,
    InputPassword
  },
  data() {
    return {
      username: '',
      password: '',
      usernameErrMsg: undefined
    }
  },
  methods: {
    /* 跳转到短信验证码登录页面 */
    onRouterClick() {
      const { parentPath } = this.$route.params
      if (!parentPath) {
        this.$router.push({ name: 'signin_by_phonenumber' })
      } else {
        this.$router.push({ name: 'signin_by_phonenumber', params: { parentPath } })
      }
    },
    /* 表单提交 */
    onSubmit(e) {
      e.preventDefault()
      // 如果检测没有错误，则提交
      if (this.usernameErrMsg === '') {
        const { username, password } = this
        // 登录
        this.$store.dispatch(SIGNIN_BYUSERNAME_ASYNC, { username, password }).then(() => {
          // 登录后，清除input项的值
          this.clearItemsValue()
          // 跳转到登录前的页面或首页
          this.$router.push(this.$route.params.parentPath || '/')
        })
      }
    },
    /* 检测用户名 */
    testUsername() {
      const trimedValue = this.username.trim()
      // 如果没有错误，则将errMsg置为空字符串
      this.usernameErrMsg = ''
      if (isEmpty(trimedValue)) {
        this.usernameErrMsg = '用户名不得为空'
        return false
      }
      if (!isOneChineseCharacter(trimedValue)) {
        this.usernameErrMsg = '用户名只能是一个汉字'
        return false
      }
    },
    /* 清空所有input中的值 */
    clearItemsValue() {
      this.username = ''
      this.password = ''
    }
  }
}
</script>
