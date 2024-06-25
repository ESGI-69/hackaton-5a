<template>
  <ScoreTag :score="600" tag-size="sm"></ScoreTag>
  <br>
  <ScoreTag :score="400" tag-size="sm"></ScoreTag>
  <br>
  <ScoreTag :score="200" tag-size="sm"></ScoreTag>
  <br>
  <CustomButton text="Voir"></CustomButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ScoreTag from "@/components/ScoreTag.vue";
import CustomButton from "@/components/CustomButton.vue";

export default defineComponent({
  name: 'App',
  components: {
    ScoreTag,
    CustomButton
  }
});
</script>
