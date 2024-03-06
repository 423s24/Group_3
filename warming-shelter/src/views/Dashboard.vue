<template>
    <div>
      <Header />
      <br>
      <Wrapper>
        <div class="flex">
            <CounterCard title="Card Title" content="Card content goes here" />
            <CounterCard title="Card Title" content="Card content goes here" />
            <CounterCard title="Card Title" content="Card content goes here" />
        </div>

        
      </Wrapper>
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue'
  import Wrapper from '../components/Wrapper.vue'
  import CounterCard from '../components/CounterCard.vue'
  
  export default {
    name: 'Dashboard',
    components: {
      Header,
      Wrapper,
      CounterCard
    },
  
  data() {
    return {
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
    }   
}
  </script>
  