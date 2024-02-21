<template>
  <div class="h-screen flex flex-col justify-center items-center bg-hrdc-teal">
    <img src="../assets/hrdc-logo.png" alt="Logo" class="mb-4">
    <div class="bg-white p-8 rounded-md w-full md:w-1/4 h-auto md:h-1/3">
      <form>
        <div class="input-field">
          <label class="block text-gray-700 text-sm font-bold" for="username">
            Username
          </label>
          <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username" type="text" placeholder="Username" required>
        </div>
        <div class="input-field">
          <label class="block text-gray-700 text-sm font-bold mt-2" for="password">
            Password
          </label>
          <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password" type="password" placeholder="Password" required>
        </div>
        <div class="mt-3">
          <button type="submit" class="bg-hrdc-teal rounded p-2 text-white">Login</button>
          <button type="reset" class="bg-gray-400 rounded p-2 ml-1  text-white">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>