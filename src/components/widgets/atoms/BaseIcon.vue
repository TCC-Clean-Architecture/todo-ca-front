<template>
	<component
		:is="tag"
		:id="id"
		class="icon"
		:class="{
			'icon--disabled': disabled,
			'icon--loading': loading,
			...cssClasses,
		}"
		:disabled="disabled"
		@click="onClick($event)"
	>
		<transition name="scale-up" mode="out-in">
			<BaseLoader v-if="loading" variant="primary" floating center />
		</transition>

		<slot>
			<component v-if="iconComponent" :is="iconComponent" v-bind="props" />
		</slot>
	</component>
</template>

<script lang="ts" setup>
import BaseLoader from '@/components/widgets/atoms/BaseLoader.vue';

import { computed } from 'vue';

type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/* -- Props -- */

interface Props {
	tag?: 'div' | 'span' | 'i' | 'button';
	id?: string | number;
	icon?: string;
	theme?: string;
	size?: Sizes;
	props?: object;
	loading?: boolean;
	disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	tag: 'i',
	size: 'md',
	loading: false,
	disabled: false,
});

/* -- Emits -- */

const emit = defineEmits<{
	(e: 'click', event: Event): void;
}>();

/* -- Computeds -- */

const iconsList = computed(() => {
	// import context for the icons folder and return an array with the names of the .vue files
	const icons: any = import.meta.glob('/src/components/icons/Icon*.vue', {
		import: 'default',
		eager: true,
	});

	return icons;
});

const iconComponent = computed(() => {
	if (!props.icon) return undefined;
	const iconName = toCamelCase(props.icon);
	if (!iconsList.value[`/src/components/icons/Icon${iconName}.vue`]) {
		console.error(`BaseIcon: invalid icon import name '${props.icon}'`);
		return undefined;
	}
	return iconsList.value[`/src/components/icons/Icon${iconName}.vue`];
});

const themeClass = computed(() => {
	if (!props.theme) return undefined;
	return `theme--${props.theme}`;
});

const sizeClass = computed(() => {
	if (!props.size) return undefined;
	return `size--${props.size}`;
});

const cssClasses = computed(() => {
	const obj: Record<string, any> = {};
	if (themeClass.value) obj[themeClass.value] = true;
	if (sizeClass.value) obj[sizeClass.value] = true;
	return obj;
});

/* -- Methods -- */

function toCamelCase(text: string) {
	return text
		.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
		.replace(/-/g, '')
		.replace(/^([a-z])/g, (match, letter) => letter.toUpperCase());
}

const onClick = (e: Event) => {
	if (props.tag !== 'button') return;
	if (props.disabled) return;
	if (props.loading) return;
	emit('click', e);
};
</script>

<style lang="scss" scoped>
button.icon {
	cursor: pointer;

	svg {
		transition: scale 150ms ease-in-out;

		&:hover {
			scale: 1.1;
		}
	}
}

.icon {
	$self: &;

	display: grid;
	place-items: center;

	height: 2rem;
	width: 2rem;
	cursor: inherit;

	border-radius: 100vw;

	transition: color 100ms ease;

	svg {
		height: 100%;
		width: 100%;

		color: inherit;
	}

	$sizes: (
		'xs': 0.875rem,
		'sm': 1.25rem,
		'md': 1.5rem,
		'lg': 1.75rem,
		'xl': 2rem,
	);

	@each $size, $val in $sizes {
		&.size--#{$size} {
			height: $val;
			width: $val;
		}
	}

	@each $theme, $properties in $themes {
		&.theme--#{$theme} {
			color: #{get-theme-color($theme, 'main')};
			&:hover {
				color: #{get-theme-color($theme, 'dark')};
			}
		}
	}

	&:disabled,
	&--disabled {
		color: var(--clr-mute-dark);
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
