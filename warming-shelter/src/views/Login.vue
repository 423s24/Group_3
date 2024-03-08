<template>
  <section class="h-screen bg-hrdc-teal">
    <div class="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
      <div class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
        <img class="" src="../assets/hrdc-220.png" alt="logo">
      </div>
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div>
          <form @submit.prevent="submitForm">
            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
              <input v-model="username" type="text" name="username" id="username"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                     required>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input v-model="password" type="password" name="password" id="password"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                     required>
            </div>
            <button type="submit"
                    class="login-btn w-full text-white bg-hrdc-orange focus:ring-4 focus:outline-none focus:ring-opacity-5 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.login-btn:hover {
  opacity: 0.8;
}
</style>

<script>
import store from "../store/store.js";

export default {
  data: () => {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    submitForm() {
      store.dispatch("authModule/login", {
        username: this.username,
        password: this.password,
      });
    },
  }
};
</script>