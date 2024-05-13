<script setup lang="ts">
import Watermark from "../Watermark.vue";
import { PageHeader, PerchHeader } from "./components/Header";
import { Logo } from "./components/Logo";
import { AsideMenu, RightMenu } from "./components/Menu";
</script>

<template>
  <Watermark>
    <div class="naive-layout">
      <PerchHeader />
      <PageHeader>
        <Logo />
        <div class="header-menu-box"></div>
        <RightMenu />
      </PageHeader>

      <!-- 页面主体 -->
      <div class="bd-layout-content">
        <div class="bd-grid-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </Watermark>
</template>

<style lang="scss" scoped>
.naive-layout {
  display: flex;
  flex: auto;
  flex-direction: column;
  min-height: 100vh;
  background: #f0f2f5;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 90;
  .bd-layout-content {
    padding: 8px;
    display: flex;
    justify-content: center;

    .bd-grid-content {
      max-width: 100%;
    }
  }
}

.header-menu-box {
  width: 0;
  flex: 1 1 0%;
  display: flex;
  align-items: center;
}
</style>
