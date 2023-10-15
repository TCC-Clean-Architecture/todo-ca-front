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
import type { ButtonIcon, ButtonThemes, ButtonVariants, ButtonSizes } from '@/interfaces';

/* -- Props -- */

interface IProps {
	tag?: string;
	theme?: ButtonThemes;
	variant?: ButtonVariants;
	icon?: string | ButtonIcon;
	prependIcon?: string | ButtonIcon;
	appendIcon?: string | ButtonIcon;
	size?: ButtonSizes;
	props?: object;
	file?: boolean;
	block?: boolean;
	fit?: boolean;
	pill?: boolean;
	loading?: boolean;
	disabled?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
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
	if (props.fit) return null;
	if (!props.size) return null;
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

const onClick = (e: Event) => {
	if (props.disabled || props.loading) return;
	emit('click', e);
};
</script>

<style lang="scss" scoped>
.button {
	$self: &;
	position: relative;

	height: var(--btn-height, 2.5rem);
	min-width: var(--btn-width, 7.5rem);
	padding-inline: var(--btn-padding, 2rem);

	font-size: var(--btn-fz, 0.875rem);
	text-align: center;

	border-radius: 0.5rem;
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
		transition: scale 150ms ease-in-out;

		color: inherit;
	}

	@each $size, $val in $buttons-sizes {
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
