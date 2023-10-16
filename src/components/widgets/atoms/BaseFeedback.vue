<template>
	<div class="feedback">
		<div class="feedback__bar" />
		<p v-if="text" class="feedback__text" v-text="text" />
	</div>
</template>

<script lang="ts" setup>
export interface FeedbackProps {
	text?: string;
	color?: string;
	width?: string;
}

withDefaults(defineProps<FeedbackProps>(), { color: '#686868', width: '0%' });
</script>

<style lang="scss" scoped>
.feedback {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;

	width: 100%;
	margin-block-start: 0.375rem;

	user-select: none;

	&__bar {
		position: relative;

		height: 0.1875rem;

		background-color: $c-gray-90;
		border-radius: 0.25rem;
		overflow: hidden;

		&::after {
			content: '';
			position: absolute;
			inset-block: 0;

			width: v-bind(width);

			background-color: v-bind(color);

			transition: width 150ms ease-in-out;
		}
	}

	&__text {
		align-self: center;

		font-size: 0.75rem;
		font-weight: bold;

		color: v-bind(color);

		transition: color 150ms ease-in-out;
	}
}
</style>
