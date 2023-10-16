import { watch, ref, computed, reactive } from 'vue';
import { useMouseInElement } from '@vueuse/core';

export const useMouseMoveBackground = <T extends HTMLElement>(el: T, strength = 50) => {
	const mouse = reactive(useMouseInElement(el));

	const x = ref(0);
	const y = ref(0);

	const xPixels = computed(() => x.value + 'px');
	const yPixels = computed(() => y.value + 'px');

	watch(mouse, () => {
		calculatePosition();
	});

	function calculatePosition() {
		const height = strength / mouse.elementHeight;
		const width = strength / mouse.elementWidth;

		const elX = mouse.x - mouse.elementHeight / 2;
		const elY = mouse.y - mouse.elementWidth / 2;

		x.value = width * elX * -1 - strength;
		y.value = height * elY * -1 - strength;
	}

	return {
		mouse,
		strength,
		xPixels,
		yPixels,
		x,
		y,
	};
};
