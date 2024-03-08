<template>
<<<<<<< Updated upstream
  <div>
    <Header/>
    <br>
    <Wrapper>
      <h1>Welcome, {{ firstName }} {{lastName}}!</h1>
      <div class="flex">
        <CounterCard title="Card Title" content="Card content goes here"/>
        <CounterCard title="Card Title" content="Card content goes here"/>
        <CounterCard title="Card Title" content="Card content goes here"/>
      </div>
    </Wrapper>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Wrapper from '../components/Wrapper.vue'
import CounterCard from '../components/CounterCard.vue'
import store from "../store/store.js";

export default {
  name: 'Dashboard',
  components: {
    Header,
    Wrapper,
    CounterCard
  },

=======

>>>>>>> Stashed changes
  data() {
    return {
      firstName: '',
      lastName: '',

    }
  },
  async created() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.firstName = user.user.firstName;
    this.lastName = user.user.lastName;
  }
}
</script>
  