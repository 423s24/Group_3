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
        <div class="timestamp">{{ getFormattedDate(note.timestamp) }}</div>
        <p>{{ note.text }}</p> 
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
        this.notes.push({ text: this.note, timestamp: new Date() });
        this.note = "";
      }
    },
    deleteNote(index) {
      this.notes.splice(index, 1);
    },
    getFormattedDate(timestamp) {
      const date = new Date(timestamp);
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${month}/${day} ${hours}:${minutes}`;
    }
  },
};
</script>

<style scoped>
.note-section {
  width: 49%; 
  margin: 0 0.5%; 
  padding: 1%;
  border: 2px solid #00796b;
  border-radius: 5px;
  display: inline-block; 
  box-sizing: border-box; 
  vertical-align: top;
}

.notes {
  max-height: 200px;
  overflow-y: auto;
}

.note-textarea {
  background-color: #FAFFBB; 
  border: solid 1px #00796b; 
  border-radius: 5px;
  vertical-align: top;
}

.note-item {
  background-color: #FAFFBB; 
  margin-bottom: 5px; 
  padding: 30px; 
  border: solid 1px #00796b; 
  position: relative; 
}

.timestamp {
  position: absolute;
  top: 0px; 
  left: 0px; 
  width: 150px;
  height: 25px;
  background-color: #00796b;
  border-radius: 3px;
  color: white;
  font-size: 12px;
  text-align: center;
  line-height: 25px;
}
</style>
