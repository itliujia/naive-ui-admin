<script setup lang="ts">
import { usePermissionStoreHook } from "@/stores/modules/permission";
import { cloneDeep } from "@pureadmin/utils";
import { MenuOption } from "naive-ui";
import { computed, onMounted, ref } from "vue";

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

const menuList = computed<MenuOption[]>(() => {
  const a = cloneDeep(usePermissionStoreHook().wholeMenus);
  a.forEach((m) => {
    console.log(m);
    Object.assign(m, { ...m.meta });
  });
  console.log(a);
  return a;
});
</script>

<template>
  <div class="header-menu-box">
    <NMenu
      v-model:value="activeKey"
      mode="horizontal"
      key="name"
      label-field="meta.title"
      :options="menuList"
      responsive
    />
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
