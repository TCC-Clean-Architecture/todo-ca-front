<template>
	<div
		class="field"
		:class="{
			'field--focus': focused,
			'field--active': active,
			'field--invalid': invalid,
			[variantClass]: true,
		}"
	>
		<label v-if="label" :id="`${name}-label`" class="field__label" :aria-label="name" :for="name">
			{{ label }}
			<span v-if="requirement" class="field__requirement"> ({{ requirement }})</span>
		</label>
		<slot></slot>
		<fieldset v-if="variant === 'dynamic'" class="field__fieldset" aria-hidden="true">
			<legend>{{ label }}</legend>
		</fieldset>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

export interface FieldProps {
	name?: string;
	label?: string;
	variant?: string;
	invalid?: boolean;
	required?: boolean;
	optional?: boolean;
	showRequirement?: boolean;
	focused?: boolean;
	active?: boolean;
}

const props = defineProps<FieldProps>();

/* -- Computeds -- */

const variantClass = computed(() => {
	if (!props.variant) return '';
	return `variant--${props.variant}`;
});

const requirement = computed(() => {
	if (!props.showRequirement) return null;
	if (props.required) return 'Obrigatório';
	if (props.optional) return 'Opcional';
	return null;
});
</script>

<style scoped lang="scss">
.field {
	$self: &;
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;
	height: fit-content;

	&__label {
		text-align: left;
		font-size: 0.75rem;
		font-weight: 500;
		color: $c-gray-40;
		margin-block-end: 0.375rem;
	}

	&__tip {
		font-style: italic;
		font-size: 0.625rem;
		font-weight: 400;
	}

	&__fieldset {
		position: absolute;
		left: 0px;
		bottom: 0px;

		width: 100%;
		height: 100%;

		border-color: $c-lightest;
		border-style: solid;
		border-width: 1px;
		border-radius: 0.375rem;

		pointer-events: none;

		transition: border-color 300ms;
	}

	&.variant--dynamic {
		border: none;

		#{$self}__fieldset legend {
			height: 1px;

			margin-inline-start: 0rem;
			padding-inline: 0rem;

			border: 0px;
			font-size: 0px;

			visibility: hidden;

			transition-property: padding, font-size;
			transition-duration: 200ms;
			transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
		}

		#{$self}__label {
			position: absolute;
			z-index: 1;
			left: 0.75rem;
			top: 0.75rem;
			font-size: 14px;
			font-weight: 500;
			color: $c-gray-70;
			margin-block-end: 0;
			will-change: top, left, font-size, font-weight;

			transition: all 150ms ease-in-out;
		}

		&:hover {
			background-color: transparent;

			#{$self}__fieldset {
				border-color: $c-gray-70;
			}
		}

		&#{$self}--active,
		&#{$self}--focus,
		&:focus-within {
			#{$self}__label {
				left: 14px;
				top: -0.375rem;
				font-size: 10px;
				font-weight: 500;
				color: var(--clr-primary);
			}

			#{$self}__fieldset {
				border-color: var(--clr-primary);

				legend {
					font-size: 12px;
					margin-inline-start: 0.5rem;
					padding-inline: 0.25rem;
				}
			}

			&:hover {
				#{$self}__fieldset {
					border-color: var(--clr-primary);
				}
			}
		}

		&#{$self}--invalid {
			#{$self}__fieldset {
				border-color: var(--clr-danger);
			}

			&#{$self}--active,
			&#{$self}--focus,
			&:focus-within {
				#{$self}__fieldset {
					border-color: var(--clr-danger);
				}
				#{$self}__label {
					color: var(--clr-danger);
				}
			}
		}
	}
}
</style>
