<template>
    <div>
        <Header />
        <br>
        <Wrapper>
      <div class="max-w-lg mx-auto">
        <form @submit.prevent="saveProfile" v-if="isEditing" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label for="firstName" class="block text-gray-700 font-bold mb-2">First Name:</label>
            <input id="firstName" v-model="profile.firstName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="First Name">
          </div>

          <div class="mb-4">
            <label for="lastName" class="block text-gray-700 font-bold mb-2">Last Name:</label>
            <input id="lastName" v-model="profile.lastName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Last Name">
          </div>

          <div class="mb-4">
            <label for="dob" class="block text-gray-700 font-bold mb-2">Date of Birth:</label>
            <input id="dob" v-model="profile.dob" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Date of Birth">
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="accommodation">
              Reasonable Accommodation:  
            </label>
            <input id="accommodation" type="checkbox" v-model="profile.has_accommodation" class="mr-2 leading-tight">
            <span class="text-gray-700 text-sm">Yes</span>
          </div>

            <div v-if="profile.has_accommodation">
              <div class="flex items-center mb-4">
                <label for="descAccommodation">Accommodation Description:</label>
                <textarea id="descAccommodation" v-model="profile.desc_accommodation"></textarea>
              </div>
            </div>

            <button type="submit" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
              Save Profile
            </button>

          </form>

          <div v-else @dblclick="toggleEditMode" class="hover:cursor-pointer">
              <div class="flex items-center mb-4">
                  <div class="w-3/4">{{ profile.firstName }}</div>
              </div>
              <div class="flex items-center mb-4">
                  <div class="w-3/4">{{ profile.lastName }}</div>
              </div>
              <div class="flex items-center mb-4">
                  <div class="w-3/4">{{ formatDate(profile.dob) }}</div>
              </div>
              <div v-if="profile.has_accommodation">
                  <div class="flex items-center mb-4">
                    <div class="w-3/4-green">Reasonable Accommodation</div>
                  </div>
                  <div class="flex items-center mb-4">
                    <div class="w-3/4-green">{{ profile.desc_accommodation }}</div>
                  </div>
              </div>   
          </div> 
        </Wrapper>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import Wrapper from '../components/Wrapper.vue'
import store from "../store/store.js"
  
  export default {
    name: 'GuestProfile',
    components: {
        Header,
        Wrapper,
    },
    data() {
      return {
        profile: [],
        isEditing: false
      };
    },
    created() {
      const guestId = this.$route.params.id;
      
      store.dispatch("guestModule/viewProfile", { id: guestId })
        .then((data) => {
          this.profile = data.profile;
          console.log(this.profile);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
  },
  methods: {
      formatDate(dateString) {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
      },
      toggleEditMode() {
        this.isEditing = !this.isEditing;
      },
      saveProfile() {
        const guestId = this.$route.params.id;
        console.log("Profile before dispatch:", this.profile);
        store.dispatch("guestModule/updateProfile", { id: guestId, profile: this.profile })
        .then(() => {
          console.log("Profile updated successfully.");
          this.isEditing = false; // Exit edit mode after saving
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
      }

    }   
  }

</script>