<template>
  <TopNav />
  <div
    :class="route.fullPath === '/' ? 'max-w-[1140px]' : ''"
    class="flex justify-between mx-auto w-full lg:px-2.5 px-0"
  >
    <div>
      <SideNavMain />
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import TopNav from "~/components/TopNav.vue";
import SideNavMain from "~/components/SideNavMain.vue";
const route = useRoute()
</script>