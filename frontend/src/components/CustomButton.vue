<template>
  <button class="px-4 py-1 bg-orange-500 hover:bg-orange-600 text-sm text-white rounded-[4px] transition duration-300 ease-in-out">{{ text }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CustomButton',
  props: {
    text: {
      type: String,
      required: true
    }
  },
});
</script>
