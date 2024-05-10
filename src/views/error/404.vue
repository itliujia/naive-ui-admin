<script setup lang="ts">
import svg from "@/assets/image/error/404.svg";
import GoHome from "./GoHome.vue";
</script>

<template>
  <div class="flex flex-col justify-center page-container">
    <div class="text-center">
      <BdIcon :icon="svg" class="error-img" />
    </div>
    <div class="text-center">
      <h1 class="text-base text-gray-500">抱歉，你访问的页面不存在</h1>
      <GoHome />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("./common.scss");
</style>
