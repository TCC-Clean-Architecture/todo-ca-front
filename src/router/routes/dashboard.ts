import { type RouteRecordRaw } from 'vue-router';
import RoutesNames from '@/constants/routesNames';

const dashboardRoutes: RouteRecordRaw = {
	path: '/dashboard',
	alias: '/',
	name: RoutesNames.home,
	component: () => import('@/views/HomeView.vue'),
};

export default dashboardRoutes;
