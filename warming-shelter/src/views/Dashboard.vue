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
  
        <h2>Motivation</h2>
        <p>The primary motivation behind the development of this software stems from the need to streamline and enhance the efficiency of managing guest data at the HRDC's homeless warming center. Prior to the introduction of this software, the center relied heavily on manual data entry processes, utilizing Google Sheets to input and manage information across two separate databases: one internal (CaseWorthy) and one statewide (HMIS). This method was not only time-consuming but also prone to errors, leading to inefficiencies in data management and reporting.</p>
        
        <br>
        
        <h2>Purpose</h2>
        <p>This custom software solution is designed to enhance the operation of the HRDC’s year-round homeless warming center in Bozeman, Montana. It aims to assist front desk staff in managing incoming and outgoing guests efficiently. This software aims to minimize the learning curve and reduce the operation burden on front desk staff.</p>

        <table class="w-full border-2 border-blue-200">
            <thead class="bg-blue-200">
            <tr>
                <th class="text-left p-3">Sites <i class="bi-alarm"></i></th>
                <th class="text-left p-3">Link</th>
                <th class="text-left p-3">Errors</th>
                <th class="text-left p-3">Last Scanned</th>
                <th class="sr-only">View Details</th>
            </tr>
            </thead>
            <tbody class="rounded">
            
            <tr class="border-b-2 border-blue-200 h-14" v-for="(site, index) in sites" :key="index">
                <td class="px-3">{{ site.name }}</td>
                <td class="px-3">{{ site.link }}</td>
                <td class="px-3"><span class="flex w-10 rounded justify-center py-2 font-bold" :class="[
                site.errors == 0 ? 'bg-success text-white' : '',
                site.errors > 0 && site.errors < 5 ? 'bg-warning text-white' : '',
                site.errors > 5 ? 'bg-danger text-white' : '',
                ]">{{ site.errors }}</span></td>
                <td class="px-3">{{ site.lastScanned }}</td>
                <td class="px-3 text-right"><button @click="redirect(uid)" class="bg-primary text-white rounded px-3 py-2">View Details</button></td>
            </tr>
      
      </tbody>
    </table>
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
  