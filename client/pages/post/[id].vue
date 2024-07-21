<template>
  <div
    id="PostPage"
    class="fixed lg:flex justify-between z-50 top-0 left-0 w-full h-full bg-black lg:overflow-x-hidden overflow-auto"
  >
    <div
      v-if="$generalStore.selectedPost"
      class="lg:w-[calc(100%-540px)] h-full relative"
    >
      <NuxtLink
        :to="$generalStore.isBackUrl"
        class="absolute z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
      >
        <Icon name="material-symbols:close" color="#FFFFFF" size="27" />
      </NuxtLink>

      <div v-if="$generalStore.ids.length > 1">
        <button
          :disabled="!isLoaded"
          @click="() => loopTroughPostUp()"
          class="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <Icon name="mdi:chevron-up" color="#FFFFFF" size="30" />
        </button>

        <button
          :disabled="!isLoaded"
          @click="() => loopTroughPostDown()"
          class="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <Icon name="mdi:chevron-down" color="#FFFFFF" size="30" />
        </button>
      </div>

      <img
        width="80"
        class="absolute top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto"
        src="~/assets/icons/logo_white.svg"
        alt="img"
      />

      <video
        v-if="$generalStore.selectedPost.video"
        class="absolute object-cover w-full my-auto z-[-1] h-screen"
        src="/videos/vid1.mp4"
      />

      <div
        v-if="!isLoaded"
        class="flex items-center justify-center bg-black bg-opacity-70 h-screen lg:min-w-[480px]"
      >
        <Icon
          class="animate-spin ml-1"
          name="mingcute:loading-line"
          size="100"
          color="#FFFFFF"
        />
      </div>
      <div class="bg-black bg-opacity-70 lg:min-w-[480px]">
        <video
          v-if="$generalStore.selectedPost.video"
          ref="video"
          loop
          muted
          class="h-screen mx-auto"
          :src="$generalStore.selectedPost.video"
        />
      </div>
    </div>

    <div
      id="InfoSection"
      v-if="$generalStore.selectedPost"
      class="lg:max-w-[550px] relative w-full bg-white"
    >
      <div class="py-7" />

      <div class="flex items-center justify-between px-8">
        <div class="flex items-center">
          <NuxtLink :to="`/profile/${$generalStore.selectedPost.user.id}`">
            <img
              class="rounded-full lg:mx-0 mx-auto"
              width="40"
              :src="$generalStore.selectedPost.user.image"
              alt="info"
            />
          </NuxtLink>
          <div class="ml-3 pt-0.5">
            <div class="text-[17px] font-semibold">
              {{
                $generalStore.allLowerCaseNoCaps(
                  $generalStore.selectedPost.user.name,
                )
              }}
            </div>
            <div class="text-[13px] -mt-5 font-light">
              {{ $generalStore.selectedPost.user.name }}
              <span class="relative -top-[2px] text-[30px] pr-0.5">.</span>
              <span class="font-medium">
                {{ $generalStore.selectedPost.created_at }}
              </span>
            </div>
          </div>
        </div>

        <Icon
          v-if="$userStore.id === $generalStore.selectedPost.user.id"
          @click="() => deletePost()"
          class="cursor-pointer"
          name="material-symbols:delete-outline-sharp"
          size="25"
        />
      </div>

      <div class="px-8 mt-4 text-sm">{{ $generalStore.selectedPost.text }}</div>

      <div class="px-8 mt-4 text-sm font-bold">
        <Icon name="mdi:music" size="17" />
        original sound -
        {{
          $generalStore.allLowerCaseNoCaps($generalStore.selectedPost.user.name)
        }}
      </div>

      <div class="flex items-center px-8 mt-8">
        <div class="pb-4 text-center flex items-center">
          <button
            @click="() => (isLiked ? unlikePost() : likePost())"
            class="rounded-full bg-gray-200 p-2 cursor-pointer"
          >
            <Icon
              name="mdi:heart"
              size="25"
              :color="isLiked ? '#F02C56' : ''"
            />
          </button>
          <span class="text-xs pl-2 pr-4 text-gray-800 font-semibold">{{
            $generalStore.selectedPost.likes.length
          }}</span>
        </div>

        <div class="pb-4 text-center flex items-center">
          <div class="rounded-full bg-gray-200 p-2 cursor-pointer">
            <Icon name="bx:bxs-message-rounded-dots" size="25" />
          </div>
          <span class="text-xs pl-2 pr-4 text-gray-800 font-semibold"
            >9055</span
          >
        </div>
      </div>

      <div
        id="Comments"
        class="bg-[#F8F8F8] z-0 w-full h-[calc(100%-273px)] border-t-2 overflow-auto"
      >
        <div class="pt-2" />

        <div
          v-if="$generalStore.selectedPost.comments.length < 1"
          class="text-center mt-6 text-xl text-gray-500"
        >
          No comments...
        </div>
        <div
          v-else
          v-for="comment in $generalStore.selectedPost.comments"
          :key="comment"
          class="flex items-center justify-between px-8 mt-4"
        >
          <div class="flex items-center relative w-full">
            <NuxtLink :to="`/profile/${comment.user.id}`">
              <img
                class="absolute top-0 rounded-full lg:mx-auto mx-auto"
                width="40"
                :src="comment.user.image"
                alt="comments"
              />
            </NuxtLink>
            <div class="ml-14 pt-0.5 w-full">
              <div
                class="text-[18px] font-semibold flex items-center justify-between"
              >
                {{ comment.user.name }}
                <Icon
                  v-if="$userStore.id === comment.user.id"
                  @click="
                    () => deleteComment($generalStore.selectedPost, comment.id)
                  "
                  class="cursor-pointer"
                  name="material-symbols:delete-outline-sharp"
                  size="25"
                />
              </div>
              <div class="text-[15px] font-light">
                {{ comment.text }}
              </div>
            </div>
          </div>
        </div>

        <div class="mb-28" />
      </div>

      <div
        id="CreateComment"
        v-if="$userStore.id"
        class="absolute flex items-center justify-between bottom-0 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2"
      >
        <div
          :class="
            inputFocused
              ? 'border-2 border-gray-400'
              : 'border-2 border-[#F1F1F2]'
          "
          class="bg-[#F1F1F2] flex items-center rounded-lg w-full lg:max-w-[420px]"
        >
          <input
            v-model="comment"
            @focus="() => (inputFocused = true)"
            @blur="() => (inputFocused = false)"
            class="bg-[#F1F1F2] text-[14px] focus:outline-none w-full lg:max-w[420px] p-2 rounded-lg"
            type="text"
            placeholder="Add comment..."
          />
        </div>
        <button
          :disabled="!comment"
          @click="() => addComment()"
          :class="comment ? 'text-[#F02C56] cursor-pointer' : 'text-gray-400'"
          class="font-semibold text-sm ml-5 pr-1"
        >
          Post
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $generalStore, $userStore, $profileStore } = useNuxtApp();
const route = useRoute();
const router = useRouter();

