<script setup lang="ts">
import { useUserStore } from "@/stores/modules/user";
import { computed } from "vue";

const watermarkContent = computed(() => {
  const { nickName, userName } = useUserStore();
  return nickName + " " + userName;
});
</script>

<template>
  <div>
    <NWatermark
      :content="watermarkContent"
      cross
      selectable
      :font-size="14"
      :line-height="16"
      :width="300"
      :height="200"
      :x-offset="12"
      :y-offset="28"
      :rotate="-15"
      font-color="rgba(128, 128, 128, 0.1)"
    >
      <slot></slot>
    </NWatermark>
  </div>
</template>

<style lang="scss" scoped></style>
