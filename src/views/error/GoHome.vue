<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const goHome = () => {
  router.push("/");
};
</script>
<template>
  <NButton type="primary" class="mt-4" @click="goHome">回到首页</NButton>
</template>
