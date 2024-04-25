<template>
  <div>
    <Header />
    <br>
    <Wrapper>
      <h1 class="text-center">Welcome, {{ userFirstName }} {{ userLastName }}!</h1>
      <div class="flex">
        <CounterCard :title="guestList.length + ' Guests Checked In'"
          :content="guestList.length + ' Overnight Stays'" />
        <CounterCard :title="`${guestData.bunksAssigned} Bunks Assigned`"
          :content="`${guestData.topBunksAvailable} Top Bunks Available ${guestData.bottomBunksAvailable} Bottom Bunks Available`" />
        <CounterCard :title="`${guestData.lockersAssigned} Lockers Assigned`"
          :content="`${guestData.dayLockersAvailable} Day Lockers Available ${guestData.storageLockersAvailable} Storage Lockers Available`" />
      </div>

      <NoteSection NoteTitle="Guest Notes" />
      <NoteSection NoteTitle="Guest Coordination" />

      <br>
      <br>
      <NoteSection NoteTitle="Nightly Highlights" />
      <NoteSection NoteTitle="New Guest Name and Introduction" />
    </Wrapper>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Wrapper from '../components/Wrapper.vue'
import CounterCard from '../components/CounterCard.vue'
import NoteSection from '../components/NoteSection.vue'
import store from "../store/store.js";

export default {
  name: 'Dashboard',
  components: {
    Header,
    Wrapper,
    CounterCard,
    NoteSection
  },
  data() {
    return {
      userFirstName: "",
      userLastName: "",
      guestData: {
        guestsCheckedIn: 0,
        overnightStays: 0,
        servicesOnly: 0,
        bunksAssigned: 0,
        topBunksAvailable: 0,
        bottomBunksAvailable: 0,
        lockersAssigned: this.filledLockers,
        dayLockersAvailable: 0,
        storageLockersAvailable: this.emptyLockers
      },
      guestList: [],
      numbers: [],
      filledLockers: NaN,
      emptyLockers: NaN,
      filledBunks: NaN,
      emptyBunks: NaN
    }
  },
  async created() {
    store.dispatch("guestModule/getCurrent")
      .then((data) => {
        this.guestList = data.guests;
        console.log(this.guestList);
      })
      .catch((error) => {
        console.error("Error fetching guests:", error);
      });

    store.dispatch("lockerModule/getNumbers")
      .then((data) => {
        console.log(data);
        this.emptyLockers = data.emptyCount;
        this.filledLockers = data.filledCount;
        console.log(this.emptyLockers);
        console.log(this.filledLockers);
      })
      .catch((error) => {
        console.error("Error fetching lockers:", error);
      });
    
    store.dispatch("bunkModule/getNumbers")
      .then((data) => {
        console.log(data);
        this.emptyBunks = data.emptyCount;
        this.filledBunks = data.filledCount;
        console.log(this.emptyBunks);
        console.log(this.filledBunks);
      })
      .catch((error) => {
        console.error("Error fetching bunks:", error);
      });


    const cachedUser = JSON.parse(localStorage.getItem('user'));
    if (cachedUser) {
      this.userFirstName = cachedUser.firstName || '';
      this.userLastName = cachedUser.lastName || '';
    } else {
      console.error('User not found in local storage');
    }
    // // Fetch initial data from MongoDB
    // this.fetchGuestData();

    // // Subscribe to real-time updates
    // store.subscribe((mutation, state) => {
    //   if (mutation.type === 'updateGuestData') {
    //     this.guestData = state.guestData;
    //   }
    // });
  },
  methods: {
    async fetchGuestData() {
      try {
        // Call your method to fetch guest data from MongoDB via your store
        const data = await store.fetchGuestDataFromMongoDB();
        this.guestData = data;
      } catch (error) {
        console.error('Error fetching guest data:', error);
      }
    },
    formatContent(content) {
      // Split the content string by '$' and join with '<br>' for line breaks
      return content.split('$').join('<br>');
    }
  }
}
</script>
