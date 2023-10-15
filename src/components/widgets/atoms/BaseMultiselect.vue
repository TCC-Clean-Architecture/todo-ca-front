<template>
	<Multiselect
		:class="{
			'multiselect--focused': modelValue,
			...cssClasses,
		}"
		:options="options"
		:model-value="modelValue"
		:multiple="multiple"
		:clear-on-select="false"
		:close-on-select="!multiple"
		:arrow="false"
		:track-by="trackBy"
		:label="label"
		:disabled="disabled"
		:open-direction="openDirection"
		select-label=""
		selected-label=""
		deselect-label=""
		:placeholder="placeholder"
		:loading="loading"
		@update:model-value="$emit('update:modelValue', $event)"
		@close="$emit('close')"
		@open="openWrapper"
	>
		<template #tag>
			<span></span>
		</template>
		<template #limit>
			<span></span>
		</template>
		<template #caret="{ toggle }">
			<span class="multiselect__search" @mousedown.prevent.stop="toggle">
				<IconChevron />
			</span>
		</template>
		<template #selectio="{ values, isOpen }">
			<span class="multiselect__single" v-if="values.length && !isOpen">
				{{ values.length }}
				{{ values.length > 1 ? selectionTitle[1] : selectionTitle[0] }}
			</span>
		</template>
		<template #noResult> Nenhuma opção encontrada </template>
		<template #noOptions> Nenhuma opção encontrada </template>
	</Multiselect>
</template>

<script lang="ts" setup>
import Multiselect from 'vue-multiselect';
import IconChevron from '@/components/icons/IconChevron.vue';

import { computed } from 'vue';
import type { MultiselectOpenDirections, MultiselectSizes } from '@/interfaces';

export interface MultiselectProps {
	options: unknown[];
	trackBy?: string;
	label?: string;
	loading?: boolean;
	multiple?: boolean;
	selectionTitle?: [string, string];
	openDirection?: MultiselectOpenDirections;
	placeholder?: string;
	modelValue?: unknown;
	variant?: string;
	disabled?: boolean;
	size?: MultiselectSizes;
}

const props = withDefaults(defineProps<MultiselectProps>(), {
	trackBy: 'value',
	label: 'text',
	selectionTitle: () => ['Valor', 'Valores'],
	openDirection: 'bottom',
	placeholder: 'Selecionar',
	size: 'md',
});

/* -- Emits -- */

const emit = defineEmits<{
	(e: 'update:modelValue', val: unknown): void;
	(e: 'open'): void;
	(e: 'close'): void;
	(e: 'wrapper-scroll', event: Event): void;
}>();

/* -- Computeds -- */

const variantClass = computed(() => {
	if (!props.variant) return null;
	return `variant--${props.variant}`;
});

const sizeClass = computed(() => {
	if (!props.size) return null;
	return `size--${props.size}`;
});

const cssClasses = computed(() => {
	const obj: Record<string, any> = {};
	if (variantClass.value) obj[variantClass.value] = true;
	if (sizeClass.value) obj[sizeClass.value] = true;
	return obj;
});

/* -- Methods -- */

const openWrapper = () => {
	emit('open');
	const contentWrapper = document.querySelector('.multiselect__content-wrapper')!;
	contentWrapper.addEventListener('scroll', (e) => {
		emit('wrapper-scroll', e);
	});
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="scss">
.multiselect {
	$self: &;
	min-height: unset;

	font-size: 0.8rem;
	color: $c-gray-30;

	border-radius: 0.375rem;

	@each $size, $val in $multiselects-sizes {
		&.size--#{$size} {
			height: map-get($val, 'size');
			font-size: map-get($val, 'font');

			#{$self}__search > svg {
				width: map-get($val, 'svg');
			}
		}
	}

	&.variant--default {
		&#{$self}--active,
		&#{$self}--focused {
			#{$self}__tags {
				background-color: $c-white;
				border-color: var(--clr-primary);
			}

			#{$self}__content-wrapper {
				border-color: var(--clr-primary);
			}

			&:hover {
				#{$self}__tags {
					background-color: $c-white;
					border-color: var(--clr-primary);
				}
			}
		}

		#{$self}__content-wrapper {
			#{$self}__option {
				background-color: $c-white;
				transition: background-color 200ms;

				&:hover {
					background-color: $c-lightest;
				}
				&--selected {
					background-color: $c-gray-95;
					font-weight: 500;
				}
			}
		}

		#{$self}__single {
			background: transparent;
		}

		#{$self}__input {
			color: $c-gray-30;
			background-color: $c-white;

			&::placeholder {
				color: $c-gray-70;
				font-weight: 500;
			}
		}

		#{$self}__placeholder {
			display: none;
			color: $c-gray-70;
			font-weight: 500;
		}

		#{$self}__tags {
			background-color: $c-lightest;
			border-color: $c-lightest;
		}

		&:hover {
			#{$self}__tags {
				background-color: $c-white;
				border-color: $c-gray-70;
			}
		}
	}

	&.variant--dark-gray {
		color: $c-gray-40;

		#{$self}__single {
			background: transparent;
			font-weight: bold;
		}

		#{$self}__input {
			color: $c-gray-40;
			background-color: $c-gray-90;

			&::placeholder {
				color: $c-gray-40;
			}
		}

		#{$self}__tags {
			background-color: $c-gray-90;
			border-color: $c-gray-90;
		}
	}

	&--active {
		z-index: initial;

		#{$self}__tags {
			border-color: $c-gray-70;
		}

		#{$self}__search > svg {
			stroke: $c-gray-40;
			rotate: -180deg;
		}
	}

	&--disabled {
		background: transparent;

		#{$self}__select {
			background: transparent;
		}

		#{$self}__tags {
			background: $c-gray-95;
		}
	}

	&__tags {
		height: inherit;
		min-height: unset;

		padding: 0;
		padding-inline: 0.75rem 2.5rem;

		font-size: inherit;

		border-radius: inherit;

		transition:
			background-color 200ms,
			border-color 300ms;

		#{$self}__placeholder,
		#{$self}__input,
		#{$self}__single {
			margin: unset;
			padding: unset;

			height: 100%;

			font-size: inherit;
			line-height: initial;
		}
	}

	&__search {
		position: absolute;
		right: 1px;
		top: 0px;

		display: flex;
		align-items: center;
		justify-content: center;

		width: 40px;
		height: 100%;

		padding: 4px 8px;

		& > svg {
			width: 1rem;

			transition: rotate 200ms ease-in-out;
		}
	}

	&__placeholder {
		display: flex;
		align-items: center;
	}

	&__single {
		display: flex;
		align-items: center;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: inherit;

		background: transparent;
	}

	&__spinner {
		height: 95%;
		top: 50%;
		transform: translateY(-50%);
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;

		&::after,
		&::before {
			border-top-color: var(--clr-primary);
		}
	}

	&__content-wrapper {
		max-height: 250px !important;
		font-size: inherit;
		z-index: 60;

		#{$self}__content {
			padding: 0;
		}

		#{$self}__option {
			&--selected {
				color: unset;
			}

			&--highlight {
				background: $c-gray-90;
				color: inherit;
			}
		}
	}
}
</style>
