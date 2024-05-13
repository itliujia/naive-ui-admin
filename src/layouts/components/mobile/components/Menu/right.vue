<script setup lang="ts">
import { useThemeVars } from "naive-ui";
import useLocalSvg from "@/utils/svg";
import { DropdownMixedOption } from "naive-ui/es/dropdown/src/interface";
import { BdIcon } from "@/components/BdComps";
import { renderIcon, showMessage } from "@/utils/discreteApi";
import { useUserStoreHook } from "@/stores/modules/user";

const themeVars = useThemeVars();
const { searchSvg, starSvg, logoutSvg, profileSvg, settingSvg } = useLocalSvg();

const options: DropdownMixedOption[] = [
  {
    label: "个人中心",
    key: "profile",
    icon: renderIcon(profileSvg)
  },
  {
    label: "退出登录",
    key: "logout",
    icon: renderIcon(logoutSvg)
  }
];

const onSelect = (key: string) => {
  if (key == "logout") {
    showMessage("正在退出登录中……", { type: "warning", duration: 1000 });
    setTimeout(() => {
      useUserStoreHook().logOut();
    }, 1200);
  }
};
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
          <NDropdown :options="options" size="huge" @select="onSelect">
            <NAvatar round :style="{ backgroundColor: themeVars.primaryColor }" size="large">
              {{ useUserStoreHook().nickName }}
            </NAvatar>
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
  border-radius: 50%;
  display: flex;
  :deep(.bd-avatar) {
    .bd-avatar__text {
      font-weight: bold;
    }
  }
}
</style>
