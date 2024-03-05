<template>
    <div>
      <Header />
      <br />
  
      <div class="flex flex-row items-center justify-center">
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
            <ul class="flex">
              <li v-for="guest in guestList" :key="guest.id">
                <div class="inline-block p-4 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded cursor-pointer">
                  {{ guest.firstName + " " + guest.lastName}}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-1/3 p-4">
          <CounterCard class="w-full" :title="guestList.length + ' Guests Checked In'" :content="guestList.length + ' Overnight Stays'" />
          <div class="bg-white rounded-lg p-4 border-2 border-bg-blue-900 m-4 w-full">
            <p>Key:</p>
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