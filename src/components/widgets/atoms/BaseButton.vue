<template>
	<component
		:is="tag"
		class="button"
		:class="{
			'button--disabled': disabled,
			'button--block': block,
			'button--fit': fit,
			'button--pill': pill,
			'button--icon': icon,
			'button--loading': loading,
			...cssClasses,
		}"
		:disabled="disabled"
		@click.prevent="onClick($event)"
	>
		<transition name="scale-up" mode="out-in">
			<BaseLoader v-if="loading" :variant="loaderTheme" floating center />
		</transition>
		<div class="button__overlay" v-if="!loading">
			<BaseIcon
				v-if="icon"
				class="button__icon"
				:size="size"
				:icon="typeof icon === 'string' ? icon : icon.icon"
				:props="typeof icon === 'string' ? undefined : icon.props"
			/>
			<template v-else>
				<slot name="prepend">
					<BaseIcon
						v-if="prependIcon"
						class="button__icon"
						:size="size"
						:icon="typeof prependIcon === 'string' ? prependIcon : prependIcon.icon"
						:props="typeof prependIcon === 'string' ? undefined : prependIcon.props"
					/>
				</slot>
				<slot></slot>
				<slot name="append">
					<BaseIcon
						v-if="appendIcon"
						class="button__icon"
						:size="size"
						:icon="typeof appendIcon === 'string' ? appendIcon : appendIcon.icon"
						:props="typeof appendIcon === 'string' ? undefined : appendIcon.props"
					/>
				</slot>
			</template>
		</div>
	</component>
</template>

<script lang="ts" setup>
import BaseIcon from '@/components/widgets/atoms/BaseIcon.vue';
import BaseLoader from '@/components/widgets/atoms/BaseLoader.vue';

import { computed } from 'vue';

/* -- Props -- */

interface Icon {
	icon: string;
	props?: object;
}

type Themes = 'plain' | 'text' | 'outline' | 'flat';
type Variants = 'plain' | 'text' | 'outline' | 'flat';
type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface Props {
	tag?: string;
	theme?: Themes;
	variant?: Variants;
	icon?: string | Icon;
	prependIcon?: string | Icon;
	appendIcon?: string | Icon;
	size?: Sizes;
	props?: object;
	file?: boolean;
	block?: boolean;
	fit?: boolean;
	pill?: boolean;
	loading?: boolean;
	disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	tag: 'button',
	size: 'md',
	block: false,
	fit: false,
	pill: false,
	loading: false,
	disabled: false,
});

/* -- Emits -- */

const emit = defineEmits<{
	(e: 'click', event: Event): void;
}>();

/* -- Computeds -- */

const variantClass = computed(() => {
	if (!props.variant) return null;
	return `variant--${props.variant}`;
});

const themeClass = computed(() => {
	if (!props.theme) return null;
	return `theme--${props.theme}`;
});

const sizeClass = computed(() => {
	if (props.fit) return undefined;
	return `size--${props.size}`;
});

const cssClasses = computed(() => {
	const obj: Record<string, any> = {};
	if (variantClass.value) obj[variantClass.value] = true;
	if (themeClass.value) obj[themeClass.value] = true;
	if (sizeClass.value) obj[sizeClass.value] = true;
	return obj;
});

const loaderTheme = computed(() => {
	if (!props.theme) return 'primary';
	if (['primary', 'secondary'].includes(props.theme)) return 'white';
	return 'primary';
});

/* -- Methods -- */

function onClick(e: Event) {
	if (props.disabled || props.loading) return;
	emit('click', e);
}
</script>

<style lang="scss" scoped>
.button {
	$self: &;
	position: relative;

	height: var(--btn-height, 2.5rem);
	min-width: var(--btn-width, 7rem);
	padding-inline: var(--btn-padding, 2rem);

	font-size: var(--btn-fz, 0.875rem);
	font-weight: 500;
	text-align: center;

	border-radius: 6px;
	cursor: pointer;

	transition:
		color 100ms ease,
		background-color 200ms ease-in-out,
		border-color 200ms ease-in-out;

	&__overlay {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	&__icon {
		color: inherit;
	}

	$sizes: (
		'xs': (
			'height': 1.5rem,
			'width': 4rem,
			'font': 0.625rem,
			'padding': 1rem,
		),
		'sm': (
			'height': 2rem,
			'width': 6rem,
			'font': 0.75rem,
			'padding': 1.5rem,
		),
		'md': (
			'height': 2.5rem,
			'width': 7rem,
			'font': 0.875rem,
			'padding': 2rem,
		),
		'lg': (
			'height': 3rem,
			'width': 8rem,
			'font': 1.125rem,
			'padding': 2.5rem,
		),
		'xl': (
			'height': 3.5rem,
			'width': 9rem,
			'font': 1.25rem,
			'padding': 3rem,
		),
	);

	@each $size, $val in $sizes {
		&.size--#{$size} {
			--btn-height: #{map-get($val, 'height')};
			--btn-width: #{map-get($val, 'width')};
			--btn-padding: #{map-get($val, 'padding')};
			--btn-fz: #{map-get($val, 'font')};
		}
	}

	@each $theme, $properties in $themes {
		&.theme--#{$theme} {
			@include default-button($theme);
		}

		&.variant--flat.theme--#{$theme} {
			@include flat-button($theme);
		}

		&.variant--outline.theme--#{$theme} {
			@include outline-button($theme);
		}

		&.variant--text.theme--#{$theme} {
			@include text-button($theme);
		}

		&.variant--plain.theme--#{$theme} {
			@include plain-button($theme);
		}
	}

	&--icon {
		flex: 0 0 auto;
		aspect-ratio: 1/1;
		height: var(--btn-height);
		width: var(--btn-height);
		min-width: unset;

		padding-inline: 0rem;

		&:hover #{$self}__icon {
			scale: 1.1;
		}
	}

	&--fit {
		width: fit-content;
		height: fit-content;
		padding-inline: 0.5rem;
	}

	&--pill {
		border-radius: 100vw;
	}

	&--block {
		min-width: 100%;
		flex: 1 0 auto;
	}

	&--loading {
		cursor: default;
	}

	&:disabled,
	&--disabled {
		pointer-events: none;
		cursor: default;
	}

	.scale-up-enter-active,
	.scale-up-leave-active {
		transition: all 300ms cubic-bezier(1, 0.5, 0.8, 1);
	}

	.scale-up-enter,
	.scale-up-leave-to {
		transform: scale(0);
		opacity: 0;
	}
}
</style>
