import { type RouteRecordRaw } from 'vue-router';
import RoutesNames from '@/constants/routesNames';

export const loginRoutes: RouteRecordRaw = {
	path: '/login',
	name: RoutesNames.login,
	component: () => import('@/views/LoginView.vue'),
	meta: { requiresAuth: false },
};
