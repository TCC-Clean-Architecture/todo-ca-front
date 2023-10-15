import { computed, ref } from 'vue';
import { createGlobalState } from '@vueuse/core';
import type { ModalKey } from '@/interfaces';

export const useModalsState = createGlobalState(() => {
	// States
	const modals = ref(new Map<ModalKey, boolean>());

	// Getters
	const keys = computed(() => modals.value.keys());
	const values = computed(() => modals.value.values());
	const entries = computed(() => modals.value.entries());
	const size = computed(() => modals.value.size);

	// Actions
	const set = (name: ModalKey, status: boolean = false) => modals.value.set(name, status);
	const get = (name: ModalKey) => modals.value.get(name);
	const has = (name: ModalKey) => modals.value.has(name);

	const open = (name: ModalKey) => {
		if (!has(name)) return;
		set(name, true);
	};

	const close = (name: ModalKey) => {
		if (!has(name)) return;
		set(name, false);
	};

	const toggle = (name: ModalKey) => {
		if (get(name)) close(name);
		else open(name);
	};

	const remove = (name: ModalKey) => {
		if (!has(name)) return;
		modals.value.delete(name);
	};

	const clear = () => {
		modals.value.clear();
	};

	return { modals, keys, values, entries, size, set, get, has, open, close, toggle, remove, clear };
});

export type ModalsState = ReturnType<typeof useModalsState>;
