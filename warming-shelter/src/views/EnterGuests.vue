<template>
    <Header />
    <br>

    <div class="flex flex-row items-center justify-center">
        <div class="w-2/3 p-4 m-4">
            <div class="w-full m-4 p-4">
                <form class="w-full p-0 m-0" @submit.prevent="addGuest">
                <label for="guestName">Guest Name:</label>
                <input class="w-full" type="text" id="guestName" v-model="newGuestName" required />
                <!-- <button class="m-0 p-0 w-0 h-0" type="submit">Add Guest</button> -->
                </form>
            </div>

            <div class="bg-white rounded-lg p-4  border-2 border-bg-blue-900 m-4 w-full">
                <h2>Guestlist:</h2>
                    <ul class="flex">
                        <li v-for="guest in guestList" :key="guest.id">
                            <div class="inline-block p-4 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded cursor-pointer">{{ guest.name }}</div>
                        </li>
                    </ul>
            </div>
            
        </div>
        <div class="w-1/3 p-4">
            <CounterCard  class="w-full" :title= "guestList.length + ' Guests Checked In'" :content=" guestList.length + ' Overnight Stays'"/>
            <div class="bg-white rounded-lg p-4  border-2 border-bg-blue-900 m-4 w-full">
                <p>Key:</p>
            </div>
        </div>
        
    </div>
</template>

<script>
    import Header from '../components/Header.vue'
    import CounterCard from '../components/CounterCard.vue'
    export default {
        data() {
            return {
                newGuestName: '',
                newGuestValue: '',
                guestList: []
            };
        },
        methods: {
            addGuest() {
            // Ensure field is filled before adding the guest
            if (this.newGuestName) {
                // Create a new object and add it to the list
                const newGuest = {
                    id: Date.now(), // Use a timestamp as a simple unique identifier
                    name: this.newGuestName,
                };

                this.guestList.push(newGuest);

                // Clear input fields after adding a guest
                this.newGuestName = '';
                } else {
                    alert('Please enter a guest name.');
                }
        }
  },
        name: 'EnterGuests',
        components:{
            Header,
            CounterCard
        }
    }
</script>