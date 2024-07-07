<template>
  <UploadError :error-type="errorType" />

  <div
    v-if="isUploading"
    class="fixed flex items-center justify-center top-0 left-0 w-full h-screen bg-black z-50 bg-opacity-50"
  >
    <Icon
      class="animate-spin ml-1"
      name="mingcute:loading-line"
      size="100"
      color="#FFFFFF"
    />
  </div>

  <UploadLayout>
    <div
      class="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4"
    >
      <div>
        <div class="text-[23px] font-semibold">Upload video</div>
        <div class="text-gray-400 mt-1">Post a video to your account</div>
      </div>

      <div class="mt-8 md:flex gap-6">
        <label
          v-if="!fileDisplay"
          for="fileInput"
          class="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[260px] h-[470px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
          @drop.prevent="onDrop"
          @dragover.prevent="$event = () => {}"
        >
          <Icon name="majesticons:cloud-upload" size="40" color="#B3B3B1" />
          <div class="mt-4 text-[17px]">Select video to upload</div>
          <div class="mt-1.5 text-gray-500 text-[13px]">
            Or drag and drop a file
          </div>
          <div class="mt-12 text-gray-400 text-sm">MP4</div>
          <div class="mt-2 text-gray-400 text-[13px]">Up to 30 minutes</div>
          <div class="mt-2 text-gray-400 text-[13px]">Less than 2GB</div>
          <div
            class="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#F02C56] rounded-sm"
          >
            Select file
          </div>
          <input
            id="fileInput"
            ref="file"
            type="file"
            hidden
            accept=".mp4"
            @input="onChange"
          />
        </label>

        <div
          v-else
          class="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center w-full max-w-[260px] h-[540px] p-3 rounded-2xl cursor-pointer relative"
        >
          <div class="bg-black h-full w-full" />

          <img
            class="absolute z-20 pointer-events-none"
            src="~/assets/images/mobile-case.png"
            alt="mobile"
          />
          <img
            class="absolute right-4 bottom-6 z-20"
            width="90"
            src="~/assets/icons/logo_white.svg"
            alt="logo"
          />
          <video
            autoplay
            loop
            muted
            class="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full"
            :src="fileDisplay"
          />
          <div
            class="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border w-full p-2 border-gray-300"
          >
            <div class="flex items-center truncate">
              <Icon
                name="clarity:success-standard-line"
                size="16"
                class="min-w-[16px]"
              />
              <div class="text-[11px] pl-1 truncate text-ellipsis">
                {{ fileData.name }}
              </div>
            </div>
            <button
              class="text-[11px] ml-2 font-semibold"
              @click="() => clearVideo()"
            >
              Change
            </button>
          </div>
        </div>
        <div class="mt-4 mb-6">
          <div class="flex bg-[#F8F8F8] py-4 px-6">
            <div>
              <Icon class="mr-4" size="20" name="mdi:box-cutter-off" />
            </div>
            <div>
              <div class="text-semibold text-[15px] mb-1.5">
                Divide videos and edit
              </div>
              <div class="text-semibold text-[13px] text-gray-400">
                You can quickly divide videos into multiple parts, remove
                redundant parts and turn landscape videos into portrait videos.
              </div>
            </div>
            <div
              class="flex justify-end max-w-[130px] w-full h-full text-center my-auto"
            >
              <button
                class="px-8 py-1.5 text-white text-[15px] bg-[#F02C56] rounded-sm"
              >
                Edit
              </button>
            </div>
          </div>
          <div class="mt-5">
            <div class="flex items-center justify-between">
              <div class="mb-1 text-[15px]">Caption</div>
              <div class="text-gray-400 text-[12px]">
                {{ caption.length }}/150
              </div>
            </div>
            <input
              v-model="caption"
              maxlength="150"
              type="text"
              class="w-full border p-2.5 rounded-md focus:outline-none"
            />
          </div>

          <div class="flex gap-3">
            <button
              @click="() => discard()"
              class="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 font-bold rounded-sm"
            >
              Discard
            </button>
            <button
              @click="() => createPost()"
              class="px-10 py-2.5 mt-8 border text-[16px] text-white font-bold bg-[#F02C56] rounded-sm"
            >
              Post
            </button>
          </div>
          <div v-if="errors" class="mt-4">
            <div class="text-red-600" v-if="errors && errors.text">
              {{ errors.text[0] }}
            </div>
            <div class="text-red-600" v-if="errors && errors.video">
              {{ errors.video[0] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </UploadLayout>
</template>

<script setup lang="ts">
import UploadLayout from "~/layouts/UploadLayout.vue";
const { $userStore } = useNuxtApp();
const router = useRouter();

const file: Ref<HTMLInputElement | null> = ref(null);
const fileDisplay: Ref<string | null> = ref(null);
const errorType: Ref<string | null> = ref(null);
const caption: Ref<string> = ref("");
const fileData: Ref<File | null> = ref(null);
const errors: Ref<any> = ref(null);
const isUploading: Ref<boolean> = ref(false);

watch(
  () => caption.value,
  (newCaption) => {
    if (newCaption.length >= 150) {
      errorType.value = "caption";
      return;
    }
    errorType.value = null;
  },
);

const onChange = () => {
  if (file.value && file.value.files && file.value.files[0]) {
    fileDisplay.value = URL.createObjectURL(file.value.files[0]);
    fileData.value = file.value.files[0];
  }
};

const onDrop = (e: DragEvent) => {
  errorType.value = "";
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
    file.value = e.dataTransfer.files[0] as unknown as HTMLInputElement;
    fileData.value = e.dataTransfer.files[0];

    let extension = file.value.name.substring(
      file.value.name.lastIndexOf(".") + 1,
    );

    if (extension !== "mp4") {
      errorType.value = "file";
      return;
    }
    fileDisplay.value = URL.createObjectURL(e.dataTransfer.files[0]);
  }
};

const discard = () => {
  file.value = null;
  fileDisplay.value = null;
  fileData.value = null;
  caption.value = "";
};

const createPost = async () => {
  errors.value = null;
  let data = new FormData();
  data.append("video", fileData.value || "");
  data.append("text", caption.value || "");
  if (fileData.value && caption.value) {
    isUploading.value = true;
  }
  try {
    await $userStore.getToken();
    let res = await $userStore.createPost(data);
    if (res.status === 200) {
      setTimeout(() => {
        router.push("/profile/" + $userStore.id);
        isUploading.value = false;
      }, 1000);
    }
  } catch (error: any) {
    errors.value = error.response.data.errors;
    isUploading.value = false;
  }
};

const clearVideo = () => {
  file.value = null;
  fileDisplay.value = null;
  fileData.value = null;
};
</script>
