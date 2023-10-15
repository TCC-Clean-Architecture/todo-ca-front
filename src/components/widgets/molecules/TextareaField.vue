<template>
	<BaseField
		:name="name"
		:label="label"
		:variant="variant"
		:invalid="invalid"
		:focused="isFocus"
		:active="!!modelValue"
	>
		<BaseTextarea
			:name="name"
			:rows="rows"
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
import BaseTextarea, { type TextareaProps } from '@/components/widgets/atoms/BaseTextarea.vue';

import { ref } from 'vue';

interface IProps extends FieldProps, TextareaProps {}

defineProps<IProps>();

const isFocus = ref(false);

defineEmits<{
	(e: 'update:modelValue', value?: string | number): void;
}>();
</script>

<style scoped lang="scss"></style>
