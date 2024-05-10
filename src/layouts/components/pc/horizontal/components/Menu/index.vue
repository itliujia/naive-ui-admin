<script setup lang="ts">
import { MenuOption } from "naive-ui";
import { ref } from "vue";

const activeKey = ref(null);
const menuOptions: MenuOption[] = [
  {
    label: "系统关联",
    key: "a-wild-sheep-chase",
    children: [
      {
        label: "系统关联",
        key: "a-wild-sheep-chase"
      }
    ]
  }
];
</script>

<template>
  <div class="header-menu-box">
    <NMenu v-model:value="activeKey" mode="horizontal" :options="menuOptions" responsive />
  </div>
</template>

<style lang="scss" scoped>
.header-menu-box {
  width: 0;
  flex: 1 1 0%;
  display: flex;
  align-items: center;
}
</style>
