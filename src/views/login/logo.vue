<script setup lang="ts">
import useLocalSvg from "@/utils/svg";
import siteConfig from "@build/settings/site";
import { useThemeVars } from "naive-ui";
const themeVars = useThemeVars();
const { logoSvg } = useLocalSvg();
</script>

<template>
  <a class="logo-links" href="/">
    <BdIcon :icon="logoSvg" class="logo-svg" />
    <div class="logon-title" :style="{ color: themeVars.primaryColor }">
      {{ siteConfig.LOGO_NAME }}
    </div>
  </a>
  <div class="logo-describe">{{ siteConfig.SITE_TITLE }}</div>
</template>

<style lang="scss" scoped>
.logo-links {
  display: flex;
  align-content: center;
  align-items: center;
  .logo-svg {
    width: 35px;
    height: 35px;
    margin-right: 5px;
  }
  .logon-title {
    font-size: 28px;
    line-height: 1.25;
    font-weight: 600;
  }
}

.logo-describe {
  margin-top: 1em;
  margin-left: 0.25em;
  font-size: 1.25em;
  font-weight: bold;
  font-family: var(--BadDog-Hanzi-Font);
}
</style>
