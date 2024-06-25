<template>
  <tr>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <div class="flex items-center">
        <div class="flex-shrink-0 w-10 h-10">
          <img
            class="w-full h-full rounded-full"
            :src="patientPicture"
            alt="Patient picture"
          />
        </div>
        <div class="ml-3">
          <p class="text-gray-900 whitespace-no-wrap">
            {{ patientName }}
          </p>
        </div>
      </div>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <p class="text-gray-600 whitespace-no-wrap">
        {{ alertDate }}
      </p>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm w-4/12">
      <p class="text-gray-600 whitespace-no-wrap">
        {{ alertReason }}
      </p>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <ScoreTag :score="score" />
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
      <CustomButton text="Voir" />
    </td>
  </tr>
</template>
<script setup lang="ts">
import ScoreTag from '@/components/ScoreTag.vue';
import CustomButton from '@/components/CustomButton.vue';

defineProps<{
  patientPicture: string;
  patientName: string;
  alertDate: string;
  alertReason: string;
  score: number;
}>();
</script>
