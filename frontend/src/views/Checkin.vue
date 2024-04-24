<template>
    <h2>First Time Guest</h2>
    <form @submit.prevent="handleSubmit">
        
            <label for="first_name">First Name</label>
            <input
                id="first_name"
                v-model="first_name"
                type="text"
            /><br>

            <label for="last_name">Last Name</label>
            <input
                id="last_name"
                v-model="last_name"
                type="text"
            /><br>

            <label for="DOB">Date of Birth</label>
            <input
                id="DOB"
                v-model="DOB"
                type="date"
            /><br>

            <label for="SSN">Social Security Number</label>
            <input
                id="SSN"
                v-model="SSN"
                type="password"
            /><br>

            <label for="accommodation">Accommodation</label>
            <input
                id="accommodation"
                v-model="accommodation.name"
                type="text"
            /><br>

            <label for="accommodation-desc">Accommodation Description</label>
            <input
                id="accommodation-desc"
                v-model="accommodation.description"
                type="text"
            /><br>

            <div class ="grid-container">
                <div class="grid-item">
                    <label for="bunk">Bunk</label>
                    <input
                        id="bunk"
                        v-model="bunk"
                        type="text"
                    /><br>
                </div>

                <div class="grid-item">
                    <label for="locker">Locker</label>
                    <input
                        id="locker"
                        v-model="locker"
                        type="text"
                    /><br>
                </div>

                <div class="grid-item">
                    <label for="laundry">Laundry</label>
                    <select id="laundry" v-model="laundry">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select><br>
                </div>

                <div class="grid-item">
                    <label>Additional Resources</label>
                    <input
                        v-model="add_res"
                        type="text"
                    />
                </div>
                <div class="submit">
                        <button>Submit</button>
                </div>
            </div> 
       
        
            <label for="notes">Notes</label>
            <textarea 
                id="notes" 
                v-model="notes" 
                rows="4"
                style="background-color: lightgrey"
                >
            </textarea>
            <button @click="addNote">Add Note</button>
            <div v-for="(note, index) in guestNotes" :key="index">
                <p>{{ note }}</p>
            </div> 
    </form>
</template>
<script>
  export default {
    data() {
      return {
        first_name: "",
        last_name: "",
        DOB: "",
        SSN: "",
        accommodation: {
            name: "",
            description: "",
        },
        bunk: "",
        locker: "",
        laundry: "",
        add_res: "",
        notes: "",
        guestNotes: []
      };
    },
    methods: {
        handleSubmit() {
            console.log('first: ', this.first_name)
            console.log('last: ', this.last_name)
            console.log('DOB: ', this.DOB)
            console.log('SSN: ', this.SSN)
        },
        addNote() {
      if (this.notes.trim() !== "") {
        this.guestNotes.push(this.notes);
        this.notes = ""; // Clear the notes input field after adding the note
      }
    },
    }
  };
</script>
<style>
    form {
        max-width: 420px;
        margin: 30px auto;
        background: white;
        text-align: left;
        padding: 40px;
        border-radius: 10px;
    }
    .grid-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 15px;
    }
    label {
        color: #aaa;
        display: inline-block;
        margin: 25px 0 15px;
        font-size: 0.6em;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
    }
    input, select, textarea {
        display: block;
        padding: 10px 6px;
        width: 100%;
        box-sizing: border-box;
        border: 1px;
        border-bottom: 1px solid #ddd;
        color: #555;
    }
    button {
        background-color: blue;
        border: 0;
        padding: 10px 20px;
        margin-top: 20px;
        color: white;
        border-radius: 20px;
    }
    .submit {
        text-align: center;
    }
</style>