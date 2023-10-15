import { createRouter, createWebHistory } from 'vue-router';

import routes from './routes';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
	linkActiveClass: 'link--active',
	linkExactActiveClass: 'link--exact-active',
});

export default router;
