<template>
    <div>
        <Header />
        <br>
        <Wrapper>
          
          <div>
            <div class="flex items-center mb-4">
              <div class="w-3/4">{{ profile.firstName }}</div>
            </div>
            <div class="flex items-center mb-4">
              <div class="w-3/4">{{ profile.lastName }}</div>
            </div>
            <div class="flex items-center mb-4">
              <div class="w-3/4">{{ formatDate(profile.dob) }}</div>
            </div>
            <div v-if="profile.has_accommodation" class="flex items-center mb-4">
              <div class="w-3/4-green">Reasonable Accommodation</div>
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
        profile: []
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
      }
    }   
  }

</script>