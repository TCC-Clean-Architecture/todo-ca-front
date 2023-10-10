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

/* -- Props -- */

interface Props {
	theme?: 'light' | 'primary' | 'secondary';
	vertical?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	vertical: false,
});

const themeClass = computed(() => {
	if (!props.theme) return 'divider--light';
	return `divider--${props.theme}`;
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

	&--primary {
		border-color: var(--clr-primary);
		opacity: 0.2;
	}

	&--secondary {
		border-color: var(--clr-secondary);
		opacity: 0.2;
	}

	&--light {
		border-color: var(--clr-dark);
		opacity: 0.2;
	}
}
</style>
