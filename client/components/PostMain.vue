<template>
  <div id="PostMain" class="flex border-b py-6">
    <div class="cursor-pointer">
      <img
        class="rounded-full max-h-[60px]"
        width="60"
        src="https://picsum.photos/id/8/300/320"
        alt="post"
      />
    </div>
    <div class="pl-3 w-full px-4">
      <div class="flex items-center justify-between pb-0.5">
        <button>
          <span class="font-bold hover:underline cursor-pointer">
            User name
          </span>
          <span
            class="text-[13px] text-light text-gray-500 pl-1 cursor-pointer"
          >
            User name
          </span>
        </button>

        <button
          class="border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#FFEEF2] font-semibold rounded-md"
        >
          Follow
        </button>
      </div>

      <div
        class="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]"
      >
        This is some text
      </div>
      <div class="text-[14px] text-gray-500 pb-0.5">
        #fun #cool #SuperAwesome
      </div>
      <div class="text-[14px] pb-0.5 flex items-center font-semibold">
        <Icon name="mdi:music" size="17" />
        <div class="px-1">original sound - AWESOME</div>
        <Icon name="mdi:heart" size="20" />
      </div>

      <div class="mt-2.5 flex">
        <div
          class="relative min-h-[400px] max-h-[580px] max-w-[260px] flex items-center bg-black rounded-xl cursor-pointer"
        >
          <video
            ref="videoRef"
            loop
            muted
            class="rounded-xl object-cover mx-auto h-full"
            src="/videos/vid1.mp4"
          />
          <img
            class="absolute right-2 bottom-8"
            width="90"
            src="~/assets/icons/logo_white.svg"
          />
        </div>
        <div class="relative mr-[75px]">
          <div class="absolute bottom-0 pl-2">
            <div class="pb-4 text-center">
              <button class="rounded-full bg-gray-200 p-2 cursor-pointer">
                <Icon name="mdi:heart" size="25" />
              </button>
              <span class="text-xs text-gray-800 font-semibold">5500</span>
            </div>
            <div class="pb-4 text-center">
              <button class="rounded-full bg-gray-200 p-2 cursor-pointer">
                <Icon name="bx:bxs-message-rounded-dots" size="25" />
              </button>
              <span class="text-xs text-gray-800 font-semibold">1005</span>
            </div>
            <div class="pb-4 text-center">
              <button class="rounded-full bg-gray-200 p-2 cursor-pointer">
                <Icon name="ri:share-forward-fill" size="25" />
              </button>
              <span class="text-xs text-gray-800 font-semibold">200</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const videoRef = ref<HTMLVideoElement | null>(null);

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.play();
  }
});
</script>
