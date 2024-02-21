<template>
  <section class="h-screen bg-hrdc-teal">
    <div class="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
      <a href="/dashboard" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
        <img class="w-20 h-15" src="../assets/hrdc-logo.png" alt="logo">
      </a>
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div>
          <form @submit="handleFormSubmit">
            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
              <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required>
            </div>
            <button type="submit" class="w-full text-white bg-hrdc-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
function handleFormSubmit(event: Event) {
  event.preventDefault()
  alert('Form submitted')
}
</script>