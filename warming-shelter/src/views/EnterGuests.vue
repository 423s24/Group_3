<template>
    <div>
      <Header />
      <br />
  
      <div class="flex flex-row justify-center">
        <div class="w-2/3 p-4 m-4">
            <div class="w-full m-4 p-4">
                <form class="w-full p-0 m-0" @submit.prevent="addGuest">
                    <label for="guestSearch">Search Guest:</label>
                    <input
                        class="w-full"
                        type="text"
                        id="guestSearch"
                        v-model="searchQuery"
                    />
                </form>

                    <div v-if="searchPredict.length > 0" class="search-results">
                        <ul>
                            <li
                                v-for="result in searchPredict.slice(0, 5)"
                                :key="result.id"
                                @click="selectResult(result)"
                            >
                                {{ result.firstName + " " + result.lastName }}
                            </li>
                         </ul>
                    </div>
                
            </div>
  
          <div class="bg-white rounded-lg p-4 border-2 border-bg-blue-900 m-4 w-full">
            <h2>Guest List:</h2>
            <ul class="flex flex-wrap">
              <li v-for="guest in guestList" :key="guest.id">
                <!-- <div :class="getBackgroundColorClass(guest)" class="inline-block p-4 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded cursor-pointer"> -->
                  <router-link :to="{ name: 'GuestProfile', params: { id: guest.id } }">
                    <div :style="{ backgroundImage: getBackgroundColorClass(guest)}" class="inline-block p-4 m-4 border-black border-2 font-bold rounded cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:duration-300 ...">
                      {{ guest.firstName + " " + guest.lastName}}
                    </div>
                  </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-1/3 p-4">
          <CounterCard class="w-full" :title="guestList.length + ' Guests Checked In'" :content="guestList.length + ' Overnight Stays'" />
          <div class="bg-white rounded-lg p-4 border-2 border-bg-blue-900 m-4 w-full">
            <p>Key:</p>
            <br>
            <div class="flex flex-row items-center">
              <div class=" border-black border-4 w-10 h-10 m-3"></div>
              <div class="">No Discrepancies</div>
            </div>
            <div class="flex flex-row items-center">
              <div class="bg-purple-400 border-black border-4 w-10 h-10 m-3"></div>
              <div class="">Has Recent Notes</div>
            </div>
            <div class="flex flex-row items-center">
              <div class=" bg-yellow-300 border-black border-4 w-10 h-10 m-3"></div>
              <div class="">Need Info Added to HMIS</div>
            </div>
            <div class="flex flex-row items-center">
              <div class="bg-lime-900 border-black border-4 w-10 h-10 m-3"></div>
              <div class="">Services Only</div>
            </div>
            <div class="flex flex-row items-center">
              <div class="bg-red-500 border-black border-4 w-10 h-10 m-3"></div>
              <div class="">No Trespass</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue'
  import CounterCard from '../components/CounterCard.vue'
  import store from "../store/store.js"
  
  export default {
    name: 'EnterGuests',
    components: {
      Header,
      CounterCard
    },
    data() {
      return {
        searchQuery: '',
        guestList: [],
        guests: [],
      }
    },
    computed: {
      searchPredict() {
        if(this.searchQuery == ''){
            return ""
        } else {
            return this.guests.filter(guest => {
            const fullName = `${guest.firstName} ${guest.lastName}`.toLowerCase();
            return fullName.includes(this.searchQuery.toLowerCase());
            });
        }
      },
    },
    async created() {
      store
        .dispatch('guestModule/getAll')
        .then((data) => {
          this.guests = data.guests
          console.log(this.guests)
        })
        .catch((error) => {
          console.error('Error fetching guests:', error)
        })
    },
    methods: {
      addGuest() {
        // Ensure field is filled before adding the guest
        if (this.searchQuery.split(" ").length >= 2) {
            const match = this.guests.filter(guest => {
                const fullName = `${guest.firstName} ${guest.lastName}`.toLowerCase();
                return fullName.includes(this.searchQuery.toLowerCase());
            });
            if(match.length == 1){
                this.guestList.push(match[0])
                this.checkin(match[0])
                this.searchQuery = ""
            } else if(match.length > 1){
                pass
            } else {
                const fullName = this.searchQuery.split(" ")
                const newGuest = {
                    firstName : fullName[0],
                    lastName : fullName[1]
                }
                this.guestList.push(newGuest)
                this.searchQuery = ""
            }
        } else {
          alert('Please enter a guests first and name.')
        }
      },
      
      selectResult(result) {
        this.guestList.push(result)
        this.checkin(result)
        this.searchQuery = ""
      },

      checkin(guest){
        guest.isActive = true;
      },

      getBackgroundColorClass(guest){
        if((guest.bx_noTrespass === true && guest.hmis_valid === false)){
          return 'linear-gradient(to right, rgb(239 68 68), rgb(239 68 68) 50%, rgb(253 224 71), rgb(253 224 71) 50%)'
        }
        else if((guest.bx_noTrespass === true)){
          return 'linear-gradient(90deg, rgb(239 68 68), rgb(239 68 68))'
        }
        else if(guest.hmis_valid === false){
          return 'linear-gradient(90deg, rgb(253 224 71), rgb(253 224 71))'
        }
        // else if(guest.laundry)
        else{
          return 'linear-gradient(90deg, white, white)'
        }
      }
    }
  }
  </script>
  <style>
  .search-results {
    position: absolute;
    z-index: 1;
    background-color: #fff;
    border: 1px solid #ccc;
    max-height: 150px;
    overflow-y: auto;
  }
  
  .search-results ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .search-results li {
    padding: 8px;
    cursor: pointer;
  }
  
  .search-results li:hover {
    background-color: #f2f2f2;
  }
  </style>