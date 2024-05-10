<script setup lang="ts">
import { useThemeVars } from "naive-ui";
import siteConfig from "@build/settings/site";
const themeVars = useThemeVars();
</script>

<template>
  <div class="naive-pro-global-header-logo naive-pro-global-header-logo-light" style="width: 200px">
    <a href="/">
      <img src="@/assets/image/logo.png" alt="logo" />
      <h1 :style="{ color: themeVars.primaryColor }">{{ siteConfig.LOGO_NAME }}</h1>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.naive-pro-global-header-logo {
  padding: 0 16px;
  position: relative;
  overflow: hidden;
  background-color: #18181c;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  a {
    display: flex;
    align-items: center;
    height: 100%;
    img {
      height: 28px;
    }
    h1 {
      height: 32px;
      margin: 0 0 0 12px;
      font-weight: 600;
      font-size: 18px;
      line-height: 32px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
}

.naive-pro-global-header-logo-light {
  background-color: #fff;
  border-radius: 12px;
}
</style>
