<template>
	<div
		class="input"
		:class="{
			'input--focus': focus,
			'input--active': !!modelValue,
			'input--invalid': invalid,
			...cssClasses,
		}"
	>
		<input
			:id="name"
			class="input__tag"
			:value="modelValue"
			:type="type"
			:placeholder="checkPlaceholder ? placeholder : undefined"
			:name="name"
			:required="required"
			:disabled="disabled"
			autocomplete="off"
			:aria-labelledby="`${name}-label`"
			@input="onInputChange($event)"
			@focus="onFocus($event)"
			@blur="onBlur($event)"
			v-on="events"
		/>
	</div>
</template>

<script lang="ts" setup>
import { useInput } from '@/composables/input';

/* -- Props -- */

export interface InputProps {
	type?: string;
	modelValue?: string | number;
	name?: string;
	placeholder?: string;
	variant?: string;
	events?: object;
	required?: boolean;
	invalid?: boolean;
	disabled?: boolean;
	hasValue?: boolean;
}

const props = withDefaults(defineProps<InputProps>(), {
	type: 'text',
	events: () => ({}),
});

/* -- Emits -- */

const emit = defineEmits<{
	(e: 'update:modelValue', value?: string | number): void;
	(e: 'focus', event: Event): void;
	(e: 'blur', event: Event): void;
}>();

const { focus, cssClasses, checkPlaceholder, onInputChange, onFocus, onBlur } = useInput(
	props,
	emit,
);
</script>

<style lang="scss" scoped>
.input {
	$self: &;
	position: relative;

	display: flex;
	align-items: center;
	justify-content: flex-start;

	width: 100%;
	height: 40px;

	background-color: $c-lightest;
	border: 1px solid $c-lightest;

	border-radius: 6px;

	transition:
		background-color 200ms,
		border-color 300ms;

	&:hover,
	&:focus-within {
		background-color: transparent;
		border: 1px solid $c-gray-70;
	}

	&__tag {
		width: 100%;
		height: inherit;

		margin: 0px;
		padding-block: 0.75rem;
		padding-inline: 0.75rem 1rem;

		color: $c-gray-30;

		background-color: transparent;
		border-radius: inherit;
		border: 0px;

		&::placeholder {
			color: $c-gray-70;
			font-weight: 500;
		}
	}

	&--invalid {
		border-color: var(--clr-danger);

		&:hover,
		&:focus-within {
			border-color: var(--clr-danger);
		}
	}

	&.variant--dynamic {
		border: none;
		background-color: $c-lightest;

		&:hover {
			background-color: transparent;
		}

		&#{$self}--active,
		&:focus-within {
			background-color: transparent;

			#{$self}__fieldset {
				border-color: var(--clr-primary);
			}

			&:hover {
				#{$self}__fieldset {
					border-color: var(--clr-primary);
				}
			}
		}
	}

	&.variant--outline {
		background-color: $c-white;
		border-color: $c-gray-90;

		&#{$self}--focus,
		&:focus-within {
			border-color: $c-gray-70;
		}

		&#{$self}--invalid {
			border-color: $c-danger;
		}
	}
}
</style>
