<template>
	<BaseField v-bind="$props" :focused="isFocus" :active="!!modelValue">
		<BaseInput
			v-bind="$props"
			@update:model-value="$emit('update:modelValue', $event)"
			@focus="isFocus = true"
			@blur="isFocus = false"
		/>
	</BaseField>
</template>

<script lang="ts" setup>
import BaseField, { type FieldProps } from '@/components/widgets/atoms/BaseField.vue';
import BaseInput, { type InputProps } from '@/components/widgets/atoms/BaseInput.vue';

import { ref } from 'vue';

/* -- Props -- */

interface IProps extends FieldProps, InputProps {}

defineProps<IProps>();

/* -- Emits -- */

defineEmits<{
	(e: 'update:modelValue', value: unknown): void;
}>();

/* -- Data -- */

const isFocus = ref(false);
</script>

<style scoped lang="scss"></style>
