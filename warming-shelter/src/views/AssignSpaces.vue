<template>
    <div>
        <Header />
        <br>
        <Wrapper>
          <div class="table-container">
            <div class="float-left">
              <p class="text-2xl text-bg-blue-900"> {{ reservations.length }} Reservations</p>
              <table class="w-full border-2 border-bg-blue-900">
                  <thead class="bg-blue-900">
                      <tr>
                          <th class="text-left p-3 text-white">Bunk<i class="bi-alarm"></i></th>
                          <th class="text-left p-3 text-white">Guest</th>
                          <th class="text-left p-3 text-white"></th>
                      </tr>
                  </thead>
                  <tbody class="rounded">
                      <tr 
                        class="border-b-2 border-bg-blue-900 h-14" 
                        v-for="(guest, index) in reservations" 
                        :key="index"
                        :class="{ 'bg-white': index % 2 === 0, 'bg-yellow-100': index % 2 !== 0 }"
                      >
                          <td class="px-3">{{ guest.bunk_reservation_number }}</td>
                          <td class="px-3">{{ guest.firstName }} {{ guest.lastName }}</td>
                          <td class="px-3">
                            <router-link :to="{ name: 'GuestProfile', params: { id: guest.id } }">
                              <button class="bg-blue-900 text-white rounded px-3 py-2">View Profile</button>
                            </router-link>
                          </td>
                      </tr>
                  </tbody>
              </table>
            </div>

            <!-- Observation table -->
            <div class="float-left">
              <p class="text-2xl text-bg-blue-900">Observation</p>
              <table class="w-full border-2 border-bg-blue-900">
                <thead class="bg-blue-900">
                  <tr>
                    <th class="text-left p-3 text-white">Bunk<i class="bi-alarm"></i></th>
                    <th class="text-left p-3 text-white">Guest</th>
                  </tr>
                </thead>
                <tbody class="rounded">
                  <!-- Loop for observation slots -->
                  <tr v-for="slot in 18" :key="slot">
                    <td class="px-3">{{ Math.ceil(slot / 2) }}{{ String.fromCharCode(96 + (slot % 2 === 0 ? 2 : 1)) }}</td>
                    <td class="px-3"><input type="text" class="border-2 border-gray-500 rounded px-3 py-1 w-full"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Women's table -->
            <div class="float-left">
              <p class="text-2xl text-bg-blue-900">Women's</p>
              <table class="w-full border-2 border-bg-blue-900">
                <thead class="bg-blue-900">
                  <tr>
                    <th class="text-left p-3 text-white">Bunk<i class="bi-alarm"></i></th>
                    <th class="text-left p-3 text-white">Guest</th>
                  </tr>
                </thead>
                <tbody class="rounded">
                  <!-- Loop for women's slots -->
                  <tr v-for="slot in 18" :key="slot">
                    <td class="px-3">{{ Math.ceil(slot / 2) + 9 }}{{ String.fromCharCode(96 + (slot % 2 === 0 ? 2 : 1)) }}</td>
                    <td class="px-3"><input type="text" class="border-2 border-gray-500 rounded px-3 py-1 w-full"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Men's table -->
            <div class="float-left">
              <p class="text-2xl text-bg-blue-900">Men's</p>
              <table class="w-full border-2 border-bg-blue-900">
                <thead class="bg-blue-900">
                  <tr>
                    <th class="text-left p-3 text-white">Bunk<i class="bi-alarm"></i></th>
                    <th class="text-left p-3 text-white">Guest</th>
                  </tr>
                </thead>
                <tbody class="rounded">
                  <!-- Loop for men's slots -->
                  <tr v-for="slot in 76" :key="slot">
                    <td class="px-3">{{ Math.ceil(slot / 2) + 18 }}{{ String.fromCharCode(96 + (slot % 2 === 0 ? 2 : 1)) }}</td>
                    <td class="px-3"><input type="text" class="border-2 border-gray-500 rounded px-3 py-1 w-full"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="clearfix"></div> <!-- Clear the float -->
          </div>
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
        reservations: []
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

      store.dispatch("guestModule/getReservation")
      .then((data) => {
        this.reservations = data.guests;
        // Sort reservations by bunk_reservation_number
        this.reservations.sort((a, b) => a.bunk_reservation_number - b.bunk_reservation_number);
        console.log(this.reservations);
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

<style scoped>
  .table-container {
    display: flex;
    flex-wrap: wrap;
  }

  .float-left {
    width: 25%;
    box-sizing: border-box;
    padding: 0 10px;
  }
</style>
