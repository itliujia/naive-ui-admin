<script setup lang="ts">
import { useThemeVars } from "naive-ui";
import useLocalSvg from "@/utils/svg";
const themeVars = useThemeVars();

const { searchSvg, starSvg } = useLocalSvg();
const options = [
  {
    label: "用户资料",
    key: "profile"
  },
  {
    label: "编辑用户资料",
    key: "editProfile"
  },
  {
    label: "退出登录",
    key: "logout"
  }
];
</script>

<template>
  <div class="header-right">
    <div class="right-item">
      <NTooltip placement="bottom" trigger="hover">
        <template #trigger>
          <NButton class="right-item-trigger" tertiary circle>
            <template #icon>
              <BdIcon :icon="searchSvg" />
            </template>
          </NButton>
        </template>
        <span> 搜索</span>
      </NTooltip>

      <NTooltip placement="bottom" trigger="hover">
        <template #trigger>
          <NButton class="right-item-trigger" tertiary circle>
            <template #icon>
              <BdIcon :icon="starSvg" />
            </template>
          </NButton>
        </template>
        <span> 关注</span>
      </NTooltip>

      <div class="right-item-trigger right-item-divider">
        <NDivider vertical />
      </div>
      <div class="right-item-trigger">
        <div class="shadow-lg avatar">
          <NDropdown :options="options">
            <NAvatar round :style="{ backgroundColor: themeVars.primaryColor }">佳</NAvatar>
          </NDropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.right-item {
  display: flex;
  height: 68px;
  align-items: center;
  padding-right: 20px;
}

.right-item-trigger {
  margin: -5px 8px 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.right-item-divider {
  margin: 0;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
}
</style>
