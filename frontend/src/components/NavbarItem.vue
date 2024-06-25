<template>
  <div :class="containerClass">
    <a v-for="item in items" :key="item.name" :href="item.href" class="text-grey-500 hover:text-orange-500 transition duration-300 ease-in-out">
      {{ item.name }}
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'NavbarItem',
  props: {
    items: {
      type: Array,
      required: true
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const containerClass = computed(() => {
      return props.inline ? 'flex space-x-8' : 'space-y-2';
    });

    return {
      containerClass
    };
  }
});
</script>
