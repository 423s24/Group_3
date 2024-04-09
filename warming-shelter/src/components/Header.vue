<template>
    <header class="flex sticky top-0 bg-hrdc-teal shadow-lg h-20 items-center">
      <Wrapper>
        <nav class="flex items-center flex-shrink-0 text-white mr-6">
          <!-- Adjust width and height of the logo -->
          <img src="../assets/hrdc-logo.svg" class="h-12 w-auto mr-6" alt="HRDC Logo">
          <ol class="flex items-center text-white text-xl list-none gap-3">
            <router-link to="/dashboard" class="mr-6 hover:text-hrdc-orange">Dashboard</router-link>
            <router-link to="/enterguests" class="mr-6 hover:text-hrdc-orange">Enter Guests</router-link>
            <router-link to="/currentguests" class="mr-6 hover:text-hrdc-orange">View Current Guests</router-link>
            <router-link to="/assignspaces" class="mr-6 hover:text-hrdc-orange">Assign Spaces</router-link>
            <router-link to="/viewallguests" class="mr-6 hover:text-hrdc-orange">View All Data</router-link>
            <router-link to="/resources" class="mr-6 hover:text-hrdc-orange">Resources</router-link>
            <router-link to="/" class="mr-6 bg-hrdc-green hover:bg-hrdc-orange hover:text-white py-2 px-4 rounded-md transition duration-300" @click.native="logout">Logout</router-link>

          </ol>
        </nav>
      </Wrapper>
    </header>
  </template>
  
  <script>
  import Wrapper from './Wrapper.vue'
  import store from '../store/store';
  import router from '../Router';
  
  export default {
    name: 'Header',
    components: {
      Wrapper
    },
    methods: {
      logout() {
        store.dispatch("authModule/logout");
        router.push("/");
      }
    }
  }
  </script>
  
  <style>
  /* style to make mobile friendly, hamburger menu when its smaller than 1000px */
  /* add icon to see menu when smaller than 1000px */
  @media (max-width: 1000px) {
    .flex {
      display: flex;
      flex-direction: column;
    }
    .flex ol {
      display: none;
    }
    .flex ol.active {
      display: block;
    }
    .flex img {
      display: none;
    }
    .flex button {
      display: block;
    }
  }
  </style>
  