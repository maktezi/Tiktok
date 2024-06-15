<template>
  <div
    id="TopNav"
    class="fixed bg-white z-30 flex items-center w-full border-b h-[61px]"
  >
    <div
        :class="route.fullPath === '/' ? 'max-w-[1150px]' : ''"
        class="flex items-center justify-between w-full px-6 mx-auto"
    >
      <div :class="route.fullPath === '/' ? 'w-[80%]' : 'lg-w-[20%] w-[70%]'">
        <NuxtLink to="/">
          <img width="40" src="../assets/icons/logo.svg" alt="logo">
        </NuxtLink>
      </div>

      <div class="hidden md:flex items-center bg-[#F1F1F2] p-1 rounded-full max-w-[380px] w-full">
        <input
          type="text"
          class="w-full pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none"
          placeholder="Search accounts"
        >
        <div class="px-3 py-1 flex items-center border-l border-l-gray-300">
          <Icon name="material-symbols:search-rounded" color="#A1A2A7" size="22"/>
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 min-w-[275px] max-w-[320px] w-full">
        <button class="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100">
          <Icon name="mdi:plus" color="#000000" size="22"/>
          <span class="px-2 font-medium text-[15px]">Upload</span>
        </button>

        <div v-if="false" class="flex items-center">
          <button class="flex items-center bg-[#F02C56] text-white border rounded-md px-3 py-[6px]">
            <span class="mx-4 font-medium text-[15px]">Login</span>
          </button>
          <Icon name="mdi:dots-vertical" color="#161724" size="25"/>
        </div>

        <div class="flex items-center">
          <Icon class="ml-l mr-4" name="carbon:send-alt" color="#161724" size="30"/>
          <Icon class="mr-5" name="bx:message-detail" color="#161724" size="27"/>
          <div class="relative">
            <button
                class="mt-1"
                @click="$event => showMenu = !showMenu"
            >
              <img
                class="rounded-full"
                width="30"
                src="https://picsum.photos/id/83/320/320"
                alt="profile">
            </button>

            <div
              v-if="showMenu"
              id="PopupMenu"
              class="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl border top-[43px] -right-2"
            >
              <NuxtLink
                @click="$event => showMenu = false"
                class="flex items-center justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer"
              >
                <Icon name="ph:user" size="20"/>
                <span class="pl-2 font-semibold text-sm">Profile</span>
              </NuxtLink>
              <div
                  class="flex items-center justify-start py-3 px-1.5 hover:bg-gray-100 border-t cursor-pointer"
              >
                <Icon name="ic:outline-login" size="20"/>
                <span class="pl-2 font-semibold text-sm">Log out</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
  const showMenu = ref(false)
</script>