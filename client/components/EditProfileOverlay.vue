<template>
  <div
    id="EditProfileOverlay"
    class="fixed flex justify-center pt-14 md:pt-[105px] z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 overflow-auto"
  >
    <div
      class="relative bg-white w-full max-w-[700px] sm:h-[500px] h-[655px] mx-3 p-4 rounded-lg mb-10"
      :class="!uploadedImage ? 'h-[655px]' : 'h-[580px]'"
    >
      <div
        class="absolute flex items-center justify-between w-full p-5 left-0 top-0 border-b border-b-gray-300"
      >
        <div class="text-[22px] font-medium">Edit Profile</div>
        <button @click="() => ($generalStore.isEditProfileOpen = false)">
          <Icon name="mdi:close" size="25" />
        </button>
      </div>

      <div
        v-if="!uploadedImage"
        class="h-[calc(500px-200px)]"
        :class="!uploadedImage ? 'mt-16' : 'mt-[58px]'"
      >
        <!--profile section-->
        <div
          id="ProfilePhotoSection"
          class="flex flex-col border-b sm:h-[118px] h-[145px] px-1.5 py-2 w-full"
        >
          <div
            class="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center"
          >
            Profile Photo
          </div>
          <div class="flex items-center justify-center sm:mt-6 md:-mt-6">
            <label for="image" class="relative">
              <img
                :src="userImage"
                alt="image"
                class="rounded-full"
                width="95"
              />
              <div
                class="absolute bottom-0 right-0 rounded-full bg-white shadow-xl border p-1 border-gray-300 inline-block w-[32px]"
              >
                <Icon
                  name="ph:pencil-simple-line-bold"
                  size="17"
                  class="mt-1 ml-0.5"
                />
              </div>
            </label>
            <input
              id="image"
              class="hidden"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              @input="getUploadedImage"
            />
          </div>
        </div>
        <!--username section-->
        <div
          id="UsernameSection"
          class="flex flex-col border-b sm:h-[118px] px-1.5 py-2 mt-1.5 w-full"
        >
          <div
            class="font-semibold text-[15px] sb:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center"
          >
            Username
          </div>
          <div class="flex items-center justify-center sm:mt-6 md:-mt-6">
            <div class="sm:w-[60%] w-full max-w-md">
              <TextInput
                v-model:input="userName"
                placeholder="Username"
                input-type="text"
                max="30"
              />
              <div class="text-[11px] text-gray-500 mt-2">
                Usernames can only contain letters, numbers, underscores, and
                periods. Changing your username will also change your profile
                link.
              </div>
            </div>
          </div>
        </div>
        <!--bio section-->
        <div
          id="BioSection"
          class="flex flex-col sm:h-[120px] px-1.5 py-2 mt-2 w-full"
        >
          <div
            class="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center"
          >
            Bio
          </div>
          <div class="flex items-center justify-center sm:-mt-6">
            <div class="sm:w-[60%] w-full max-w-md">
              <textarea
                v-model="userBio"
                cols="30"
                rows="4"
                maxlength="80"
                class="resize-none w-full bg-[#F1F1F2] text-gray-800 rounded-md py-2.5 md:py-0 px-3 focus:outline-none"
              />
              <div v-if="userBio" class="text-[11px] text-gray-500 -mt-7 ml-2">
                {{ userBio.length }}/80
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="w-full h-[430px]">
        <Cropper
          ref="cropper"
          class="h-[430px]"
          :stencil-components="CircleStencil"
          :src="uploadedImage"
        />
      </div>
      <div
        id="ButtonSection"
        class="absolute px-5 py-2 left-0 bottom-0 border-t border-t-gray-300 w-full"
      >
        <div
          v-if="!uploadedImage"
          id="UpdateInfoButtons"
          class="flex items-center justify-end"
        >
          <button
            class="flex items-center rounded-md px-3 py-[6px] hover:bg-gray-100"
            @click="() => ($generalStore.isEditProfileOpen = false)"
          >
            <span class="px-2 font-medium text-[16px]">Cancel</span>
          </button>
          <button
            class="flex items-center bg-[#F02C56] text-white border rounded-md ml-3 px-3 py-[6px]"
            @click="() => updateUserInfo()"
            :disabled="!isUpdated"
            :class="!isUpdated ? 'bg-gray-200' : 'bg-[#F02C56]'"
          >
            Apply
          </button>
        </div>

        <div v-else id="CropperButtons" class="flex items-center justify-end">
          <button
            class="flex items-center rounded-md px-3 py-[6px] hover:bg-gray-100"
            @click="() => (uploadedImage = null)"
          >
            <span class="px-2 font-medium text-[16px]">Cancel</span>
          </button>
          <button
            class="flex items-center bg-[#F02C56] text-white border rounded-md ml-3 px-3 py-[6px]"
            @click="() => cropAndUpdateImage()"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cropper, CircleStencil } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { storeToRefs } from "pinia";

const { $userStore, $generalStore, $profileStore } = useNuxtApp();
const { name, bio, image } = storeToRefs($userStore);

const route = useRoute();

onMounted(() => {
  userName.value = name.value;
  userBio.value = bio.value;
  userImage.value = image.value;
});

let file: Ref<File | null> = ref(null);
let cropper: Ref<typeof Cropper | null> = ref(null);
let uploadedImage: Ref<string | null> = ref(null);
let userImage: Ref<string | undefined> = ref();
let userName: Ref<string> = ref("");
let userBio: Ref<string> = ref("");
let isUpdated: Ref<boolean> = ref(false);

const getUploadedImage = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0];
    uploadedImage.value = URL.createObjectURL(file.value);
  }
};

const cropAndUpdateImage = async () => {
  const { coordinates } = cropper.value.getResult();
  let data = new FormData();

  data.append("image", file.value || "");
  data.append("height", coordinates.height || "");
  data.append("width", coordinates.width || "");
  data.append("left", coordinates.left || "");
  data.append("top", coordinates.top || "");

  try {
    await $userStore.getToken();
    await $userStore.updateUserImage(data);
    await $userStore.getUser();
    await $profileStore.getProfile(route.params.id);

    $generalStore.updateSideMenuImage($generalStore.suggested, $userStore);
    $generalStore.updateSideMenuImage($generalStore.following, $userStore);

    userImage.value = image.value;
    uploadedImage.value = null;
  } catch (err) {
    console.error(err);
  }
};

const updateUserInfo = async () => {
  try {
    await $userStore.getToken();
    await $userStore.updateUser(userName.value, userBio.value);
    await $userStore.getUser();
    await $profileStore.getProfile(route.params.id);

    userName.value = name.value;
    userBio.value = bio.value;

    setTimeout(() => {
      $generalStore.isEditProfileOpen = false;
    }, 100);
  } catch (e) {
    console.error(e);
  }
};

watch(
  () => userName.value,
  () => {
    isUpdated.value = !(!userName.value || userName.value === name.value);
  },
);

watch(
  () => userBio.value,
  () => {
    isUpdated.value = !(!userName.value || userBio.value.length < 1);
  },
);
</script>
