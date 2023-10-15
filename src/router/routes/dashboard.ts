import { type RouteRecordRaw } from 'vue-router';
import RoutesNames from '@/constants/routesNames';

const dashboardRoutes: RouteRecordRaw = {
	path: '/lists',
	alias: '/',
	name: RoutesNames.lists,
	component: () => import('@/views/Lists/ListsView.vue'),
	children: [
		{
			path: ':id',
			name: RoutesNames.list,
			component: () => import('@/views/Lists/ListView.vue'),
		},
	],
};

export default dashboardRoutes;
