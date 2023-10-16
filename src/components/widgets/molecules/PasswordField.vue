<template>
	<BaseField v-bind="$props" :class="$attrs.class" :focused="isFocus" :active="!!modelValue">
		<BasePassword
			v-bind="$props"
			@update:model-value="$emit('update:modelValue', $event)"
			@focus="isFocus = true"
			@blur="isFocus = false"
		/>
	</BaseField>
	<BaseFeedback v-bind="$props.feedback" />
</template>

<script lang="ts" setup>
import BaseField, { type FieldProps } from '@/components/widgets/atoms/BaseField.vue';
import BasePassword, { type PasswordProps } from '@/components/widgets/atoms/BasePassword.vue';
import BaseFeedback, { type FeedbackProps } from '@/components/widgets/atoms/BaseFeedback.vue';

import { ref } from 'vue';

defineOptions({
	inheritAttrs: false,
});

/* -- Props -- */

interface IProps extends FieldProps, PasswordProps {
	feedback: FeedbackProps;
}

defineProps<IProps>();

/* -- Emits -- */

defineEmits<{
	(e: 'update:modelValue', value: unknown): void;
}>();

/* -- Data -- */

const isFocus = ref(false);
</script>

<style scoped lang="scss"></style>
