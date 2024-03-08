<template>
    <div>
        <Header />
        <br>
        <Wrapper>
          <div class="flex items-center mb-4">
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Search name..."
              class="border-2 border-gray-300 px-2 py-1 rounded"
            />
          </div>
            <p class="text-2xl text-bg-blue-900"> {{ filteredGuests.length }} Guest Entries </p>
            <table class="w-full border-2 border-bg-blue-900">
                <thead class="bg-blue-900">
                    <tr>
                        <th class="text-left p-3 text-white">First Name<i class="bi-alarm"></i></th>
                        <th class="text-left p-3 text-white">Last Name</th>
                        <th class="text-left p-3 text-white">Date Last Stayed</th>
                        <th class="text-left p-3 text-white"></th>
                    </tr>
                </thead>
                <tbody class="rounded">
                    <tr 
                      class="border-b-2 border-bg-blue-900 h-14" 
                      v-for="(guest, index) in filteredGuests" 
                      :key="index"
                      :class="{ 'bg-white': index % 2 === 0, 'bg-yellow-100': index % 2 !== 0 }"
                    >
                        <td class="px-3">{{ guest.firstName }}</td>
                        <td class="px-3">{{ guest.lastName }}</td>
                        <td class="px-3">{{ formatDate(guest.latestCheckInDate) }}</td>
                        <td class="px-3">
                          <router-link :to="{ name: 'GuestProfile', params: { id: guest.id } }">
                            <button class="bg-blue-900 text-white rounded px-3 py-2">View Profile</button>
                          </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        
        </Wrapper>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import Wrapper from '../components/Wrapper.vue'
import store from "../store/store.js"
  
  export default {
    name: 'ViewAllGuests',
    components: {
      Header,
      Wrapper,
    },
    data() {
      return {
        guests: [],
        searchQuery: ''
      };
    },
    computed: {
      filteredGuests() {
        return this.guests.filter(guest => {
          const fullName = `${guest.firstName} ${guest.lastName}`.toLowerCase();
          return fullName.includes(this.searchQuery.toLowerCase());
        });
      },
    },
    async created(){
      store.dispatch("guestModule/getAll")
      .then((data) => {
        this.guests = data.guests;
        console.log(this.guests);
      })
      .catch((error) => {
        console.error("Error fetching guests:", error);
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
        
        