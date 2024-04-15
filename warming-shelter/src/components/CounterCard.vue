<template>
  <div class="w-1/3 p-4">
    <div class="bg-hrdc-blue text-white rounded-t-lg p-4 font-bold text-center">
      {{ title }}
    </div>
    <div class="bg-white rounded-b-lg p-4 border-2 border-hrdc-blue text-center">
      <div class="mb-2">{{ content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CounterCard',
  props: {
    title: String,
    content: String
  }
}
</script>
