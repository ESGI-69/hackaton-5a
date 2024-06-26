import { useAuthStore } from '@/stores/authStore';
import AlertDetailsView from '@/views/AlertDetailsView.vue';
import AlertsView from '@/views/AlertsView.vue';
import AppointmentsView from '@/views/AppointmentsView.vue';
import ComponentsView from '@/views/ComponentsView.vue';
import DashboardView from '@/views/DashboardView.vue';
import LoginView from '@/views/LoginView.vue';
import PatientsView from '@/views/PatientsView.vue';
import ProfessionnalsView from '@/views/ProfessionnalsView.vue';
import RegisterView from '@/views/RegisterView.vue';
import TestMessageView from '@/views/TestMessageView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/alerts',
      name: 'alerts',
      component: AlertsView,
    },
    {
      path: '/alerts/:id',
      name: 'alert',
      component: AlertDetailsView,
    },
    {
      path: '/appointments',
      name: 'appointments',
      component: AppointmentsView,
    },
    {
      path: '/professionnals',
      name: 'professionnals',
      component: ProfessionnalsView,
    },
    {
      path: '/patients',
      name: 'patients',
      component: PatientsView,
    },
    {
      path: '/components',
      name: 'components',
      component: ComponentsView,
      meta: {
        authNotRequired: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        authNotRequired: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        authNotRequired: true,
      },
    },
    {
      path: '/test-message',
      name: 'test-message',
      component: TestMessageView,
      meta: {
        authNotRequired: true,
      },
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (!to.meta.authNotRequired && !authStore.isLogged) {
    router.push({ name: 'login' });
  }
  if ((to.name === 'login' || to.name === 'register') && authStore.isLogged) {
    router.push({ name: 'dashboard' });
  }
});

export default router;
