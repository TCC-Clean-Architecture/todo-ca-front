<template>
	<div class="todo-item">
		<TodoItemHandle class="todo-item__handle" />
		<div class="todo-item__content">
			<h3 class="todo-item__name">{{ name }}</h3>
			<p class="todo-item__description">
				{{ description }}
			</p>
			<TodoItemStatus class="todo-item__status" :status="status" />
		</div>
		<div class="todo-item__actions">
			<BaseButton icon="pencil" size="sm" theme="secondary" variant="flat" />
			<BaseButton icon="trash" size="sm" theme="secondary" variant="flat" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import BaseButton from '@/components/widgets/atoms/BaseButton.vue';
import TodoItemHandle from '@/components/widgets/molecules/TodoItemHandle.vue';
import TodoItemStatus from '@/components/widgets/molecules/TodoItemStatus.vue';

/* -- Props -- */

interface Props {
	name?: string;
	description?: string;
	status?: string;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.todo-item {
	position: relative;

	display: grid;
	grid-template-columns: 2.5rem 1fr 2rem;

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
	}

	&__actions {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
}
</style>
