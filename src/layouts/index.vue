<script setup lang="ts">
import { Horizontal, AppMain, Mobile } from "./components/index";

import { Component, defineComponent, h, ref } from "vue";
import { useResizeObserver } from "@vueuse/core";
import { deviceDetection } from "@pureadmin/utils";

const isMobile = ref();

useResizeObserver(document.body, () => {
  isMobile.value = deviceDetection();
});

const LayoutComponent = defineComponent({
  render() {
    return isMobile.value
      ? h(Mobile, {}, { default: () => [h(AppMain)] })
      : h(Horizontal, {}, { default: () => [h(AppMain)] });
  }
});
</script>

<template>
  <LayoutComponent> </LayoutComponent>
</template>

<style lang="scss" scoped></style>
