import { ref, computed } from 'vue';
import { useVModel } from '@vueuse/core';

export const useInput = (props: any, emit: any) => {
	/* -- Data -- */

	const inputValue = useVModel(props, 'modelValue', emit);
	const focus = ref(false);

	/* -- Computeds -- */

	const variantClass = computed(() => {
		if (!props.variant) return null;
		return `variant--${props.variant}`;
	});

	const cssClasses = computed(() => {
		const obj: Record<string, any> = {};
		if (variantClass.value) obj[variantClass.value] = true;
		return obj;
	});

	const checkPlaceholder = computed(() => {
		if (focus.value && !props.modelValue && props.variant === 'dynamic') return props.placeholder;
		return undefined;
	});

	/* -- Methods -- */

	const onInputChange = (e: Event) => {
		inputValue.value = (e.target as HTMLInputElement).value;
	};

	const onFocus = (event: Event) => {
		emit('focus', event);
		focus.value = true;
	};

	const onBlur = (event: Event) => {
		emit('blur', event);
		focus.value = false;
	};
	return { checkPlaceholder, cssClasses, focus, onInputChange, onFocus, onBlur };
};
