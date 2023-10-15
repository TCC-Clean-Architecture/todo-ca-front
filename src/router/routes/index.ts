import { type RouteRecordRaw } from 'vue-router';

import dashboardRoutes from './dashboard';

const auxRoutes: RouteRecordRaw[] = [
	{
		path: '/:pathMatch(.*)*',
		redirect: '/',
	},
];

const constantRoutes: RouteRecordRaw[] = [];

export default [...auxRoutes, ...constantRoutes, dashboardRoutes];
