<template>
    <div>
        <Header />
        <br>
        <Wrapper>
          <div v-if="viewBunks">
            <button @click="switchView" class="switch-btn">Edit lockers</button>
            <button class="checkout-btn" @click="checkoutAll">Clear All</button>
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
                                <button class="bg-blue-900 hover:bg-gray-500 text-white rounded px-3 py-2">View Profile</button>
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
                    <tr v-for="bunk in filteredBunks('observation')" :key="bunk.number">
                      <td class="px-3">{{ bunk.number }}</td>
                      <td class="px-3">
                        <input type="text" v-model="bunk.name" @input="updateBunk(bunk.number, bunk.name)" class="border-2 border-gray-500 rounded px-3 py-1 w-full">
                      </td>
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
                    <tr v-for="bunk in filteredBunks('women')" :key="bunk.number">
                      <td class="px-3">{{ bunk.number }}</td>
                      <td class="px-3">
                        <input type="text" v-model="bunk.name" @input="updateBunk(bunk.number, bunk.name)" class="border-2 border-gray-500 rounded px-3 py-1 w-full">
                      </td>
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
                    <!-- Loop for men slots -->
                    <tr v-for="bunk in filteredBunks('men')" :key="bunk.number">
                      <td class="px-3">{{ bunk.number }}</td>
                      <td class="px-3">
                        <input type="text" v-model="bunk.name" @input="updateBunk(bunk.number, bunk.name)" class="border-2 border-gray-500 rounded px-3 py-1 w-full">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="clearfix"></div> <!-- Clear the float -->
            </div>
          </div>
          
          <div v-else>
              <button @click="switchView" class="switch-btn">Edit bunks</button>

              <div class="overflow-x-auto">
                <!-- Container for the lockers -->
                <div class="table-container">
                    <div class="float-left">
                      <p class="text-2xl text-bg-blue-900">Lockers</p>
                      <table class="w-full border-2 border-bg-blue-900">
                        <thead class="bg-blue-900">
                          <tr>
                            <th class="text-left p-3 text-white">Number<i class="bi-alarm"></i></th>
                            <th class="text-left p-3 text-white">Guest</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="locker in lockers.slice(0, 28)" :key="locker.number">
                            <td class="p-3">{{ locker.number }}</td>
                            <td class="p-3">
                              <input type="text" v-model="locker.name" @input="updateLocker(locker.number, locker.name)" class="border-2 border-gray-500 rounded px-3 py-1 w-full">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="float-left">
                      <p class="text-2xl text-white">blank</p>
                      <table class="w-full border-2 border-bg-blue-900">
                        <thead class="bg-blue-900">
                          <tr>
                            <th class="text-left p-3 text-white">Number<i class="bi-alarm"></i></th>
                            <th class="text-left p-3 text-white">Guest</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="locker in lockers.slice(28, 55)" :key="locker.number">
                            <td class="p-3">{{ locker.number }}</td>
                            <td class="p-3">
                              <input type="text" v-model="locker.name" @input="updateLocker(locker.number, locker.name)" class="border-2 border-gray-500 rounded px-3 py-1 w-full">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="float-left">
                      <p class="text-2xl text-white">blank</p>
                      <table class="w-full border-2 border-bg-blue-900">
                        <thead class="bg-blue-900">
                          <tr>
                            <th class="text-left p-3 text-white">Number<i class="bi-alarm"></i></th>
                            <th class="text-left p-3 text-white">Guest</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="locker in lockers.slice(55, 83)" :key="locker.number">
                            <td class="p-3">{{ locker.number }}</td>
                            <td class="p-3">
                              <input type="text" v-model="locker.name" @input="updateLocker(locker.number, locker.name)" class="border-2 border-gray-500 rounded px-3 py-1 w-full">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="float-left">
                      <p class="text-2xl text-white">blank</p>
                      <table class="w-full border-2 border-bg-blue-900">
                        <thead class="bg-blue-900">
                          <tr>
                            <th class="text-left p-3 text-white">Number<i class="bi-alarm"></i></th>
                            <th class="text-left p-3 text-white">Guest</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="locker in lockers.slice(83)" :key="locker.number">
                            <td class="p-3">{{ locker.number }}</td>
                            <td class="p-3">
                              <input type="text" v-model="locker.name" @input="updateLocker(locker.number, locker.name)" class="border-2 border-gray-500 rounded px-3 py-1 w-full">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
              </div>
          </div>
        </Wrapper>
      </div>
    </template>

<script>
import { toHandlers } from 'vue';
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
        reservations: [],
        bunks: [],
        viewBunks: true,
        lockers: []
      };
    },
    async created(){
      //Get current guests
      store.dispatch("guestModule/getCurrent")
      .then((data) => {
        this.guests = data.guests;
        console.log(this.guests);
      })
      .catch((error) => {
        console.error("Error fetching guests:", error);
      });

      //Get guests with reservations
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

      //Get all bunks
      store.dispatch("bunkModule/getAll")
      .then((data) => {
        this.bunks = data.bunks;
        console.log(this.bunks);
      })
      .catch((error) => {
        console.error("Error fetching bunks:", error);
      });

      //Get all lockers
      store.dispatch("lockerModule/getAll")
      .then((data) => {
        this.lockers = data.lockers;
        this.lockers.sort((a, b) => a.number - b.number);
        console.log(this.lockers);
      })
      .catch((error) => {
        console.error("Error fetching lockers:", error);
      });

    }, 
    methods: {
      formatDate(dateString) {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
      },
      filteredBunks(category) {
        return this.bunks
        .filter(bunk => bunk[category])
        .sort((a, b) => {
          const numA = parseInt(a.number);
            const numB = parseInt(b.number);
            
            // Extract letters
            const letterA = a.number.replace(/\d+/g, '');
            const letterB = b.number.replace(/\d+/g, '');
            
            // Compare numbers first
            if (numA !== numB) {
                return numA - numB;
            } else {
                // If numbers are equal, compare letters
                return letterA.localeCompare(letterB);
            }
        });
      },
      updateBunk(number, name) {
        console.log("number:" + number)
        console.log("name:" + name)
        // Call the update method from your store with bunk number and new name
        store.dispatch("bunkModule/updateBunk", { number, name })
          .then(() => {
            console.log("Bunk updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating bunk:", error);
          });
      },
      checkoutAll(){
        const bunksToClear = this.bunks
        for(const bunk of bunksToClear){
          let clearName = null
          let number = bunk.number
          store.dispatch("bunkModule/updateBunk", { number, clearName })
          .then(() => {
            window.location.reload();
            console.log("Bunks cleared successfully!");
          })
          .catch((error) => {
            console.error("Error updating bunk:", error);
          });
        }
      },
      switchView(){
        this.viewBunks = !this.viewBunks
      },
      updateLocker(number, name){
        console.log("number:" + number)
        console.log("name:" + name)
        store.dispatch("lockerModule/updateLocker", { number, name })
          .then(() => {
            console.log("Locker updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating locker:", error);
          });
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

  .checkout-btn {
    position:absolute;
    top: 8%;
    right: 1%;
    background-color: rgba(30,58,138,255);
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
  }

  .switch-btn {
    position:absolute;
    top: 8%;
    left: 1%;
    background-color: rgba(30,58,138,255);
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
  }

  .checkout-btn:hover,
  .switch-btn:hover {
    background-color: grey;
  }

</style>
