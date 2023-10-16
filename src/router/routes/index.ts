import { type RouteRecordRaw } from 'vue-router';
import { registerRoutes } from './register';
import { loginRoutes } from './login';
import { listsRoutes } from './lists';

const auxRoutes: RouteRecordRaw[] = [
	{
		path: '/:pathMatch(.*)*',
		redirect: '/',
	},
];

export default [...auxRoutes, registerRoutes, loginRoutes, listsRoutes];
