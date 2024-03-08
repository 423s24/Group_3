<template>
    <div class="w-1/3 p-4">
      <div class="bg-blue-900 text-white rounded-t-lg p-4">
        {{ title }}
      </div>
      <div class="bg-white rounded-b-lg p-4  border-2 border-bg-blue-900">
        {{ content }}
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
  