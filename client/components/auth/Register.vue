<template>
  <div class="text-center text-[28px] mb-8 font-bold text-black">Sign up</div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="Full name"
      v-model:input="name"
      inputType="text"
      :autofocus="true"
      :error="errors && errors.name ? errors.name[0] : ''"
    />
  </div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="Email address"
      v-model:input="email"
      inputType="email"
      :error="errors && errors.email ? errors.email[0] : ''"
    />
  </div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="Password"
      v-model:input="password"
      inputType="password"
      :error="errors && errors.password ? errors.password[0] : ''"
    />
  </div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="Confirm password"
      v-model:input="confirmPassword"
      inputType="password"
      :error="errors && errors.confirmPassword ? errors.confirmPassword[0] : ''"
    />
  </div>

  <div class="px-6 pb-2 mt-6">
    <button
      :disabled="!name || !email || !password || !confirmPassword"
      :class="
        !name || !email || !password || !confirmPassword
          ? 'bg-gray-200'
          : 'bg-[#F02C56]'
      "
      @click="() => register()"
      class="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
    >
      Sign up
    </button>
  </div>
</template>

<script setup lang="ts">
const { $userStore, $generalStore } = useNuxtApp();
let name = ref();
let email = ref();
let password = ref();
let confirmPassword = ref();
let errors: null | any = ref();

const register = async () => {
  errors.value = null;

  try {
    await $userStore.getToken();
    await $userStore.register(
      name.value,
      email.value,
      password.value,
      confirmPassword.value,
    );
    await $userStore.getUser();
  } catch (error: any | unknown) {
    console.log(error);
    errors.value = error.response.data.errors;
  }
};
</script>
