<template>
  <MainLayout>
    <div
      class="pt-[90px] 2xl:pl-[185px] lg:pl-[160px] lg:pr-0 pr-2 w-[calc(100%-90px)] max-w-[1800px] 2xl:mx-auto"
    >
      <div class="flex w-[calc(100vw-230px)]">
        <img
          class="max-w-[120px] rounded-full"
          src="https://picsum.photos/id/8/320/320"
          alt="profile-pic"
        />
        <div class="ml-5 w-full">
          <div class="text-[30px] font-bold truncate">User name</div>
          <div class="text-[18px] truncate">User name</div>
          <button
            v-if="true"
            @click="$generalStore.isEditProfileOpen = true"
            class="flex items-center rounded-md py-1.5 px-3.5 text-[15px] font-semibold border hover:bg-gray-100"
          >
            <Icon class="mt-0.5 mr-1" name="mdi:pencil" size="18" />
            <div>Edit profile</div>
          </button>
          <button
            v-else
            class="flex items-center rounded-md py-1.5 px-10 text-[15px] text-white font-semibold bg-[#F02C56]"
          >
            Follow
          </button>
        </div>
      </div>

      <div class="flex items-center pt-4">
        <div class="mr-4">
          <span class="font-bold">10K</span>
          <span class="text-gray-500 font-light text-[15px] pl-1.5"
            >Following</span
          >
        </div>
        <div class="mr-4">
          <span class="font-bold">44K</span>
          <span class="text-gray-500 font-light text-[15px] pl-1.5"
            >Followers</span
          >
        </div>
        <div class="mr-4">
          <span class="font-bold">3K</span>
          <span class="text-gray-500 font-light text-[15px] pl-1.5">Likes</span>
        </div>
      </div>

      <div
        class="pt-4 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px]"
      >
        This is the bio section
      </div>

      <div class="w-full flex items-center pt-4 border-b">
        <div
          class="w-60 text-center py-2 text-[17px] font-semibold border-b-2 border-b-black"
        >
          Videos
        </div>
        <div
          class="w-60 text-gray-500 text-center py-2 text-[17px] font-semibold"
        >
          <Icon name="material-symbols:lock-open" class="mb-0.5" /> Liked
        </div>
      </div>

      <div
        class="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3"
      >
        <PostUser />
        <PostUser />
        <PostUser />
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from "~/layouts/MainLayout.vue";
import PostUser from "~/components/PostUser.vue";
const { $generalStore } = useNuxtApp();
</script>
