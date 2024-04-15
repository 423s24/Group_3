<template>
  <div>
    <Header/>
    <br>
    <Wrapper>
      <div class="max-w-lg mx-auto">
        <form @submit.prevent="saveProfile" v-if="isEditing" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <!-- Input for Behavior Status -->
          <div class="mb-4">
            <label for="behaviorStatus" class="block text-gray-700 font-bold mb-2">Behavior Status</label>
            <select id="behaviorStatus" v-model="profile.behaviorStatus"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="warning">Warning</option>
              <option value="suspension">Suspension</option>
              <option value="noTrespass">No Trespass</option>
              <option value="probation">Probation</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="bxNotes" class="block text-gray-700 font-bold mb-2">Behavior Notes</label>
            <textarea id="bxNotes" v-model="profile.bx_bxNotes"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Behavior Notes"></textarea>
          </div>

          <!-- Input for First Name -->
          <div class="mb-4">
            <label for="firstName" class="block text-gray-700 font-bold mb-2">First Name:</label>
            <input id="firstName" v-model="profile.firstName"
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   type="text" placeholder="First Name">
          </div>

          <!-- Input for Last Name -->
          <div class="mb-4">
            <label for="lastName" class="block text-gray-700 font-bold mb-2">Last Name:</label>
            <input id="lastName" v-model="profile.lastName"
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   type="text" placeholder="Last Name">
          </div>

          <!-- Input for Date of Birth -->
          <div class="mb-4">
            <label for="dob" class="block text-gray-700 font-bold mb-2">Date of Birth:</label>
            <input id="dob" v-model="profile.dob"
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   type="text" placeholder="Date of Birth">
          </div>

          <!-- Display Locker Number -->
          <div class="mb-4">
            <label for="locker" class="block text-gray-700 font-bold mb-2">Locker Number</label>
            <input id="locker" v-model="profile.locker"
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   type="text">
          </div>

          <!-- Input for Consecutive Days Stayed -->
          <div class="mb-4">
            <label for="consecutiveDaysStayed" class="block text-gray-700 font-bold mb-2">Consecutive Days
              Stayed:</label>
            <input id="consecutiveDaysStayed" v-model="profile.consecutiveDaysStayed"
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   type="text" placeholder="Last Name">
          </div>

          <!-- Input for Laundry Service -->
          <div class="mb-4">
            <label for="laundry" class="block text-gray-700 font-bold mb-2">Laundry Service</label>
            <select id="laundry" v-model="profile.laundry"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <!-- Input for Reserved Bunk -->
          <div class="mb-4">
            <label for="bunkReservationNumber" class="block text-gray-700 font-bold mb-2">Reserved Bunk</label>
            <input id="bunkReservationNumber" v-model="profile.bunk_reservation_number"
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   type="text" placeholder="Reserved Bunk Number">
          </div>

          <!-- Input for Latest Check In Date -->
          <div class="mb-4">
            <label for="latestCheckInDate" class="block text-gray-700 font-bold mb-2">Latest Check In Date:</label>
            <input id="latestCheckInDate" v-model="profile.latestCheckInDate"
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   type="text" placeholder="Latest Check In Date">
          </div>

          <!-- Input for HMIS Status -->
          <div class="mb-4">
            <label for="hmisStatus" class="block text-gray-700 font-bold mb-2">HMIS Status</label>
            <select id="hmisStatus" v-model="profile.hmis_valid"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="true">Valid</option>
              <option value="false">Invalid</option>
            </select>
          </div>

          <!-- Input for HMIS Enter Date -->
          <div class="mb-4">
            <label for="hmusDate" class="block text-gray-700 font-bold mb-2">HMIS Enter Date</label>
            <input id="hmusDate" v-model="profile.hmus_date"
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   type="text" placeholder="HMIS Enter Date">
          </div>

          <!-- Checkbox for Reasonable Accommodation -->
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="accommodation">Reasonable Accommodation:</label>
            <input id="accommodation" type="checkbox" v-model="profile.has_accommodation" class="mr-2 leading-tight">
            <span class="text-gray-700 text-sm">Yes</span>
          </div>

          <!-- Textarea for Accommodation Description if applicable -->
          <div v-if="profile.has_accommodation" class="mb-4">
            <label for="descAccommodation" class="block text-gray-700 font-bold mb-2">Accommodation Description:</label>
            <textarea id="descAccommodation" v-model="profile.desc_accommodation"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Accommodation Description"></textarea>
          </div>

          <!-- Submit Button -->
          <button type="submit"
                  class="bg-hrdc-blue hover:bg-hrdc-darkblue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Save Profile
          </button>
        </form>

        <div v-else @dblclick="toggleEditMode"
             class="hover:cursor-pointer bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">

            <label class="block text-gray-700 font-bold mb-2">Behavior Status</label>
            <span class="text-gray-700">{{ behaviorStatus }}</span>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">First Name:</label>
            <span class="text-gray-700">{{ profile.firstName }}</span>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Last Name:</label>
            <span class="text-gray-700">{{ profile.lastName }}</span>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Date of Birth:</label>
            <span class="text-gray-700">{{ formatDate(profile.dob) }}</span>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Laundry Service</label>
            <span class="text-gray-700">{{ laundryService }}</span>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Reserved Bunk</label>
            <span class="text-gray-700">{{ profile.bunk_reservation_number }}</span>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Locker</label>
            <span class="text-gray-700">{{ profile.locker }}</span>
          </div>

          <div v-if="profile.has_accommodation" class="mb-4">
            <span class="text-hrdc-green font-bold">Reasonable Accommodation   </span>
            <br>
            <span class="text-gray-700">{{ profile.desc_accommodation }}</span>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Consecutive Days Stayed:</label>
            <span class="text-gray-700">{{ profile.consecutiveDaysStayed }}</span>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Latest Check In Date:</label>
            <span class="text-gray-700">{{ formatDate(profile.latestCheckInDate) }}</span>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">HMIS Status</label>
            <span class="text-gray-700">{{ hmisStatus }}</span>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">HMIS Enter Date</label>
            <span class="text-gray-700">{{ formatDate(profile.hmus_date) }}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Wrapper from '../components/Wrapper.vue'
