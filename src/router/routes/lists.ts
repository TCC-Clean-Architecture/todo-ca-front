import { type RouteRecordRaw } from 'vue-router';
import RoutesNames from '@/constants/routesNames';

export const listsRoutes: RouteRecordRaw = {
	path: '/lists',
	alias: '/',
	name: RoutesNames.lists,
	component: () => import('@/views/Lists/ListsView.vue'),
	meta: { requiresAuth: true },
	children: [
		{
			path: ':id',
			name: RoutesNames.list,
			component: () => import('@/views/Lists/ListView.vue'),
			meta: { requiresAuth: true },
		},
	],
};
