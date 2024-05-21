// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/LandingPage.vue';
import Agents from '../components/Agents.vue';
import Weapons from '../components/Weapons.vue';
import Maps from '../components/Maps.vue';
import Gamemodes from '../components/Gamemodes.vue';
import AgentDetails from '../components/AgentDetails.vue';

const routes = [
  { path: '/', component: LandingPage }, // Landing page as the default route
  { path: '/agents', component: Agents },
  { path: '/weapons', component: Weapons },
  { path: '/maps', component: Maps },
  { path: '/gamemodes', component: Gamemodes },
  { path: '/agent/:agentUUID', component: AgentDetails, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
