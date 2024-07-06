<template>
  <NuxtPage />

  <AuthOverlay v-if="isLoginOpen" />
  <EditProfileOverlay v-if="isEditProfileOpen" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
const { $generalStore, $userStore } = useNuxtApp();
const { isLoginOpen, isEditProfileOpen } = storeToRefs($generalStore);

useHead({
  title: "Tiktok",
});

onMounted(async () => {
  $generalStore.bodySwitch(false);
  isLoginOpen.value = false;
  isEditProfileOpen.value = false;

  try {
    await $generalStore.hasSessionExpired();

    if ($userStore.id) {
      $userStore.getUser();
    }
  } catch (error) {
    console.log(error);
  }
});

watch(
  () => isLoginOpen.value,
  (val) => $generalStore.bodySwitch(val),
);
watch(
  () => isEditProfileOpen.value,
  (val) => $generalStore.bodySwitch(val),
);
</script>
