<script setup lang="ts">
import { PageHeader, PerchHeader } from "./components/Header";
import { Logo } from "./components/Logo";
import { AsideMenu, RightMenu } from "./components/Menu";
</script>

<template>
  <div class="naive-layout">
    <PerchHeader />
    <PageHeader>
      <Logo />
      <AsideMenu />
      <RightMenu />
    </PageHeader>
    <!-- 页面主体 -->
    <div class="bd-layout-content">
      <div class="bd-grid-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.naive-layout {
  display: flex;
  flex: auto;
  flex-direction: column;
  min-height: 100vh;
  background: #f0f2f5;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  .bd-layout-content {
    padding: 12px;
    .bd-grid-content {
      width: 100%;
    }
  }
}
</style>
