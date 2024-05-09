<script setup lang="ts">
import { NConfigProvider } from "naive-ui";
import { prefixCls, themeOverrides } from "@/settings/design";
</script>

<template>
  <NConfigProvider
    :theme-overrides="themeOverrides"
    preflight-style-disabled
    :cls-prefix="prefixCls"
  >
    <RouterView />
  </NConfigProvider>
</template>

<style scoped lang="scss"></style>
