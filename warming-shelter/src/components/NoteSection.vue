<!-- creates a section on the dashboard where the user can add notes, takes up 48% of the space  -->

<template>
  <div class="note-section">
    <!-- title to be filled in later -->
    {{ NoteTitle }}
    <textarea
      v-model="note"
      placeholder="Add a note..."
      @keyup.enter="addNote"
    ></textarea>
    <button @click="addNote" class="bg-blue-400">Add</button>
    <div class="notes">
      <div v-for="(note, index) in notes" :key="index">
        <p>{{ note }}</p>
        <button @click="deleteNote(index)">Delete</button>
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
<style>
/* note sections side by side  */


.note-section {
  width: 48%;
  margin: 0 1%;
  padding: 1%;
  border: 1px solid #ccc;
  border-radius: 5px;
}
/* make the notes section scrollable */
.notes {
  max-height: 200px;
  overflow-y: auto;
}
</style>