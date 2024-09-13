import { createRouter, createWebHistory } from 'vue-router';
import ItemsList from '@/components/ItemsList.vue'; 
import CheckoutPage from '@/components/CheckoutPage.vue'; 

const routes = [
  { path: '/', name: 'items-list', component: ItemsList },
  { path: '/checkout', name: 'checkout', component: CheckoutPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
