import { inject, type App, type InjectionKey } from 'vue';
import { useModalsState } from '@/composables/modalsState';
import type { IModalsPlugin } from '@/interfaces';

const injectionKey: InjectionKey<IModalsPlugin> = Symbol('routesNames');

export const useModals = () => inject(injectionKey)!;

const modalInstance: IModalsPlugin = {
	show(modalName) {
		const modalsState = useModalsState();
		modalsState.open(modalName);
	},
	hide(modalName) {
		const modalsState = useModalsState();
		modalsState.close(modalName);
	},
	toggle(modalName) {
		const modalsState = useModalsState();
		modalsState.toggle(modalName);
	},
	status(modalName) {
		const modalsState = useModalsState();
		return modalsState.get(modalName);
	},
};

export const modalsPlugin = {
	install(app: App<Element>) {
		app.provide(injectionKey, modalInstance);
		app.config.globalProperties.$modals = modalInstance;
	},
};
