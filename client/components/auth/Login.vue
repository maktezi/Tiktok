<template>
  <div class="text-center text-[28px] mb-8 font-bold text-black">Login</div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="Email address"
      v-model:input="email"
      inputType="email"
      :autofocus="true"
      :error="errors && errors.email ? errors.email[0] : ''"
    />
  </div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="Password"
      v-model:input="password"
      inputType="password"
      error=""
    />
  </div>
  <div class="px-6 text-[12px] text-gray-600">Forgot password?</div>

  <div class="px-6 pb-2 mt-6">
    <button
      :disabled="!email || !password"
      :class="!email || !password ? 'bg-gray-200' : 'bg-[#F02C56]'"
      @click="() => login()"
      class="w-full text-[17px] font-semibold bg-[#F02C56] text-white py-3 rounded-sm"
    >
      Log in
    </button>
  </div>
</template>

<script setup lang="ts">
import TextInput from "~/components/TextInput.vue";

const { $userStore, $generalStore } = useNuxtApp();
let email = ref("admin@mail.com");
let password = ref("admin1234");
let errors: null | any = ref(null);
const user = ref();

const login = async () => {
  errors.value = null;

  try {
    await $userStore.getToken();
    await $userStore.login(email.value, password.value);
    await $userStore.getUser();
    $generalStore.isLoginOpen = false;
  } catch (error: any | unknown) {
    console.log(error);
    errors.value = error.response.data.errors;
  }
};
</script>
