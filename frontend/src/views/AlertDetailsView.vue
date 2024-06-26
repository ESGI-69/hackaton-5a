<template>
  <div class="p-4 sm:px-8 flex h-[90vh]">
    <div class="w-9/12 pr-12 flex flex-col">
      <div class="flex">
        <div class="w-3/12">
          <div class="pulsating-circle-container">
            <div class="pulsating-circle">
              <div class="circle-text">
                <div class="font-bold">Score</div>
                <div class="text-4xl font-bold">4</div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-9/12">
          <div class="card p-0 flex">
            <div class="p-4 w-6/12 border border-grey-100">
              <h2 class="pb-2">Ouverture de l'alerte</h2>
              <p>Mardi 25 Juin 2024</p>
              <p>15h00</p>
            </div>
            <div class="p-4 w-6/12 max-h-1/5 overflow-y-auto">
              <h2 class="pb-2">Raisons de l'alerte</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam, dolorum error excepturi nam perferendis quam saepe sint
                velit!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-12 flex flex-col">
        <div class="pb-4 mb-4 border-b border-gray-300">Actions prises (3)</div>
        <div class="overflow-y-auto">
          <div class="card mb-2">Action 2</div>
          <div class="card mb-2">Action 3</div>
          <div class="card mb-2">Action 4</div>
          <div class="card mb-2">Action 5</div>
          <div class="card mb-2">Action 6</div>
          <div class="card mb-2 flex align-middle">
            <div class="bg-secondary-50 rounded-full mr-6">
              <UserIcon class="w-8 h-8 m-2 text-secondary-500" />
            </div>
            <div>
              <div>Assignation d'un responsable : Martin DUPUIS</div>
              <div class="flex">
                <div class="flex mr-8">
                  <CalendarDaysIcon class="w-6 h-6 mr-2" />
                  <p>Mercredi 26 Juin 2024</p>
                </div>
                <div class="flex">
                  <ClockIcon class="w-6 h-6 mr-2" />
                  <p>10h00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-3/12 flex flex-col justify-between">
      <div class="card text-center">
        <p>John DOE</p>
        <div class="flex justify-evenly">
          <p>M</p>
          <p>84 ans</p>
        </div>
        <p>06.02.83.66.29</p>
      </div>
      <div class="card">
        <div class="flex">
          <UserIcon class="w-6 h-6 mr-4" />
          <p>Responsable</p>
        </div>
        <div class="flex">
          <UserIcon class="w-6 h-6 mr-4 text-white" />
          <p>Dr. Jean DUPONT</p>
        </div>
      </div>
      <div class="card">
        <div class="pb-2 mb-4 border-b border-gray-300">Actions</div>
        <AlertActionButton
          :icon="ChatBubbleLeftEllipsisIcon"
          text="Envoyer un SMS"
        />
        <AlertActionButton
          :icon="ChatBubbleLeftRightIcon"
          text="Voir les messages"
        />
        <AlertActionButton
          :icon="UserIcon"
          text="Changer de responsable"
        />
        <AlertActionButton
          :icon="CheckCircleIcon"
          text="Clôturer l'alerte"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  UserIcon,
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClockIcon,
  CalendarDaysIcon,
} from '@heroicons/vue/24/outline';
import AlertActionButton from '@/components/Alert/AlertActionButton.vue';
</script>

<style scoped>
.pulsating-circle-container {
  position: relative;
  width: 100%;
  height: 134px;
}

.pulsating-circle {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
}

.pulsating-circle::before {
  content: '';
  position: absolute;
  display: block;
  width: 130%;
  height: 130%;
  box-sizing: border-box;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: #a09ae1;
  animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

.pulsating-circle::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.06);
  animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
}

.circle-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 0.67em;
  color: #a09ae1;
  z-index: 1;
}

.reasons-alert {
  max-height: 20vh;
  overflow-y: auto;
}

@keyframes pulse-ring {
  0% {
    transform: translate(-50%, -50%) scale(0.33);
  }
  80%,
  100% {
    opacity: 0;
  }
}

@keyframes pulse-dot {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.8);
  }
}
</style>
