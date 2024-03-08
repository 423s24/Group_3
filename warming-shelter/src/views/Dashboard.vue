<template>
  <div>
    <Header/>
    <br>
    <Wrapper>
      <h1 class="text-center">Welcome, {{ firstName }} {{lastName}}!</h1>
      <div class="flex">
        <CounterCard title="Card Title" content="Card content goes here"/>
        <CounterCard title="Card Title" content="Card content goes here"/>
        <CounterCard title="Card Title" content="Card content goes here"/>
      </div>

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
  
  data() {
    return {
      firstName: '',
      lastName: '',
      sites: [
        {
          uid: 1,
          name: 'WebDigitalCommunications',
          link: 'https://www.montana.edu/web/',
          errors: 0,
          page: 1,
          docs: 0,
          lastScanned: 'January 25, 2024'
        },
        {
          uid: 2,
          name: 'ComputerScience',
          link: 'https://www.montana.edu/cs/',
          errors: 0,
          page: 1,
          docs: 0,
          lastScanned: 'January 1, 2022'
        },
        {
          uid: 3,
          name: 'ComputerScience',
          link: 'https://www.montana.edu/cs/',
          errors: 0,
          page: 1,
          docs: 0,
          lastScanned: 'January 1, 2022'
        }
      ]
    }
  },
  async created() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.firstName = user.user.firstName;
    this.lastName = user.user.lastName;
  }
}
</script>
  