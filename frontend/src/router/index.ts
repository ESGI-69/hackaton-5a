import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DashboardView from "@/views/DashboardView.vue";
import AlertsView from "@/views/AlertsView.vue";
import AppointmentsView from "@/views/AppointmentsView.vue";
import ProfessionnalsView from "@/views/ProfessionnalsView.vue";
import PatientsView from "@/views/PatientsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/alerts',
      name: 'alerts',
      component: AlertsView,
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
      component: () => import('../views/ComponentsView.vue'),
    }
  ],
});

export default router;
