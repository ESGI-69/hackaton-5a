<template>
  <div
    :class="bgColorClass"
    class="flex items-center space-x-2 w-fit px-2 py-1 rounded-full"
  >
    <div
      :class="circleColorClass"
      class="w-[12px] h-[12px] rounded-full"
    >
      &nbsp;
    </div>
    <span
      :class="textColorClass"
      class="text-sm font-bold"
      >{{ score }}</span
    >
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  score: number;
}>();

const bgColorClass = computed(() => {
  if (props.score >= 600) return 'bg-raspberry-50';
  if (props.score >= 400) return 'bg-orange-50';
  return 'bg-lemon-50';
});

const circleColorClass = computed(() => {
  if (props.score >= 600) return 'bg-raspberry-500';
  if (props.score >= 400) return 'bg-orange-500';
  return 'bg-lemon-500';
});

const textColorClass = computed(() => {
  if (props.score >= 600) return 'text-raspberry-500';
  if (props.score >= 400) return 'text-orange-500';
  return 'text-lemon-500';
});
</script>
