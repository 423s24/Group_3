<template>
  <div>
    <Header />
    <br>
    <Wrapper>
      <h1 class="text-center">Welcome, {{ userFirstName }} {{ userLastName }}!</h1>
      <div class="flex">
        <CounterCard :title="guestList.length + ' Guests Checked In'"
          :content="guestList.length + ' Overnight Stays'" />
        <CounterCard :title="`${filledBunks} Bunks Assigned`"
          :content="`${emptyBunks_top} Top Bunks Available ${emptyBunks_bottom} Bottom Bunks Available`" />
        <CounterCard :title="`${filledLockers} Lockers Assigned`"
          :content="`${emptyLockers} Day Lockers Available`" />
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
      filledLockers: 0,
      emptyLockers: 0,
      filledBunks: 0,
      emptyBunks_top: 0,
      emptyBunks_bottom: 0
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
        console.log('locker: ', this.emptyLockers);
        console.log('locker: ', this.filledLockers);
      })
      .catch((error) => {
        console.error("Error fetching lockers:", error);
      });
    
    store.dispatch("bunkModule/getNumbers")
      .then((data) => {
        console.log(data);
        this.emptyBunks_top = data.emptyCount_top;
        this.emptyBunks_bottom = data.emptyCount_bottom;
        this.filledBunks = data.filledCount;
        console.log('bunks: ', this.emptyBunks_top);
        console.log('bunks: ', this.emptyBunks_bottom);
        console.log('bunks: ', this.filledBunks);
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
