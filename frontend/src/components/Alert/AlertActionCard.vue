<template>
  <div class="card mb-2 flex items-center">
    <div class="bg-secondary-50 rounded-full mr-6">
      <component
        :is="iconComponent"
        class="w-8 h-8 m-2 text-secondary-500"
      />
    </div>
    <div>
      <div class="text-xl text-contrast-500 pb-2">{{ title }}</div>
      <div class="flex pb-4">
        <div class="flex items-center mr-8">
          <CalendarDaysIcon class="w-5 h-5 mr-2 text-secondary-500" />
          <p class="text-grey-500 text-sm">{{ date.toLocaleDateString() }}</p>
        </div>
        <div class="flex items-center">
          <ClockIcon class="w-4 h-4 mr-2 text-secondary-500" />
          <p class="text-grey-500 text-sm">
            {{
              date
                .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                .replace(':', 'h')
            }}
          </p>
        </div>
      </div>
      <p
        v-if="props.comment"
        class="text-grey-300 text-sm"
      >
        {{ props.comment }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import {
  UserIcon,
  ChatBubbleLeftEllipsisIcon,
  CheckCircleIcon,
  ClockIcon,
  CalendarDaysIcon,
  PhoneIcon,
} from '@heroicons/vue/24/outline';

const props = defineProps<{
  cardType: 'MESSAGE' | 'CALL' | 'ASSIGNMENT' | 'CLOSED';
  date: Date;
  comment?: string;
}>();

const iconComponent = computed(() => {
  switch (props.cardType) {
    case 'MESSAGE':
      return ChatBubbleLeftEllipsisIcon;
    case 'CALL':
      return PhoneIcon;
    case 'ASSIGNMENT':
      return UserIcon;
    case 'CLOSED':
      return CheckCircleIcon;
    default:
      return null;
  }
});

const title = computed(() => {
  switch (props.cardType) {
    case 'MESSAGE':
      return 'SMS envoyé au patient';
    case 'CALL':
      return 'Appel passé au patient';
    case 'ASSIGNMENT':
      return 'Changement de responsable';
    case 'CLOSED':
      return 'Alerte clôturée';
    default:
      return null;
  }
});
</script>
