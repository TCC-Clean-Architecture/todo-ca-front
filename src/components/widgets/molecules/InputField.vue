<template>
	<BaseField
		:name="name"
		:label="label"
		:variant="variant"
		:invalid="invalid"
		:focused="isFocus"
		:active="!!modelValue"
	>
		<BaseInput
			:name="name"
			:model-value="modelValue"
			:variant="variant"
			:invalid="invalid"
			:placeholder="placeholder"
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

interface IProps extends FieldProps, InputProps {}

defineProps<IProps>();

const isFocus = ref(false);

defineEmits<{
	(e: 'update:modelValue', value: unknown): void;
}>();
</script>

<style scoped lang="scss"></style>
