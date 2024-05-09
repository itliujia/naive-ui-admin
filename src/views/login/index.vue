<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import Logo from "./logo.vue";
import { NForm, FormRules } from "naive-ui";
import { timestampToTime } from "@/utils/time";
import { useCompRef } from "@/hooks/typings";
import { debounce } from "@pureadmin/utils";
import { message, notification, dialog, loadingBar, modal } from "@/utils/discrete";

/** 当前年份 */
const currentYear = timestampToTime(-1, "yyyy");

/** 登录信息表单 */
const loginForm = reactive({
  username: "",
  password: ""
});

/** 表单校验规则 */
const formRules: FormRules = {
  username: [
    {
      required: true,
      message: "请输入账号"
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码"
    }
  ]
};

const loginFormRef = useCompRef(NForm);
const isLoading = ref(false);

/** 登录按钮标签 */
const loginBtnLabel = computed(() => (isLoading.value ? "登录中，请稍候……" : "登 录"));

/** 用户登录 */
const onUserLogin = async () => {
  loginFormRef.value?.validate((errors) => {
    if (!errors) {
      message.info("111");
      notification.info({
        content: "说点啥呢",
        meta: "想不出来",
        duration: 2500,
        keepAliveOnHover: true
      });
    }
  });
};

/** 登录，加入防抖防止多次点击 */
const handleLogin = debounce(onUserLogin, 500);
</script>

<template>
  <div class="account-root">
    <div class="account-root-item root-left-item">
      <div class="root-left-logo">
        <Logo />
      </div>
      <!-- 背景图 -->
      <div class="bg-img">
        <img src="@/assets/bg.png" />
      </div>
    </div>
    <div class="account-root-item root-right-item">
      <div class="account-form">
        <div class="account-form-logo">
          <Logo />
        </div>

        <div class="account-top">
          <div class="user-account">账号登录</div>
        </div>

        <!-- 登录表单 -->
        <NForm ref="loginFormRef" :model="loginForm" :rules="formRules" @keyup.enter="handleLogin">
          <!-- 账号 -->
          <NFormItem path="username">
            <NInput
              size="large"
              placeholder="账号"
              class="rounded-lg"
              v-model:value="loginForm.username"
            >
            </NInput>
          </NFormItem>
          <!-- 密码 -->
          <NFormItem path="password">
            <NInput
              size="large"
              placeholder="密码"
              type="password"
              show-password-on="click"
              class="rounded-lg"
              v-model:value="loginForm.password"
            >
            </NInput>
          </NFormItem>
        </NForm>

        <!-- 登录按钮 -->
        <NButton
          round
          type="primary"
          class="rounded-lg login-btn"
          size="large"
          @click="handleLogin"
          :loading="isLoading"
        >
          {{ loginBtnLabel }}
        </NButton>

        <!-- 版权说明 -->
        <div class="copyright">© {{ currentYear }} 深圳快狗互动科技有限公司 版权所有</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("./index.scss");
</style>
