<template>
	<BaseField v-bind="$props" :active="!!modelValue">
		<BaseMultiselect
			:id="name"
			v-bind="$props"
			:track-by="undefined"
			:label="undefined"
			@update:model-value="$emit('update:modelValue', $event)"
		/>
	</BaseField>
</template>

<script lang="ts" setup>
import BaseField, { type FieldProps } from '@/components/widgets/atoms/BaseField.vue';
import BaseMultiselect, {
	type MultiselectProps,
} from '@/components/widgets/atoms/BaseMultiselect.vue';

/* -- Props -- */

interface IProps extends FieldProps, MultiselectProps {}

defineProps<IProps>();

/* -- Emits -- */

defineEmits<{
	(e: 'update:modelValue', value: unknown): void;
}>();
</script>

<style scoped lang="scss"></style>
