<template>
	<hr
		class="divider"
		:aria-orientation="vertical ? 'vertical' : 'horizontal'"
		:class="{
			[orientationClass]: true,
			[themeClass]: true,
		}"
	/>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { DividerThemes } from '@/interfaces';

/* -- Props -- */

interface IProps {
	theme?: DividerThemes;
	vertical?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
	theme: 'dark',
	vertical: false,
});

const themeClass = computed(() => {
	if (!props.theme) return 'theme--dark';
	return `theme--${props.theme}`;
});

const orientationClass = computed(() => {
	if (props.vertical) return 'divider--vertical';
	return 'divider--horizontal';
});
</script>

<style lang="scss" scoped>
.divider {
	$self: &;
	flex: 1 1 0px;
	display: block;

	max-width: 100%;
	height: 0px;
	max-height: 0px;

	border: solid;
	border-width: thin 0 0 0;

	transition: inherit;

	&--vertical {
		align-self: stretch;
		display: inline-flex;

		height: inherit;
		min-height: 100%;
		max-height: 100%;
		width: 0px;
		max-width: 0px;

		margin: 0 -1px;
		vertical-align: text-bottom;

		border: solid;
		border-width: 0 thin 0 0;
	}

	@each $theme, $properties in $themes {
		&.theme--#{$theme} {
			border-color: #{get-theme-color($theme, 'main')};
			opacity: 0.2;
		}
	}

	&.theme--dark {
		border-color: var(--clr-dark);
		opacity: 0.2;
	}

	&.theme--light {
		border-color: var(--clr-light);
		opacity: 0.2;
	}
}
</style>
