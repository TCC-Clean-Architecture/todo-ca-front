<template>
	<div
		class="loader"
		:class="{
			'loader--center': center,
			'loader--fixed': fixed,
			'loader--floating': floating,
			[themeClass]: true,
		}"
	>
		<div
			class="loader__spinner"
			:style="{
				height: size + 'px',
				'border-width': size / 10 + 'px',
			}"
		></div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { LoaderThemes } from '@/interfaces';

/* -- Props -- */

interface Props {
	theme?: LoaderThemes;
	center?: boolean;
	fixed?: boolean;
	floating?: boolean;
	size?: number;
}

const props = withDefaults(defineProps<Props>(), {
	center: false,
	fixed: false,
	floating: false,
	size: 20,
});

/* -- Computeds -- */

const themeClass = computed(() => {
	if (!props.theme) return 'theme--primary';
	return `theme--${props.theme}`;
});
</script>

<style lang="scss" scoped>
.loader {
	$self: &;
	position: relative;
	width: fit-content;

	&--center {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
	}

	&--fixed {
		display: grid;
		place-items: center;

		width: 100%;
		height: calc(60vh - 20rem);

		border-radius: 0.375rem;
		background: $c-gray-98;
	}

	&--floating {
		position: absolute;
		inset: 0;
	}

	&__spinner {
		aspect-ratio: 1/1;

		border-style: solid;
		border-bottom-color: transparent;
		border-radius: 100vw;

		animation: spin 600ms linear infinite;
	}

	@each $theme, $properties in $themes {
		&.theme--#{$theme} {
			border-color: #{get-theme-color($theme, 'main')};
			border-bottom-color: transparent;
		}
	}

	&.theme--dark {
		border-color: var(--clr-dark);
		border-bottom-color: transparent;
	}

	&.theme--light {
		border-color: var(--clr-light);
		border-bottom-color: transparent;
	}
}
</style>
