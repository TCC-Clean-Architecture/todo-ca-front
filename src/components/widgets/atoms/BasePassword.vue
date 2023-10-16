<template>
	<BaseInput
		class="password__input"
		v-bind="$props"
		:type="inputType"
		@update:model-value="$emit('update:modelValue', $event)"
	>
		<template #trailing-icon>
			<BaseButton
				:icon="{ icon: 'eye', props: { type: eyeType, color: eyeColor } }"
				size="sm"
				theme="gray"
				variant="plain"
				@click="togglePasswordType()"
			/>
		</template>
	</BaseInput>
</template>

<script lang="ts" setup>
import BaseInput, { type InputProps } from '@/components/widgets/atoms/BaseInput.vue';
import BaseButton from '@/components/widgets/atoms/BaseButton.vue';

import { ref, computed } from 'vue';

export interface PasswordProps extends Omit<InputProps, 'type'> {}

/* -- Props -- */

defineProps<PasswordProps>();

/* -- Emits -- */

defineEmits<{
	(e: 'update:modelValue', event: unknown): void;
}>();

/* -- Data -- */

const showPassword = ref<boolean>(false);

/* -- Computed -- */

const inputType = computed(() => {
	return showPassword.value ? 'text' : 'password';
});

const eyeType = computed(() => {
	return showPassword.value ? 'open' : 'close';
});

const eyeColor = computed(() => {
	return showPassword.value ? '#1E2651' : '#B6B6B6';
});

/* -- Methods -- */

const togglePasswordType = () => {
	showPassword.value = !showPassword.value;
};
</script>

<style scoped lang="scss"></style>
