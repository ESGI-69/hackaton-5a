<template>
  <div class="flex flex-col space-y-4 p-4 bg-white rounded-lg mt-4 overflow-auto">
    <div v-for="message in messages" :key="message.id" class="flex"
      :class="{ 'justify-end': message.origin === 'PATIENT', 'justify-start': message.origin !== 'PATIENT' }">
      <div :class="messageClasses(message)" class="max-w-2/3 p-3 rounded-lg">
        <span v-if="message.origin === 'DOCTOR' || message.origin === 'SYSTEM'" class="font-semibold mr-2">
          {{ message.origin }}:
        </span>
        {{ message.text }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Message {
  id: number;
  origin: 'SYSTEM' | 'DOCTOR' | 'PATIENT';
  text: string;
}

defineProps<{
  messages: Array<Message>;
}>();

const messageClasses = (message: Message) => {
  let baseClasses = 'rounded-lg shadow ';
  if (message.origin === 'PATIENT') {
    baseClasses += 'bg-gray-100 text-right';
  } else {
    switch (message.origin) {
      case 'SYSTEM':
        baseClasses += 'bg-purple-500 text-white';
        break;
      case 'DOCTOR':
        baseClasses += 'bg-blue-500 text-white';
        break;
      default:
        baseClasses += 'bg-gray-300 text-gray-800';
    }
  }
  return baseClasses;
};
</script>