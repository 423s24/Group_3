<template>
  <!-- Main modal -->
  <div class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
    <div class="relative p-4 w-full max-w-2xl h-[500px] bg-white rounded-lg shadow-lg">

      <!-- Modal content -->
      <div class="relative">

        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 rounded-t">
          <h3 class="text-xl font-semibold text-gray-900">
            {{ modalTitle }}
          </h3>
          <button type="button"
                  class="bg-hrdc-green text-white py-2 px-4 rounded-md hover:bg-hrdc-teal"
                  @click="$emit('close')">
            Close
          </button>
        </div>

        <!-- Modal body -->
        <div class="p-4 md:p-5">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    modalTitle: {
      type: String,
      required: true
    }
  }
}
</script>