let video: Ref<HTMLVideoElement | null> = ref(null);
let isLoaded: Ref<boolean> = ref(false);

let comment = ref(null);
let inputFocused = ref(false);

onMounted(async () => {
  $generalStore.selectedPost = null;
  try {
    await $generalStore.getPostById(route.params.id);
  } catch (error) {
    if (error && error.response.status === 400) {
      router.push("/");
    }
  }
  if (video.value) {
    video.value.addEventListener("loadeddata", (e: Event) => {
      if (e.target) {
        setTimeout(() => {
          isLoaded.value = true;
        }, 500);
      }
    });
  }
});

onBeforeUnmount(() => {
  if (video.value) {
    video.value.pause();
    video.value.currentTime = 0;
    video.value.src = "";
  }
});

watch(
  () => isLoaded.value,
  () => {
    if (isLoaded.value) {
      setTimeout(() => video.value.play(), 500);
    }
  },
);

const isLiked = computed(() => {
  let res = $generalStore.selectedPost.likes.find(
    (like: any) => like.user_id === $userStore.id,
  );
  return !!res;
});

const likePost = async () => {
  try {
    await $userStore.getToken();
    await $userStore.likePost($generalStore.selectedPost, true);
  } catch (e) {
    console.error(e);
  }
};

const unlikePost = async () => {
  try {
    await $userStore.getToken();
    await $userStore.unlikePost($generalStore.selectedPost, true);
  } catch (e) {
    console.error(e);
  }
};

const addComment = async () => {
  try {
    await $userStore.getToken();
    await $userStore.addComment($generalStore.selectedPost, comment.value);
    comment.value = null;
    document.getElementById("Comments").scroll({ top: 0, behavior: "smooth" });
  } catch (e) {
    console.error(e);
  }
};

const deleteComment = async (post: any, commentId: any) => {
  let res = confirm("Are you sure you want to delete this comment?");
  try {
    await $userStore.getToken();
    if (res) {
      await $userStore.deleteComment(post, commentId);
    }
  } catch (e) {
    console.error(e);
  }
};
</script>
