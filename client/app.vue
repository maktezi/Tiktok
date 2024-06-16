<template>
  <NuxtPage />

  <AuthOverlay v-if="isLoginOpen"/>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

const { $generalStore } = useNuxtApp()
const { isLoginOpen } = storeToRefs($generalStore)
</script>