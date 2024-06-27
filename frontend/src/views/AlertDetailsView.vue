<template>
  <div class="p-4 sm:px-8 flex flex-grow h-full overflow-y-hidden">
    <div class="w-9/12 pr-12 flex flex-col overflow-y-auto">
      <div class="flex">
        <div class="w-3/12">
          <div class="pulsating-circle-container">
            <div class="pulsating-circle">
              <div class="circle-text">
                <div class="font-bold">Score</div>
                <div class="text-4xl font-bold">
                  {{ alertStore.alert.score }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-9/12">
          <div class="card p-0 flex">
            <div class="p-4 w-6/12 border border-grey-100">
              <h2 class="pb-4 text-contrast-500 text-lg font-bold">
                Ouverture de l'alerte
              </h2>
              <div class="flex items-center mb-2">
                <CalendarDaysIcon class="w-5 h-5 mr-2 text-secondary-500" />
                <p class="text-grey-300">
                  {{
                    new Date(alertStore.alert.createdAt).toLocaleDateString()
                  }}
                </p>
              </div>
              <div class="flex items-center">
                <ClockIcon class="w-5 h-5 mr-2 text-secondary-500" />
                <p class="text-grey-300">
                  {{
                    new Date(alertStore.alert.createdAt).toLocaleTimeString()
                  }}
                </p>
              </div>
            </div>
            <div class="p-4 w-6/12 max-h-1/5 overflow-y-auto">
              <h2 class="pb-4 text-contrast-500 text-lg font-bold">
                Raison de l'alerte
              </h2>
              <!-- <ul class="mb-2">
                <li
                  v-for="reason in alertStore.alert.reasons"
                  :key="reason"
                >
                  {{ reason }}
                </li>
              </ul> -->
              <p class="text-sm text-grey-300">
                {{ alertStore.alert.summary }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-12 flex flex-col flex-grow">
        <div
          class="pb-4 mb-4 border-b border-gray-300 text-grey-500 text-lg font-bold"
        >
          Actions prises ({{ alertStore.alert.actions?.length || 0 }})
        </div>
        <div class="h-fit overflow-y-auto">
          <template v-if="alertStore.alert.actions?.length > 0">
            <AlertActionCard
              v-for="action in alertStore.alert.actions"
              :key="action.id"
              :date="new Date(action.createdAt)"
              :card-type="action.type"
              :comment="action.comment"
            />
          </template>
          <span v-else>Aucune action prise</span>
        </div>
      </div>
    </div>
    <div class="w-3/12 flex flex-col justify-between">
      <div class="card text-center">
        <p class="text-contrast-500 text-lg font-bold mb-4">
          {{ alertStore.alert.patient?.name }}
        </p>
        <div class="flex justify-around text-grey-300">
          <p>
            {{ alertStore.alert.patient?.gender == 'male' ? 'Homme' : 'Femme' }}
          </p>
          <p>
            {{
              new Date(alertStore.alert.patient?.birthDate).toLocaleDateString()
            }}
          </p>
          <p>{{ alertStore.alert.patient?.phone }}</p>
        </div>
      </div>
      <div class="card">
        <div class="flex items-center">
          <div class="bg-secondary-50 rounded-full mr-6">
            <UserIcon class="w-8 h-8 m-2 text-secondary-500" />
          </div>
          <p class="text-contrast-500 pb-4 text-lg font-bold">Responsable</p>
        </div>
        <div
          class="flex pb-4"
          v-if="alertStore.alert.responsible"
        >
          <div class="bg-white rounded-full mr-6">
            <UserIcon class="w-8 h-4 m-2 text-white" />
          </div>
          <p class="text-grey-300">
            {{
              alertStore.alert.responsible?.name ||
              alertStore.alert.responsible?.username
            }}
          </p>
        </div>
        <div
          class="flex pb-4 items-center"
          v-else
        >
          <div class="bg-white rounded-full mr-6">
            <UserIcon class="w-8 h-4 m-2 text-white" />
          </div>
          <p class="text-grey-300">Aucun responsable</p>
        </div>
        <CustomButton
          text="Assigner un responsable"
          class="w-full"
        />
      </div>
      <div class="card">
        <div
          class="pb-2 mb-4 border-b border-gray-300 text-grey-500 text-lg font-bold"
        >
          Actions
        </div>
        <AlertActionButton
          :icon="ChatBubbleLeftEllipsisIcon"
          text="Envoyer un SMS"
          @click="isMessageModalOpen = true"
        />
        <AlertActionButton
          :icon="PhoneIcon"
          text="Appel"
          @click="isCallModalOpen = true"
        />
        <AlertActionButton
          :icon="ChatBubbleLeftRightIcon"
          text="Voir les messages"
          @click="isChatMessagesModalOpen = true"
        />
        <AlertActionButton
          v-if="alertStore.alert.responsible"
          :icon="UserIcon"
          text="Changer de responsable"
        />
        <AlertActionButton
          v-if="!alertStore.alert.handledAt"
          :icon="CheckCircleIcon"
          text="Clôturer l'alerte"
          @click="isCloseModalOpen = true"
        />
      </div>
    </div>
  </div>

  <AlertModal
    :isOpen="isCloseModalOpen"
    title="Fermer l'alerte"
    @close="isCloseModalOpen = false"
    @confirm="closeAlert"
    btn-text="Fermer l'alerte"
  >
    <p>Voulez-vous ajouter un message résumant la résolution de l'alerte ?</p>
    <textarea
      rows="5"
      placeholder="Commentaire"
      v-model="closeComment"
    />
  </AlertModal>

  <AlertModal
    :isOpen="isMessageModalOpen"
    title="Envoyer un SMS"
    @close="isMessageModalOpen = false"
    @confirm="sendMessage"
    btn-text="Envoyer le message"
  >
    <textarea
      rows="5"
      placeholder="Saisissez le contenu de votre message."
      v-model="messageComment"
    />
  </AlertModal>

  <AlertModal
    :isOpen="isCallModalOpen"
    title="Passer un appel"
    @close="isCallModalOpen = false"
    @confirm="isCallModalOpen = false"
    btn-text="Envoyer l'appel"
  >
    <textarea
      rows="5"
      placeholder="Saisissez le contenu énoncé à votre patient."
      v-model="callComment"
    />
  </AlertModal>

  <AlertModal
    :isOpen="isCallModalOpen"
    title="Passer un appel"
    @close="isCallModalOpen = false"
    @confirm="isCallModalOpen = false"
    btn-text="Envoyer l'appel"
  >
    <textarea
      rows="5"
      placeholder="Saisissez le contenu énoncé à votre patient."
      v-model="callComment"
    />
  </AlertModal>

  <AlertModal
    :isOpen="isResponsibleModalOpen"
    title="Assigner un responsable"
    @close="isResponsibleModalOpen = false"
    @confirm="isResponsibleModalOpen = false"
    btn-text="Confirmer"
  >
  </AlertModal>

  <AlertModal
    :isOpen="isChatMessagesModalOpen"
    title="Conversation avec le patient"
    @close="isChatMessagesModalOpen = false"
    @confirm="isChatMessagesModalOpen = false"
    btn-text="Fermer"
  >
    <ChatMessages :messages="alertStore.alert.conversation.messages" />
  </AlertModal>
</template>

<script setup lang="ts">
import { useAlertStore } from '@/stores/alertStore';
import {
  UserIcon,
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  PhoneIcon,
  ClockIcon,
  CalendarDaysIcon,
} from '@heroicons/vue/24/outline';
import AlertActionCard from '@/components/Alert/AlertActionCard.vue';
import AlertActionButton from '@/components/Alert/AlertActionButton.vue';
import CustomButton from '@/components/CustomButton.vue';
import { useRoute, useRouter } from 'vue-router';
import AlertModal from '@/components/Alert/AlertModal.vue';
import ChatMessages from '@/components/ChatMessages.vue';
import { ref } from 'vue';

const route = useRoute();

const alertStore = useAlertStore();
if (route.params.id && typeof route.params.id === 'string') {
  alertStore.getAlert(route.params.id);
}

const isCloseModalOpen = ref(false);
const isMessageModalOpen = ref(false);
const isResponsibleModalOpen = ref(false);
const isCallModalOpen = ref(false);
const isChatMessagesModalOpen = ref(false);
const closeComment = ref('');
const messageComment = ref('');
const callComment = ref('');

const closeAlert = async () => {
  await alertStore.close(alertStore.alert.id, closeComment.value);
  isCloseModalOpen.value = false;
  await alertStore.getAlert(alertStore.alert.id.toString());
};

const sendMessage = async () => {
  isMessageModalOpen.value = false;
};
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
