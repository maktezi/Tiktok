<template>
  <NuxtPage />

  <AuthOverlay v-if="isLoginOpen" />
  <EditProfileOverlay v-if="isEditProfileOpen" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

useHead({
  title: "Tiktok",
});

const { $generalStore } = useNuxtApp();
const { isLoginOpen, isEditProfileOpen } = storeToRefs($generalStore);
</script>
