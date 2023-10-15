import { type RouteRecordRaw } from 'vue-router';
import RoutesNames from '@/constants/routesNames';

export const registerRoutes: RouteRecordRaw = {
	path: '/register',
	name: RoutesNames.register,
	redirect: () => ({ name: RoutesNames.registerAccount }),
	component: () => import('@/views/Register/RegisterView.vue'),
	meta: { requiresAuth: false },
	children: [
		{
			path: 'account',
			name: RoutesNames.registerAccount,
			component: () => import('@/views/Register/AccountView.vue'),
			meta: { requiresAuth: false },
		},
		{
			path: 'confirm',
			name: RoutesNames.registerConfirm,
			beforeEnter: (to, from, next) => {
				if (to.query.check === 'true') return next();
				else next('/login');
			},
			component: () => import('@/views/Register/ConfirmView.vue'),
			meta: { requiresAuth: false },
		},
	],
};
