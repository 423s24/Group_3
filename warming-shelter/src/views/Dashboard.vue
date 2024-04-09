<template>
  <div>
    <Header/>
    <br>
    <Wrapper>
      <h1 class="text-center">Welcome, {{ firstName }} {{ lastName }}!</h1>
      <div class="flex">
        <CounterCard :title="`${guestData.guestsCheckedIn} Guests Checked In`" 
                     :content="`${guestData.overnightStays} Overnight Stays ${guestData.servicesOnly} Services Only`"/>
        <CounterCard :title="`${guestData.bunksAssigned} Bunks Assigned`" 
                     :content="`${guestData.topBunksAvailable} Top Bunks Available ${guestData.bottomBunksAvailable} Bottom Bunks Available`"/>
        <CounterCard :title="`${guestData.lockersAssigned} Lockers Assigned`" 
                     :content="`${guestData.dayLockersAvailable} Day Lockers Available ${guestData.storageLockersAvailable} Storage Lockers Available`"/>
      </div>

      <NoteSection NoteTitle="Guest Notes"/>
      <NoteSection NoteTitle="Guest Coordination"/>
      
      <br>
      <br>
      <NoteSection NoteTitle="Nightly Highlights"/>
      <NoteSection NoteTitle="New Guest Name and Introduction"/>
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
      guestData: {
        guestsCheckedIn: 0,
        overnightStays: 0,
        servicesOnly: 0,
        bunksAssigned: 0,
        topBunksAvailable: 0,
        bottomBunksAvailable: 0,
        lockersAssigned: 0,
        dayLockersAvailable: 0,
        storageLockersAvailable: 0
      }
    }
  },
  async created() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.firstName = user.user.firstName;
    this.lastName = user.user.lastName;

    // Fetch initial data from MongoDB
    this.fetchGuestData();

    // Subscribe to real-time updates
    store.subscribe((mutation, state) => {
      if (mutation.type === 'updateGuestData') {
        this.guestData = state.guestData;
      }
    });
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
