<template>
	<div class="list-task">
		<div role="button" class="list-task__handle"></div>
		<div class="list-task__content">
			<h3 class="list-task__name">{{ name }}</h3>
			<p class="list-task__description">
				{{ description }}
			</p>
			<span class="list-task__status" :class="[`list-task__status--${status}`]">
				{{ status }}
			</span>
		</div>
		<div class="list-task__actions">
			<button class="list-task__action"></button>
			<button class="list-task__action"></button>
		</div>
	</div>
</template>

<script lang="ts" setup>
/* -- Props -- */

interface Props {
	name?: string;
	description?: string;
	status?: string;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.list-task {
	position: relative;

	display: grid;
	grid-template-columns: 2.5rem 1fr 1.5rem;

	min-height: 13rem;
	padding: 0.75rem;

	background-color: var(--clr-bg-soft);
	box-shadow: $elevation-2;
	border-radius: 0.375rem;

	&__content {
		display: flex;
		flex-direction: column;
		margin-block: 1rem 0.5rem;
		margin-inline-start: 1rem;
	}

	&__name {
		color: var(--clr-primary);
		font-size: 1.125rem;
		font-weight: 700;

		margin-block-end: 0.5rem;
	}

	&__description {
		color: var(--clr-primary-lighter);
		font-size: 1rem;
		font-weight: 400;
	}

	&__status {
		margin-block-start: auto;
		align-self: flex-end;

		display: flex;
		align-items: center;
		justify-content: center;

		height: 28px;
		padding-inline: 1.25rem;

		font-size: 0.75rem;
		font-weight: 600;
		color: var(--clr-text-inverse-1);

		background-color: var(--clr-primary);
		border-radius: 0.625rem;

		&--done {
			background-color: var(--clr-success);
		}
		&--inprogress {
			background-color: var(--clr-warning);
		}
		&--todo {
			background-color: var(--clr-info);
		}
		&--unknown {
			background-color: var(--clr-mute);
			color: var(--clr-mute-darker);
		}
	}

	&__handle {
		background-color: var(--clr-bg-soft-up);
		color: var(--clr-secondary);

		border-radius: 0.25rem;

		cursor: grab;

		transition: background-color 150ms ease-in-out;

		&:hover {
			background-color: var(--clr-secondary-lightest);

			svg {
				scale: 1.1;
			}
		}

		svg {
			width: 2rem;
			height: 2rem;

			transition: scale 150ms ease-in-out;
		}
	}

	&__actions {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	&__action {
		width: 1.5rem;
		height: 1.5rem;
		padding: 0.125rem;

		color: var(--clr-secondary);

		background-color: var(--clr-bg-soft-up);
		border-radius: 0.5rem;

		transition: background-color 150ms ease-in-out;

		&:hover {
			background-color: var(--clr-secondary-lightest);

			svg {
				scale: 1.1;
			}
		}

		svg {
			transition: scale 150ms ease-in-out;

			width: 100%;
			height: 100%;
		}
	}
}
</style>