import store from "../store/store.js"

export default {
  name: 'GuestProfile',
  components: {
    Header,
    Wrapper,
  },
  data() {
    return {
      profile: [],
      isEditing: false
    };
  },
  created() {
    const guestId = this.$route.params.id;

    store.dispatch("guestModule/viewProfile", {id: guestId})
        .then((data) => {
          this.profile = data.profile;
          console.log(this.profile);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
  },
  methods: {
    formatDate(dateString) {
      const options = {day: 'numeric', month: 'numeric', year: 'numeric'};
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options);
    },
    toggleEditMode() {
      this.isEditing = !this.isEditing;
    },
    saveProfile() {
      const guestId = this.$route.params.id;
      console.log("Profile before dispatch:", this.profile);
      store.dispatch("guestModule/updateProfile", {id: guestId, profile: this.profile})
          .then(() => {
            console.log("Profile updated successfully.");
            this.isEditing = false; // Exit edit mode after saving
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });
    },
  },
  computed: {
    behaviorStatus() {
      if (this.profile.bx_warning) {
        return 'Warning';
      } else if (this.profile.bx_suspension) {
        return 'Suspension';
      } else if (this.profile.bx_noTrespass) {
        return 'No Trespass';
      } else if (this.profile.bx_probation) {
        return 'Probation';
      } else {
        return ' ';
      }
    },
    laundryService() {
      return this.profile.laundry ? 'Yes' : 'No';
    },
    hmisStatus() {
      return this.profile.hmis_valid ? 'Valid' : 'Invalid';
    }
  },
}

</script>
