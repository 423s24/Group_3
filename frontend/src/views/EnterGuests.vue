<template>
    <div>
      <Header />
      <br />
      <Wrapper>
        <div class="flex flex-row justify-center">
        <div class="w-2/3 p-4 m-4">
            <div class="w-full m-4 p-4">
              <form class="flex items-center justify-between w-full p-0 m-0" @submit.prevent="addGuest">
    <label for="guestSearch" class="mr-2">Enter Guest:</label>
    <div class="flex-grow">
        <input
            class="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
            type="text"
            id="guestSearch"
            v-model="searchQuery"
            placeholder="Search for a guest..."
        />
    </div>
    <button class="bg-hrdc-blue text-white px-4 py-2 rounded" type="submit">Submit</button>
    <input type="checkbox" id="services" v-model="isChecked">
    <label for="services">Services Only</label>
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
  
            <div class="bg-white rounded-lg p-4 border-2 border-hrdc-blue m-4 w-full">
              <h3 class="text-hrdc-blue text-lg font-semibold mb-2">Guest List:</h3>
              <ul class="grid grid-cols-2 gap-4">
                <li v-for="guest in guestList" :key="guest.id">
                  <div class="relative">
                    <router-link :to="{ name: 'GuestProfile', params: { id: guest.id } }">
                      <div class="p-4 border-2 border-hrdc-blue font-bold text-hrdc-blue text-md rounded cursor-pointer transition-transform transform hover:scale-105 hover:duration-300 text-center">
                        {{ guest.firstName + " " + guest.lastName}}
                        <div class="flex flex-row justify-center">
                          <div :style="{ backgroundImage: getBackgroundColorHMIS(guest)}" class="h-8 w-8 rounded-full"></div>
                          <div :style="{ backgroundImage: getBackgroundColorNoTrespass(guest)}" class="h-8 w-8 rounded-full"></div>
                          <div :style="{ backgroundImage: getBackgroundColorServicesOnly(guest)}" class="h-8 w-8 rounded-full"></div>
                        </div>
                      </div>
                    </router-link> 
                    <button @click="removeGuest(guest)" class="absolute top-0 right-0 bg-hrdc-blue hover:bg-red-500 text-white font-bold px-2 py-1 rounded-full transform transition duration-300 hover:scale-110">X</button>                      
                  </div>
                </li>
              </ul>
            </div>

        </div>
        <div class="w-1/3 p-4 flex flex-col justify-start">
          <div class="mb-4">
            <button @click="showCheckoutConfirm" class="bg-hrdc-green text-white py-2 px-4 rounded-md hover:bg-hrdc-teal">Checkout All Guests</button>
            <div v-if="showPopup" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <div class="bg-white p-8 rounded">
                <p>Are you sure you want to check out all guests?</p>
                <button @click="checkoutAll" class="bg-hrdc-blue text-white py-2 px-4 rounded mr-2 justify-center">Yes</button>
                <button @click="cancelCheckout" class="bg-gray-400 text-white py-2 px-4 rounded justify-center">No</button>
              </div>
            </div>
          </div>
          <div class="mb-4">
            <CounterCard :title="guestList.length + ' Guests Checked In'" :content="guestList.length + ' Overnight Stays'" class="w-full" />
          </div>

          <div class="bg-white rounded-lg p-4 border-2 border-bg-blue-900 w-full">
            <p class="font-semibold mb-4">Key:</p>
            <div class="flex items-center mb-2">
              <div class="border-black border-2 w-10 h-10 m-3"></div>
              <div>No Discrepancies</div>
            </div>
            <!-- <div class="flex items-center mb-2">
              <div class="bg-purple-400 bg-opacity-50 border-black border-2 w-10 h-10 m-3"></div>
              <div>Has Recent Notes</div>
            </div> -->
            <div class="flex items-center mb-2">
              <div class="bg-yellow-300 bg-opacity-50 border-black border-2 w-10 h-10 m-3"></div>
              <div>Need Info Added to HMIS</div>
            </div>
            <div class="flex items-center mb-2">
              <div class="bg-lime-900 bg-opacity-50 border-black border-2 w-10 h-10 m-3"></div>
              <div>Services Only</div>
            </div>
            <div class="flex items-center mb-2">
              <div class="bg-red-500 bg-opacity-50 border-black border-2 w-10 h-10 m-3"></div>
              <div>No Trespass</div>
            </div>
          </div>
        </div>

        
      </div>
    </Wrapper>
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue'
  import CounterCard from '../components/CounterCard.vue'
  import Wrapper from '../components/Wrapper.vue'
  import store from "../store/store.js"
  
  export default {
    name: 'EnterGuests',
    components: {
      Header,
      Wrapper,
      CounterCard
    },
    data() {
      return {
        searchQuery: '',
        guestList: [],
        guests: [],
        showPopup: false
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
        store.dispatch("guestModule/getCurrent")
        .then((data) => {
          this.guestList = data.guests;
          console.log(this.guestList);
        })
        .catch((error) => {
          console.error("Error fetching guests:", error);
        });
    },
    methods: {
      addGuest() {
        // Ensure field is filled before adding the guest
        var services = false
        if(this.isChecked === true){
          console.log("test")
           services = true
           console.log(services)
        }
        if (this.searchQuery.split(" ").length >= 2) {
            const match = this.guests.filter(guest => {
                const fullName = `${guest.firstName} ${guest.lastName}`.toLowerCase();
                return fullName.includes(this.searchQuery.toLowerCase());
            });
            if(match.length == 1){
                //this.guestList.push(match[0])
                this.checkin(match[0])
                this.searchQuery = ""
            } else if(match.length > 1){
                pass
            } else {
                const fullName = this.searchQuery.split(" ")
                const newGuest = {
                    firstName : fullName[0],
                    lastName : fullName[1],
                    id: Date.now(),
                    laundry : services
                }
                // Works to make a new guest, but isn't properly pushed to guest list?
                // Need to refresh page to get object to appear in guest lists
                // Can fix by having the makeNewGuest method return the new guest object but dunno how
                store.dispatch("guestModule/makeNewGuest", { profile: newGuest })
                .then(() => {
                  window.location.reload();
                  console.log("New guest creating success")
                })
                .catch((error) => {
                  console.error("Error creating new guest object:", error);
                })
                this.guestList.push(newGuest)
                 //this.checkin(newGuest)
                this.searchQuery = ""
            }
        } else {
          alert('Please enter a guests first and name.')
        }
      },
      
      selectResult(result) {
        // if(this.isChecked === true){
        //   console.log("test")
        // }
        
        this.checkin(result)
        this.searchQuery = ""
      },

      checkin(guest){
        if(this.isChecked === true){
           console.log("test")
        }
        
        if(!(this.guestList.find(e => e.id === guest.id))){
          this.guestList.push(guest)
        }

        guest.isActive = true;
        // if (this.isYesterday(guest.latestCheckInDate)){
        //   guest.consecutiveDaysStayed += 1
        // }
        //guest.latestCheckInDate = new Date();
        console.log("Profile before dispatch:", guest);
        store.dispatch("guestModule/updateProfile", { id: guest.id, profile: guest})
        .then(() => {
          console.log("Profile updated successfully.");
          //this.isEditing = false; // Exit edit mode after saving
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });

      },

      showCheckoutConfirm(){
        this.showPopup = true;
      },

      cancelCheckout(){
        this.showPopup = false;
      },

      checkoutAll(){
        const guestsToCheckout = this.guestList
        for (const guest of guestsToCheckout){
          guest.isActive = false;
          console.log("Profile before dispatch:", guest);
          store.dispatch("guestModule/updateProfile", { id: guest.id, profile: guest})
          .then(() => {
            console.log("Profile updated successfully.");
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });
        }
        this.guestList = [];
        this.showPopup = false;
      },

      isYesterday(comparedDate) {
        const today = new Date();

        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const comparedDateFormatted = new Date(comparedDate.getFullYear(), comparedDate.getMonth(), comparedDate.getDate());

        return comparedDateFormatted.getTime() === yesterday.getTime();
      },

      getBackgroundColorClass(guest){
        if((guest.bx_noTrespass === true && guest.hmis_valid === false)){
          return 'linear-gradient(to right, rgb(239, 68, 68, 0.5), rgb(239, 68, 68, 0.5) 50%, rgb(253, 224, 71, 0.5), rgb(253, 224, 71, 0.5) 50%)'
        }
        else if((guest.bx_noTrespass === true)){
          return 'linear-gradient(90deg, rgb(239, 68, 68, 0.5), rgb(239, 68, 68, 0.5)'
        }
        else if(guest.hmis_valid === false){
          return 'linear-gradient(90deg, rgb(253, 224, 71, 0.5), rgb(253, 224, 71, 0.5 ))'
        }
        else if(guest.laundry === true){
          return 'linear-gradient(90deg, rgb(54 83 20 / var(--tw-bg-opacity))'
        }
        else{
          return 'linear-gradient(90deg, white, white)'
        }
      },

      getBackgroundColorHMIS(guest){
        if(guest.hmis_valid === false){
          return 'linear-gradient(90deg, rgb(253, 224, 71, 0.5), rgb(253, 224, 71, 0.5 ))'
        }else{
          return 'linear-gradient(90deg, white, white)'
        }
      },

      getBackgroundColorNoTrespass(guest){
        if(guest.bx_noTrespass === true){
          return 'linear-gradient(90deg, rgb(239, 68, 68, 0.5), rgb(239, 68, 68, 0.5))'
        }else{
          return 'linear-gradient(90deg, white, white)'
        }
      },

      getBackgroundColorServicesOnly(guest){
        if(guest.laundry === true){
          return 'linear-gradient(90deg, rgb(54 83 20), rgb(54 83 20))'
        }else{
          return 'linear-gradient(90deg, white, white)'
        }
      },

      removeGuest(guest){
        guest.isActive = false;
        console.log("Profile before dispatch:", guest);
        store.dispatch("guestModule/updateProfile", { id: guest.id, profile: guest})
        .then(() => {
          window.location.reload();
          console.log("Profile updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
      }
    }
  }
  </script>
  <style scooped>
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