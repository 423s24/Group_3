<template>
  <div>
    <Header/>
    <br>
    <Wrapper>
      <h1 class="text-center">Welcome, {{ firstName }} {{lastName}}!</h1>
      <div class="flex">
        <!-- card contenet should be live data of how many guests are in the shelter -->

        <CounterCard title="Card Title" content="Card content goes here"/>
        <CounterCard title="Card Title" content="Card content goes here"/>
        <CounterCard title="Card Title" content="Card content goes here"/>
      </div>

        <NoteSection NoteTitle="Guest Notes"/>
        <NoteSection NoteTitle="Nightly Celebrations"/>
        <br>
        <br>
        <NoteSection NoteTitle="Guest Notes"/>
        <NoteSection NoteTitle="Nightly Celebrations"/>
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
  
  
  async created() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.firstName = user.user.firstName;
    this.lastName = user.user.lastName;
  }
}
</script>
  