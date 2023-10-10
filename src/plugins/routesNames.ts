import { inject, type App, type InjectionKey } from 'vue';
import RoutesNames from '@/constants/routesNames';
import { type IRoutesNames } from '@/interfaces/routes';

const injectionKey = Symbol('routesNames') as InjectionKey<IRoutesNames>;

export const useRoutesNames = () => inject(injectionKey)!;

export const routesNamesPlugin = {
	install(app: App<Element>) {
		app.provide(injectionKey, RoutesNames);
		app.config.globalProperties.$routesNames = RoutesNames;
	},
};
