import { inject, type App, type InjectionKey } from 'vue';
import { useEventBus, type EventBusKey } from '@vueuse/core';

type BusKey = EventBusKey<{ event: 'hide' | 'show'; props?: unknown }>;
interface ModalFunctions {
	show: (modalName: BusKey) => void;
	hide: (modalName: BusKey) => void;
}

const injectionKey: InjectionKey<ModalFunctions> = Symbol('modal');

export const useModal = () => inject(injectionKey)!;

const modalInstance: ModalFunctions = {
	show(modalName) {
		const modalBus = useEventBus(modalName);
		modalBus.emit({ event: 'show' });
	},
	hide(modalName) {
		const modalBus = useEventBus(modalName);
		modalBus.emit({ event: 'hide' });
	},
};

export const modalPlugin = {
	install(app: App<Element>) {
		app.provide(injectionKey, modalInstance);
		app.config.globalProperties.$modal = modalInstance;
	},
};
