import { type RouteRecordRaw } from 'vue-router';
import { listsRoutes } from './lists';

const auxRoutes: RouteRecordRaw[] = [
	{
		path: '/:pathMatch(.*)*',
		redirect: '/',
	},
];

const constantRoutes: RouteRecordRaw[] = [];

export default [...auxRoutes, ...constantRoutes, listsRoutes];
