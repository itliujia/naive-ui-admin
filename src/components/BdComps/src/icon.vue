<script setup lang="tsx">
import { FunctionalComponent, SVGAttributes, shallowRef, h } from "vue";

interface PropsType {
  icon?: FunctionalComponent<SVGAttributes> | string | null;
}

const props = defineProps<PropsType>();

const svgRender = shallowRef({
  render() {
    return h(props.icon);
  }
});
</script>

<template>
  <div class="bd-icon-span">
    <svgRender />
  </div>
</template>

<style lang="scss" scoped>
.bd-icon-span {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}
</style>
