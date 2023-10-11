<template>
	<section class="list">
		<Draggable
			tag="ol"
			class="list__wrapper"
			handle=".todo-item__handle"
			v-model="tasks"
			group="tasks"
			item-key="id"
			:animation="200"
		>
			<template #item="{ element }">
				<li class="list__item">
					<TodoItem v-bind="element" />
				</li>
			</template>
			<template #footer>
				<BaseButton icon="plus" size="lg" theme="secondary" variant="flat" block />
			</template>
		</Draggable>
	</section>
</template>

<script lang="ts" setup>
import TodoItem from '@/components/widgets/molecules/TodoItem.vue';
import BaseButton from '@/components/widgets/atoms/BaseButton.vue';
import Draggable from 'vuedraggable';

import { ref } from 'vue';

type ITodo = {
	id: string;
	name: string;
	description: string;
	status: string;
};

const tasks = ref<ITodo[]>([
	{
		id: '1',
		name: `Option to "use local/server version" feature`,
		description: `It usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time.`,
		status: 'Status',
	},
	{
		id: '2',
		name: `Option to "use local/server version" feature`,
		description: `It usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time.`,
		status: 'Status',
	},
	{
		id: '3',
		name: `Option to "use local/server version" feature`,
		description: `It usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time.`,
		status: 'Status',
	},
	{
		id: '4',
		name: `Option to "use local/server version" feature`,
		description: `It usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time.`,
		status: 'Status',
	},
]);
</script>

<style lang="scss" scoped>
.list {
	$self: &;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	margin: 1.5rem;

	&__title {
		display: block;

		padding-block: 0.25rem;
		padding-inline: 1rem;

		color: var(--clr-primary);
		font-size: 2rem;
		font-weight: 700;

		background-color: var(--clr-bg-soft);
		border-radius: 0.5rem;
	}

	&__wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;

		background-color: var(--clr-bg-soft);
		border-radius: 0.5rem;
		padding: 1.75rem;

		list-style: none;
	}
}
</style>
