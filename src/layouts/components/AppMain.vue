<script setup lang="ts">
import { ref } from "vue";

/** 页面是否激活 */
const isRouterAlive = ref(true);
</script>

<template>
  <section>
    <RouterView v-if="isRouterAlive"> </RouterView>
  </section>
</template>

<style lang="scss" scoped></style>
