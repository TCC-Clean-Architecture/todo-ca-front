<template>
	<BaseField
		:name="name"
		:label="label"
		:variant="variant"
		:invalid="invalid"
		:active="!!modelValue"
	>
		<BaseMultiselect
			:id="name"
			:name="name"
			:model-value="modelValue"
			:placeholder="placeholder"
			:open-direction="openDirection"
			:options="options"
			:variant="variant"
			:loading="loading"
			:multiple="multiple"
			:disabled="disabled"
			:size="size"
			:selectionTitle="selectionTitle"
			@update:model-value="$emit('update:modelValue', $event)"
		/>
	</BaseField>
</template>

<script lang="ts" setup>
import BaseField, { type FieldProps } from '@/components/widgets/atoms/BaseField.vue';
import BaseMultiselect, {
	type MultiselectProps,
} from '@/components/widgets/atoms/BaseMultiselect.vue';

interface IProps extends FieldProps, MultiselectProps {}

defineProps<IProps>();

defineEmits<{
	(e: 'update:modelValue', value: unknown): void;
}>();
</script>

<style scoped lang="scss"></style>
