import { ref, computed } from 'vue';
import type { ModalKey, ModalsState } from '@/interfaces';

export const useModal = (name?: ModalKey, state?: ModalsState) => {
	if (state && name) {
		if (!state.has(name)) state.set(name);

		const status = computed({
			get: () => state.get(name),
			set: (newValue) => state.set(name, newValue),
		});

		const open = () => state.open(name);
		const close = () => state.close(name);
		const toggle = () => state.toggle(name);

		return { status, open, close, toggle };
	}

	const status = ref(false);

	const open = () => {
		status.value = true;
	};

	const close = () => {
		status.value = false;
	};

	const toggle = () => {
		if (status.value) close();
		else open();
	};

	return { status, open, close, toggle };
};
