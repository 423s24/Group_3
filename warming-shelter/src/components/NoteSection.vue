<template>
  <div class="note-section">
    {{ NoteTitle }}
    <!-- make text area background color #FAFFBB -->

    <textarea
      v-model="note"
      placeholder="Add a note..."
      @keyup.enter="addNote"
      class="note-textarea"
    ></textarea>
    <button @click="addNote" class="bg-hrdc-green">Add</button>
    <div class="notes">
      <div v-for="(note, index) in notes" :key="index" class="note-item">
        <p>{{ note }}</p>
        <button @click="deleteNote(index)" class="bg-hrdc-blue">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      note: "",
      notes: [],
    };
  },
  props: {
    NoteTitle: {
      type: String,
      default: "Notes",
    },
  },
  methods: {
    addNote() {
      if (this.note) {
        this.notes.push(this.note);
        this.note = "";
      }
    },
    deleteNote(index) {
      this.notes.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.note-section {
  width: 49%; 
  margin: 0 0.5%; 
  padding: 1%;
  /* set border color to hrdc-teal */
  border: 2px solid #00796b;
  border-radius: 5px;
  display: inline-block; 
  box-sizing: border-box; 
}

.notes {
  max-height: 200px;
  overflow-y: auto;
}

.note-textarea {
  background-color: #FAFFBB; 
  border: solid 1px #00796b; 
}

.note-item {
  background-color: #FAFFBB; 
  margin-bottom: 5px; 
  padding: 5px; 
  border: solid 1px #00796b; 
}
</style>
