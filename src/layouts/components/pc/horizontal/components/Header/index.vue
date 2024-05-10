<script setup lang="ts"></script>

<template>
  <header
    class="naive-layout-header header-border-radius naive-pro-fixed-header-action naive-pro-fixed-header"
  >
    <div class="naive-pro-global-header header-border-radius">
      <slot></slot>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.naive-pro-fixed-header {
  position: fixed;
  top: 0;
}

.naive-pro-fixed-header-action {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-border-radius {
  border-radius: 0 0 12px 12px;
}

.naive-layout-header {
  height: 68px;
  color: #000000d9;
  line-height: 68px;
  background: #fff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 4px #00152914;
  margin: 0 12px;
  width: calc(100% - 24px);
  right: 0px;

  .naive-pro-global-header {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    & > * {
      height: 100%;
    }
  }
}
</style>
