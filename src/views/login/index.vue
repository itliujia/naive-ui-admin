<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import Logo from "./logo.vue";
import { NForm, FormRules } from "naive-ui";
import { timestampToTime } from "@/utils/time";
import { useCompRef } from "@/hooks/typings";
import { debounce } from "@pureadmin/utils";
import { useUserStoreHook } from "@/stores/modules/user";
import { useRouter } from "vue-router";
import { showNotification } from "@/utils/discreteApi";
import { initRouter } from "@/router/utils";
import siteConfig from "@build/settings/site";
import useLocalSvg from "@/utils/svg";

const { userSvg, passwdSvg } = useLocalSvg();

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

const router = useRouter();

/** 登录按钮标签 */
const loginBtnLabel = computed(() => (isLoading.value ? "登录中，请稍候……" : "登 录"));

/** 用户登录 */
const onUserLogin = async () => {
  loginFormRef.value?.validate(async (errors) => {
    if (!errors) {
      isLoading.value = true;
      useUserStoreHook()
        .login(loginForm)
        .then((res) => {
          if (res.code == siteConfig.SUCCESS_CODE) {
            initRouter().then(() => {
              router.push("/");
              showNotification({
                title: "登录成功",
                content: `${res.data.nickName}，恭喜你登录成功！`,
                type: "success",
                duration: 2000
              });
            });
          }
        })
        .catch(() => setTimeout(() => (isLoading.value = false), 500));
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
        <img src="@/assets/image/bg.png" />
      </div>
    </div>
    <div class="account-root-item root-right-item">
      <div class="account-form">
        <div class="account-form-logo">
          <Logo />
        </div>

        <div class="login-form">
          <BdMotion :delay="100">
            <div class="account-top">
              <div class="user-account">账号登录</div>
            </div>
          </BdMotion>

          <!-- 登录表单 -->
          <NForm
            ref="loginFormRef"
            :model="loginForm"
            :rules="formRules"
            @keyup.enter="handleLogin"
          >
            <!-- 账号 -->
            <BdMotion :delay="150">
              <NFormItem path="username">
                <NInput
                  size="large"
                  placeholder="账号"
                  class="rounded-lg"
                  v-model:value="loginForm.username"
                >
                  <template #prefix>
                    <BdIcon :icon="userSvg" class="input-icon" />
                  </template>
                </NInput>
              </NFormItem>
            </BdMotion>

            <!-- 密码 -->
            <BdMotion :delay="200">
              <NFormItem path="password">
                <NInput
                  size="large"
                  placeholder="密码"
                  type="password"
                  show-password-on="click"
                  class="rounded-lg"
                  v-model:value="loginForm.password"
                >
                  <template #prefix>
                    <BdIcon :icon="passwdSvg" class="input-icon" />
                  </template>
                </NInput>
              </NFormItem>
            </BdMotion>
          </NForm>

          <!-- 登录按钮 -->
          <BdMotion :delay="250">
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
          </BdMotion>
        </div>

        <!-- 版权说明 -->
        <BdMotion :delay="300">
          <div class="copyright">© {{ currentYear }} 深圳快狗互动科技有限公司 版权所有</div>
        </BdMotion>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("./index.scss");
</style>
