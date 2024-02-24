<template>
    <Header />

    <div>
    <form @submit.prevent="addItem">
      <label for="itemName">Item Name:</label>
      <input type="text" id="itemName" v-model="newItemName" required />

      <!-- <label for="itemValue">Item Value:</label>
      <input type="number" id="itemValue" v-model="newItemValue" required /> -->

      <button type="submit">Add Item</button>
    </form>

    <h2>List of Objects:</h2>
    <ul class="flex">
      <li v-for="item in itemList" :key="item.id">
        <div class="inline-block p-4 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded cursor-pointer">{{ item.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
    import Header from '../components/Header.vue'
    export default {
        data() {
            return {
                newItemName: '',
                newItemValue: '',
                itemList: []
            };
        },
        methods: {
            addItem() {
            // Ensure both fields are filled before adding the item
            if (this.newItemName) {
                // Create a new object and add it to the list
                const newItem = {
                    id: Date.now(), // Use a timestamp as a simple unique identifier
                    name: this.newItemName,
                    //value: this.newItemValue
                };

                this.itemList.push(newItem);

                // Clear input fields after adding an item
                this.newItemName = '';
                //this.newItemValue = '';
                } else {
                    alert('Please ente.');
                }
        }
  },
        name: 'EnterGuests',
        components:{
            Header
        }
    }
</script>