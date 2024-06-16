<template>
  <div class="text-center text-[28px] mb-4 font-bold text-black">Login</div>

  <div class="px-6 pb-1.5 text-[15px] text-black">Email address</div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="Email address"
      v-model:input="email"
      inputType="email"
      :autofocus="true"
      error=""
    />
  </div>
</template>

<script setup lang="ts">

</script>