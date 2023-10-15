<template>
	<div class="handle" role="button">
		<BaseIcon icon="grip-squares" size="xl" />
	</div>
</template>

<script lang="ts" setup>
import BaseIcon from '@/components/widgets/atoms/BaseIcon.vue';
</script>

<style lang="scss" scoped>
.handle {
	display: grid;
	place-items: center;

	color: var(--clr-secondary);

	background-color: var(--clr-bg-soft-up);
	border-radius: 0.25rem;

	cursor: grab;

	transition: background-color 150ms ease-in-out;

	.icon {
		transition: scale 150ms ease-in-out;
	}

	&:hover {
		color: var(--clr-secondary-dark);
		background-color: var(--clr-secondary-lightest);

		.icon {
			scale: 1.1;
		}
	}

	&:active {
		background-color: var(--clr-secondary-lighter);
	}
}
</style>
