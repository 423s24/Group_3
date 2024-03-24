<template>
    <div>
        <Header />
        <br>
        <Wrapper>
            <p class="text-2xl text-bg-blue-900"> {{ guests.length }} Available Bunks </p>
            <table class="w-full border-2 border-bg-blue-900">
                <thead class="bg-blue-900">
                    <tr>
                        <th class="text-left p-3 text-white">Bunk Number<i class="bi-alarm"></i></th>
                        <th class="text-left p-3 text-white">Guest</th>
                    </tr>
                </thead>
                <tbody class="rounded">
                    <tr 
                      class="border-b-2 border-bg-blue-900 h-14" 
                      v-for="(guest, index) in guests" 
                      :key="index"
                      :class="{ 'bg-white': index % 2 === 0, 'bg-yellow-100': index % 2 !== 0 }"
                    >
                        <td class="px-3">{{ guest.bunk_reservation_number }}</td>
                        <td class="px-3">{{ guest.firstName }} {{ guest.lastName }}</td>
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
    name: 'AssignSpaces',
    components: {
      Header,
      Wrapper,
    },
    data() {
      return {
        guests: [],
      };
    },
    async created(){
      store.dispatch("guestModule/getCurrent")
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