<template>
<!--  Modal for creating a new user-->
  <Modal v-if="isModalVisible" :modalTitle="'New User'" @close="hideModal">
    <div class="border-t border-gray-200 rounded-b">
      <form id="new-user-form" @submit.prevent>
        <div class="grid md:grid-cols-2 gap-2">
          <div>
            <p>First Name</p>
            <input type="text" id="firstName" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
          </div>
          <div>
            <p>Last Name</p>
            <input type="text" id="lastName" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
          </div>

          <div class="md:col-span-3 md:grid md:grid-cols-3 gap-2">
            <div>
              <p>Username</p>
              <input type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
            </div>
            <div>
              <p>Password</p>
              <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
            </div>
            <div>
              <p>Role</p>
              <select name="userRole" id="userRole" class="w-full">
                <option value="standard_user" selected>User</option>
                <option value="system_administrator">Administrator</option>
              </select>
            </div>
          </div>
        </div>

        <button class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Create</button>
        <button class="bg-gray-400 text-white py-2 px-4 rounded-md ml-1 hover:bg-gray-500" @click="hideModal">
          Cancel
        </button>
      </form>
    </div>
  </Modal>
<!--  End modal-->


  <div>
    <Header/>
    <br/>
    <Wrapper>
      <div class="flex flex-row justify-center">
        <div class="w-2/3 p-4 m-4">
          <div class="w-full m-1 p-4">
            <h1>User Management</h1>
            <form class="w-full p-0 m-0">
              <label for="userSearch">Search User</label>
              <input
                  class="w-full"
                  type="text"
                  id="userSearch"
              />
            </form>
          </div>

          <div class="bg-white p-4 m-3 w-full">
            <p class="text-2xl text-bg-blue-900">All Users</p>
            <table class="w-full border-2 border-bg-blue-900">
              <thead class="bg-hrdc-blue">
              <tr>
                <th class="text-left p-3 text-white">First Name</th>
                <th class="text-left p-3 text-white">Last Name</th>
                <th class="text-left p-3 text-white"></th>
                <th class="text-left p-3 text-white"></th>
                <th class="text-left p-3 text-white"></th>
              </tr>
              </thead>
              <tbody class="rounded">
              <tr class="border-b-2 border-bg-blue-900 h-14">
                <td class="px-3">Jane</td>
                <td class="px-3">Doe</td>
              </tr>
              </tbody>
            </table>
          </div>

        </div>
        <div class="w-1/3 p-4 flex flex-col justify-start">
          <div class="mb-4">
            <button class="bg-hrdc-green text-white py-2 px-4 rounded-md hover:bg-hrdc-teal" @click="showModal">New
              User
            </button>
          </div>

          <div class="bg-white rounded-lg p-4 border-2 border-bg-blue-900 w-full">
            <p class="font-semibold mb-4">Selected User</p>
            <div class="flex items-center mb-2">
              <button class="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
                      @click="isEditingSelectedUser = true">Edit
              </button>
            </div>
            <form @submit.prevent>
              <div class="flex items-center mb-2">
                <label for="selectedUserFirstName" class="w-1/3 text-right mr-3">First Name</label>
                <input type="text" id="selectedUserFirstName" value="Jane"
                       class="border-2 border-gray-300 rounded w-2/3 p-2" :disabled="!isEditingSelectedUser">
              </div>
              <div class="flex items-center mb-2">
                <label for="selectedUserLastName" class="w-1/3 text-right mr-3">Last Name</label>
                <input type="text" id="selectedUserLastName" value="Doe"
                       class="border-2 border-gray-300 rounded w-2/3 p-2" :disabled="!isEditingSelectedUser">
              </div>
              <div class="flex items-center mb-2">
                <label for="selectedUserUsername" class="w-1/3 text-right mr-3">Username</label>
                <input type="text" id="selectedUserUsername" value="JDoe"
                       class="border-2 border-gray-300 rounded w-2/3 p-2" :disabled="!isEditingSelectedUser">
              </div>
              <div class="flex items-center mb-2">
                <label for="selectedUserRole" class="w-1/3 text-right mr-3">Role</label>
                <select name="userRole" id="selectedUserRole" class="border-2 border-gray-300 rounded w-2/3 p-2"
                        :disabled="!isEditingSelectedUser">
                  <option value="user">User</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              <div class="flex items-center mb-2 justify-center">
                <button v-if="isEditingSelectedUser"
                        class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                  Save Changes
                </button>
                <button v-if="isEditingSelectedUser"
                        class="bg-gray-400 text-white py-2 px-4 rounded-md ml-1 hover:bg-gray-500"
                        @click="isEditingSelectedUser = false">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import Wrapper from "../components/Wrapper.vue";
import Header from "../components/Header.vue";
import Modal from "../components/Modal.vue";

export default defineComponent({
  components: {Wrapper, Header, Modal},
  data() {
    return {
      isEditingSelectedUser: false,
      isModalVisible: false,
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    }
  }
})
</script>